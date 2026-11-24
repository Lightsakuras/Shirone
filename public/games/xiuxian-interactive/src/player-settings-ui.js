(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.XiuxianPlayerSettingsUI = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  function create({ controls, profile, openModal, closeModal, onBack, getDefaultPortrait }) {
    let section = 'keys', capture = null, conflict = null, modifier = null, prepared = null;
    let message = '', error = false, loading = false, generation = 0;
    const page = () => document.getElementById('player-settings-page');
    const active = () => { const node = page(); return !!(node?.isConnected && !node.closest('[hidden]')); };
    function note(text, failed = false) { message = text; error = failed; }
    function close() { generation++; capture = null; modifier = null; prepared = null; closeModal(); }
    function show(value = 'keys') {
      generation++; section = value === 'avatar' ? 'avatar' : 'keys';
      capture = null; conflict = null; modifier = null; prepared = null; message = ''; error = false; loading = false;
      openModal('player-settings', '<div id="player-settings-page" class="player-settings-page"></div>');
      render();
    }
    function controlsHTML() {
      const groups = [...new Set(controls.actions.map(action => action.group))];
      const bindings = controls.bindings();
      const captureHTML = capture ? '<div class="binding-capture" role="status"><strong>正在设置：' + esc(controls.actions.find(action => action.id === capture.id).label) + '</strong><p>请按新键。Esc 也可设为快捷键；取消请点下方按钮。单独使用 Shift / Ctrl / Alt 时，松开该键即可。</p><button id="binding-cancel" class="secondary">取消此次改键</button></div>' : '';
      const conflictHTML = conflict ? '<div class="binding-conflict" role="alert"><strong>' + esc(conflict.error) + '</strong><p>交换后，原操作改用这个位置先前的按键；这个位置原来未设时，原操作会变为未设。</p><div class="buttons"><button id="binding-swap" class="primary">交换按键</button><button id="binding-retry" class="secondary">另选按键</button><button id="binding-abandon" class="quiet">取消</button></div></div>' : '';
      return '<p class="player-settings-intro">点选槽位即可录入新键，每项操作支持主键与备用键，本机全档通用。</p>' + captureHTML + conflictHTML +
        '<div class="bindings-scroll" aria-label="全部游戏快捷键">' + groups.map(group => '<div class="binding-group"><h3>' + esc(group) + '</h3>' + controls.actions.filter(action => action.group === group).map(action =>
          '<div class="binding-row"><span>' + esc(action.label) + '</span>' + [0, 1].map(slot => '<div class="binding-slot"><button data-binding-action="' + action.id + '" data-binding-slot="' + slot + '" aria-label="修改' + esc(action.label) + '的' + (slot ? '备用键' : '主键') + '" class="binding-key' + (capture?.id === action.id && capture.slot === slot ? ' recording' : '') + '">' + esc(controls.label(action.id, { slot })) + '</button><button data-binding-clear="' + action.id + '" data-binding-slot="' + slot + '" class="binding-clear" aria-label="清除' + esc(action.label) + '的' + (slot ? '备用键' : '主键') + '" ' + (bindings[action.id][slot] ? '' : 'disabled') + '>清除</button></div>').join('') + '</div>').join('') + '</div>').join('') + '</div>' +
        '<p class="player-settings-hint">鼠标左键：选敌 / 出剑 / 施放已准备物品；右键：按住格挡。Tab / Shift + Tab 用于窗口中的焦点导航。所有窗口均有鼠标收起入口。</p>';
    }
    function avatarHTML() {
      const saved = profile.current(), value = prepared || saved;
      const source = value?.dataUrl || (getDefaultPortrait ? getDefaultPortrait() : 'assets/portraits/lin_mo_f.webp');
      return '<p class="player-settings-intro">自选本地画像，本机全档通用。</p><div class="avatar-settings"><figure class="avatar-preview"><img id="avatar-preview-image" src="' + esc(source) + '" alt="' + (prepared ? '待确认的新头像预览' : saved ? '当前自定义头像' : '默认人物画像') + '"><figcaption>' + (prepared ? '预览中 · 尚未保存' : saved ? '当前自定义头像' : '随剧情阶段显示默认画像') + '</figcaption></figure><div class="avatar-actions"><label class="avatar-file-label" for="avatar-file">选择本地图片<input type="file" id="avatar-file" accept="image/png,image/jpeg,image/webp" ' + (loading ? 'disabled' : '') + '></label><p>支持 PNG、JPEG、WebP（≤ 8 MB），自动居中裁为 256 × 256 方图，预览满意再确认。</p><div class="buttons"><button id="avatar-confirm" class="primary" ' + (!prepared || loading ? 'disabled' : '') + '>确认使用此头像</button><button id="avatar-cancel" class="secondary" ' + (!prepared || loading ? 'disabled' : '') + '>取消预览</button></div><button id="avatar-reset" class="quiet" ' + (!saved || loading ? 'disabled' : '') + '>恢复默认人物画像</button></div></div>';
    }
    function render() {
      const node = page(); if (!node) return;
      const scroll = node.querySelector('.bindings-scroll')?.scrollTop || 0;
      node.innerHTML = '<p class="eyebrow">玩家偏好 · 已暂停</p><h2 id="modal-title">头像与快捷键</h2><div class="player-settings-tabs" role="group" aria-label="玩家设置类别"><button id="player-settings-avatar" class="' + (section === 'avatar' ? 'active' : '') + '" aria-pressed="' + (section === 'avatar') + '">本地头像</button><button id="player-settings-keys" class="' + (section === 'keys' ? 'active' : '') + '" aria-pressed="' + (section === 'keys') + '">全部快捷键</button></div>' +
        (section === 'keys' ? controlsHTML() : avatarHTML()) + '<p id="player-settings-note" class="player-settings-note' + (error ? ' error' : '') + '" role="status" aria-live="polite">' + esc(loading ? '正在本机生成预览…' : message) + '</p><div class="buttons player-settings-footer">' + (section === 'keys' ? '<button id="bindings-reset" class="secondary">恢复全部默认按键</button>' : '') + '<button id="player-settings-back" class="secondary">返回声音与画面</button><button id="player-settings-done" class="primary">收起设置</button></div>';
      if (node.querySelector('.bindings-scroll')) node.querySelector('.bindings-scroll').scrollTop = scroll;
      const $ = id => document.getElementById(id);
      $('player-settings-avatar').onclick = () => show('avatar');
      $('player-settings-keys').onclick = () => show('keys');
      $('player-settings-done').onclick = close;
      $('player-settings-back').onclick = () => { generation++; capture = null; prepared = null; (onBack || closeModal)(); };
      if (section === 'keys') {
        for (const button of node.querySelectorAll('[data-binding-action]')) button.onclick = () => beginCapture(button.dataset.bindingAction, Number(button.dataset.bindingSlot));
        for (const button of node.querySelectorAll('[data-binding-clear]')) button.onclick = () => {
          capture = null; conflict = null; const result = controls.setBinding(button.dataset.bindingClear, Number(button.dataset.bindingSlot), '');
          note(result.ok ? '已清除此按键；仍可使用备用键或鼠标入口。' : result.error, !result.ok); render();
        };
        $('bindings-reset').onclick = () => { capture = null; conflict = null; const result = controls.reset(); note(result.ok ? '已恢复全部默认按键。' : result.error, !result.ok); render(); };
        if ($('binding-cancel')) $('binding-cancel').onclick = () => { capture = null; modifier = null; note('已取消，按键设置未变。'); render(); };
        if ($('binding-swap')) $('binding-swap').onclick = () => {
          const result = controls.setBinding(conflict.id, conflict.slot, conflict.binding, { swap: true });
          conflict = null; note(result.ok ? '已交换按键。' : result.error, !result.ok); render();
        };
        if ($('binding-retry')) $('binding-retry').onclick = () => beginCapture(conflict.id, conflict.slot);
        if ($('binding-abandon')) $('binding-abandon').onclick = () => { conflict = null; note('已取消，按键设置未变。'); render(); };
      } else {
        $('avatar-file').onchange = async event => {
          const file = event.target.files?.[0]; if (!file) return;
          const ticket = ++generation; prepared = null; loading = true; note(''); render();
          try {
            const value = await profile.prepare(file);
            if (ticket !== generation || !active()) return;
            prepared = value; note('预览已就绪。点击“确认使用此头像”后才会保存。');
          } catch (failure) {
            if (ticket !== generation || !active()) return;
            note(failure.message || '图片无法读取，请重新选择。', true);
          } finally { if (ticket === generation && active()) { loading = false; render(); } }
        };
        $('avatar-confirm').onclick = () => {
          const result = profile.confirm(prepared);
          if (result.ok) prepared = null;
          note(result.ok ? '新画像已存妥，全档通用。' : result.error, !result.ok); render();
        };
        $('avatar-cancel').onclick = () => { prepared = null; note('预览已取消，原头像未变。'); render(); };
        $('avatar-reset').onclick = () => { const result = profile.reset(); if (result.ok) prepared = null; note(result.ok ? '已恢复默认人物画像，会随角色性别和剧情阶段变化。' : result.error, !result.ok); render(); };
      }
    }
    function beginCapture(id, slot) { capture = { id, slot }; modifier = null; conflict = null; note(''); render(); }
    function acceptBinding(event) {
      const binding = window.XiuxianControls.bindingFromEvent(event);
      if (!binding) { note('这个按键暂不支持，请选择其他按键。', true); render(); return; }
      const target = capture, result = controls.setBinding(target.id, target.slot, binding);
      if (!result.ok && result.code !== 'conflict') { note(result.error, true); render(); return; }
      capture = null; modifier = null;
      if (result.code === 'conflict') { conflict = { ...result, ...target }; note(''); }
      else note('按键已更新。' + (result.persisted ? '' : '当前环境未提供持久化，本次窗口有效。'));
      render();
    }
    function intercept(event) {
      if (!capture) return;
      if (!active()) { capture = null; modifier = null; return; }
      event.preventDefault(); event.stopImmediatePropagation();
      if (event.type === 'keyup') {
        if (modifier?.code === event.code) { const value = modifier; modifier = null; acceptBinding(value); }
      } else if (/^(?:Shift|Control|Alt)(?:Left|Right)$/.test(event.code)) {
        modifier = { code: event.code, key: event.key, shiftKey: false, ctrlKey: false, altKey: false, metaKey: false };
      } else { modifier = null; if (!event.repeat) acceptBinding(event); }
    }
    document.addEventListener('keydown', intercept, true);
    document.addEventListener('keyup', intercept, true);
    return { show, showBindings: () => show('keys'), showAvatar: () => show('avatar'), get capturing() { return !!capture && active(); }, destroy() { generation++; capture = null; document.removeEventListener('keydown', intercept, true); document.removeEventListener('keyup', intercept, true); } };
  }
  return { create };
});
