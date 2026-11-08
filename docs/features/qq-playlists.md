# QQ 音乐歌单收藏

这次只接入用户给出的五个 QQ 音乐歌单：可切换真实歌单、查看已公开的标题和歌单封面，并打开官方页面。当前未取得可在本站使用的授权音频流，所以卡片明确说明“本站不播放音频”，不显示播放、进度或“正在播放”。官方播放器仍可能要求登录、客户端或相应订阅权限；本站不代替或绕过这些要求。

## 来源与配置

- `src/data/qq-playlists.ts`：五个原始短链接、官方 ID、标题、封面来源与核验日期。2026-11-07 从 QQ 官方歌单页面核验。图片仅表示歌单封面，不宣称是当前播放的专辑。
- `src/config/qqPlaylistConfig.ts`：本用户明确要求展示，因此开启独立收藏卡。`enable: false` 可完全关闭；`defaultPlaylistId` 设置首次打开的选择。
- 内容仓覆盖域为 `qqPlaylist`，对应 `config/qq-playlist.yaml`。
- 原 `musicConfig.ts`、本地曲目和共享音频 runtime 保持原样且未启用。收藏卡不导入音频 runtime，也不请求 Meting。
- `virtual:shirone-music-artwork` 在关闭或没有有效歌单时返回空组件，首页没有卡片占位，构建不保留对应客户端组件包。

## 交互与边界

标题、歌单封面和官方链接始终来自同一个选中记录。新窗口链接保留 `noopener noreferrer`。图片懒加载、异步解码，不发送页面 referrer；缺少图片或加载失败时使用有文字替代说明的占位。失败图片不会在当前卡片中循环重试。

选择只保留在当前浏览器页面会话内。Swup 离开首页再返回时使用同一个选择状态；完整刷新恢复默认。无 Cookie、持久登录或 localStorage。禁用 JavaScript 时，默认歌单和五个官方文字链接仍可使用。

## 可复现验证

以下命令从项目根目录运行，不安装依赖、不部署：

```sh
node --test tests/qq-playlists.test.mjs tests/content/content-config.test.mjs
node scripts/check-package-manifest.mjs
./node_modules/.bin/astro check
./node_modules/.bin/playwright test tests/site/qq-playlists.spec.ts tests/site/a11y.spec.ts tests/site/icons.spec.ts
```

原生测试覆盖五个链接映射、独立配置与关闭状态、标题/封面/链接同步、卸载后重新订阅、缺图片及错误记录回退、10 种语言和不启用音频的源码契约。浏览器测试需本机仓库规定的 Chrome 与开发服务器；原生测试不是实际媒体播放验收。

### 独立缺图/坏图页面

```sh
node scripts/qa/build-qq-playlist-fixture.mjs /absolute/path/outside-project/qa-dist
```

生成 `qa-music-fallback.html` 与配套 bundle，使用实际 Svelte 卡片而不是模拟 UI。输出目录必须在项目之外，脚本不会创建正式页面、查询参数后门或改动正式歌单。

浏览器打开该文件的静态预览：

1. 首项“低音炮”省略封面，应显示稳定占位，标题和官方链接仍正确。
2. 切到“纯音乐”，故意的 404 图片触发占位，布局不跳动；再回到第一项仍可用。
3. 切到其他项，仍使用真实歌单资料；点击“卸载卡片”，再点“重新挂载”，应恢复最后的选择。
4. 任一状态均显示未在本站播放，没有音频、播放进度或假播放指示。

这些是歌单选择与回退测试，不等于站内切歌或 QQ 音频流播放已通过验收。
