# V6 隔离整合预览

## 已接入的界面

四款版式与配色已覆盖首页、公共客厅、个人空间和写作工作台。流光为独立的界面视觉效果，不代表音乐正在播放；支持暂停、减少动态以及离屏/后台暂停。保留五个真实 QQ 歌单选择、封面和官方打开入口，不提供站内 QQ 音频播放。未恢复用户已拒绝的显式几何图形。

## 现在可以用什么

静态文章、搜索、布局/配色切换、界面动效、QQ 歌单入口及本地写作草稿可在预览中使用。在线文章、登录、评论、点赞、收藏和统计已具备前后端代码，但未接通真实服务：API URL、身份服务参数、D1 绑定为空，Worker disabled，统计采集关闭。界面会明确提示未配置，不能把本地草稿说成云端保存。

当前架构是静态主站加独立动态社区。在线文章启用后仅在 community 列表和阅读页动态加载，不自动进入静态首页、RSS、sitemap、Pagefind或Git备份。

## 上线需要单独确认

1. 指定 Cloudflare 账户、项目与测试 API 域名。
2. 允许创建测试 Worker 和 D1 并应用数据库结构。
3. 选定支持 RS256 access token、独立 API audience、Code+PKCE 的身份服务，配置公开 SPA 客户端、准确回调和管理员 subject。
4. 通过安全设置填写服务端秘密，绝不写入前端或聊天。新建/扩展持续访问凭据需要确认。
5. 在测试环境验证登录、发布、审核、权限隔离和备份恢复，再另行确认生产发布与 DNS 改动。

详细配置见 backend/README.md。健康接口 configured=true 仅表示配置字段齐全，不代表数据库和身份服务已验证。

## 费用边界（2026-11-07核对）

Workers Free 每日10万请求、每次10毫秒CPU；Standard基础费5美元/月。D1 Free每日读500万行、写10万行、总存储5GB，额度耗尽可能报错。每次API调用都会写限流记录，一次访问可能触发多个API，不能承诺整站零费用。身份服务商尚未选择，费用待定；域名等另计。不自动开通付费方案。

- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/d1/platform/pricing/
- https://developers.cloudflare.com/pages/functions/pricing/

## 代码保护

2026-11-07重新比较GitHub main与备份提交3bc3f026b7e82ce2f3d057e4ec401f42349abb60，结果identical。所有工作仍在隔离副本，不推送、不部署、不更改生产。V5完整包保留，新增改动另有备份。
