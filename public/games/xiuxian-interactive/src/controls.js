(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.XiuxianControls = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const STORAGE_KEY = 'xiuxian-controls-v1';
  const definitions = [
    ['moveUp', '向上移动', '行走', ['KeyW', 'ArrowUp'], true],
    ['moveDown', '向下移动', '行走', ['KeyS', 'ArrowDown'], true],
    ['moveLeft', '向左移动', '行走', ['KeyA', 'ArrowLeft'], true],
    ['moveRight', '向右移动', '行走', ['KeyD', 'ArrowRight'], true],
    ['sneak', '夜探轻步（按住）', '行走', ['ShiftLeft', 'ShiftRight'], true],
    ['interact', '与近处人物或物件交互', '交互与战斗', ['KeyE']],
    ['dodge', '手动闪避', '交互与战斗', ['Space']],
    ['skill', '施放当前功法', '交互与战斗', ['KeyQ']],
    ['quick1', '快捷栏 1 · 燃火符', '快捷栏', ['Digit1', 'Numpad1']],
    ['quick2', '快捷栏 2 · 寒针', '快捷栏', ['Digit2', 'Numpad2']],
    ['quick3', '快捷栏 3 · 引灵香', '快捷栏', ['Digit3', 'Numpad3']],
    ['quick4', '快捷栏 4 · 回气丹', '快捷栏', ['Digit4', 'Numpad4']],
    ['quick5', '快捷栏 5 · 护身符', '快捷栏', ['Digit5', 'Numpad5']],
    ['quick6', '快捷栏 6 · 清心散', '快捷栏', ['Digit6']],
    ['tactics', '暂停下令', '面板', ['KeyV']],
    ['bag', '随身行囊', '面板', ['KeyB']],
    ['gear', '法宝装备与升阶', '面板', ['KeyR']],
    ['expedition', '秘境与药庐合备', '面板', ['KeyM']],
    ['notes', '图谱与札记', '面板', ['KeyJ']],
    ['case', '青阳案卷', '面板', ['KeyC']],
    ['loadouts', '三套配装', '面板', ['KeyL']],
    ['research', '器物试录', '面板', ['KeyO']],
    ['sects', '宗门', '面板', ['KeyH']],
    ['campaign', '远行案簿', '面板', ['KeyT']],
    ['worldMap', '世界地图', '面板', ['KeyN']],
    ['almanac', '山行闻见录', '帮助与设置', ['F1']],
    ['catalog', '器物图鉴', '帮助与设置', ['KeyG']],
    ['help', '操作指南', '帮助与设置', ['Shift+Slash']],
    ['pause', '暂停 / 收起当前窗口', '帮助与设置', ['Escape']],
    ['fullscreen', '切换全屏', '帮助与设置', ['F11']],
    ['settings', '玩家设置', '帮助与设置', []],
    ['tutorial', '互动教学', '帮助与设置', []]
  ];
  const actions = Object.freeze(definitions.map(([id, label, group, defaults, held]) =>
    Object.freeze({ id, label, group, defaults: Object.freeze(defaults), held: !!held })));
  const byId = Object.assign(Object.create(null), Object.fromEntries(actions.map(action => [action.id, action])));
  const modifiers = /^(?:Shift|Control|Alt)(?:Left|Right)$/;
  const supportedCodes = /^(?:Key[A-Z]|Digit[0-9]|Numpad[0-9]|F(?:[1-9]|1[0-2])|Arrow(?:Up|Down|Left|Right)|Shift(?:Left|Right)|Control(?:Left|Right)|Alt(?:Left|Right)|Space|Escape|Enter|Tab|Backspace|Delete|Insert|Home|End|PageUp|PageDown|Minus|Equal|BracketLeft|BracketRight|Backslash|Semicolon|Quote|Backquote|Comma|Period|Slash|CapsLock|Numpad(?:Multiply|Add|Subtract|Decimal|Divide|Enter))$/;

  function normalizeBinding(value) {
    if (value === '' || value === null || value === undefined) return '';
    if (typeof value !== 'string' || value.length > 70) return null;
    const parts = value.split('+'), code = parts.pop();
    if (!supportedCodes.test(code)) return null;
    if (parts.some(part => !['Ctrl', 'Alt', 'Shift'].includes(part)) || new Set(parts).size !== parts.length) return null;
    if (modifiers.test(code) && parts.length) return null;
    return ['Ctrl', 'Alt', 'Shift'].filter(part => parts.includes(part)).concat(code).join('+');
  }
  function reservedBinding(binding) {
    const code = binding.split('+').at(-1);
    return ['F5', 'F12'].includes(code) ||
      /^Ctrl\+(?:Shift\+)?(?:KeyW|KeyT|KeyN|KeyR|KeyL|KeyP|KeyS|KeyO|KeyJ|KeyU|Digit[0-9]|Tab)$/.test(binding) ||
      /^Alt\+(?:F4|Tab|ArrowLeft|ArrowRight|Home)$/.test(binding);
  }
  function validateBinding(value) {
    const binding = normalizeBinding(value);
    if (binding === null) return { ok: false, code: 'invalid', error: '这个按键暂不支持，请选择字母、数字、方向键或其他常用键。' };
    if (binding.split('+').at(-1) === 'Tab') return { ok: false, code: 'navigation', error: 'Tab 和 Shift + Tab 用于窗口中的焦点导航，请选择其他游戏快捷键。' };
    if (binding && reservedBinding(binding)) return { ok: false, code: 'reserved', error: '这是浏览器或系统使用的快捷键，请选择其他按键。' };
    return { ok: true, binding };
  }
  function bindingFromEvent(event) {
    if (!event || event.isComposing || event.keyCode === 229 || !event.code || event.metaKey) return null;
    const parts = [];
    if (!modifiers.test(event.code)) {
      if (event.ctrlKey) parts.push('Ctrl');
      if (event.altKey) parts.push('Alt');
      if (event.shiftKey) parts.push('Shift');
    }
    return normalizeBinding(parts.concat(event.code).join('+'));
  }
  function isEditableTarget(target) {
    return !!(target && (target.isContentEditable ||
      typeof target.closest === 'function' && target.closest('input,textarea,select,[role="textbox"],[contenteditable]:not([contenteditable="false"])')));
  }
  function defaults() { return Object.fromEntries(actions.map(action => [action.id, [...action.defaults]])); }
  function clone(bindings) { return Object.fromEntries(actions.map(action => [action.id, [...bindings[action.id]]])); }
  function normalizeBindings(value) {
    const result = defaults(), occupied = new Set();
    for (const action of actions) {
      const input = value && Object.hasOwn(value, action.id) && Array.isArray(value[action.id]) ? value[action.id].slice(0, 2) : result[action.id];
      result[action.id] = input.map(raw => {
        const checked = validateBinding(raw), key = checked.ok ? checked.binding : '';
        if (!key || occupied.has(key)) return '';
        occupied.add(key); return key;
      });
    }
    return result;
  }
  function formatBinding(value) {
    if (!value) return '未设';
    if (value === 'Shift+Slash') return '?';
    const names = { ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Space: '空格', Escape: 'Esc', Enter: 'Enter', Tab: 'Tab', ShiftLeft: '左 Shift', ShiftRight: '右 Shift', ControlLeft: '左 Ctrl', ControlRight: '右 Ctrl', AltLeft: '左 Alt', AltRight: '右 Alt', Backspace: '退格', Delete: 'Delete', Insert: 'Insert', PageUp: 'PageUp', PageDown: 'PageDown', CapsLock: 'CapsLock', Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Backslash: '\\', Semicolon: ';', Quote: "'", Backquote: '`', Comma: ',', Period: '.', Slash: '/', NumpadMultiply: '小键盘 *', NumpadAdd: '小键盘 +', NumpadSubtract: '小键盘 -', NumpadDecimal: '小键盘 .', NumpadDivide: '小键盘 /', NumpadEnter: '小键盘 Enter' };
    return value.split('+').map(part => names[part] || part.replace(/^Key/, '').replace(/^Digit/, '').replace(/^Numpad/, '小键盘 ')).join(' + ');
  }
  function defaultStorage() { try { return typeof localStorage !== 'undefined' ? localStorage : null; } catch { return null; } }

  function create(options = {}) {
    const storage = Object.hasOwn(options, 'storage') ? options.storage : defaultStorage();
    let bindings = defaults();
    try {
      const raw = storage && storage.getItem(STORAGE_KEY), saved = raw && JSON.parse(raw);
      if (saved && saved.schema === 1) bindings = normalizeBindings(saved.bindings);
    } catch { /* Invalid preferences never change the story save. */ }
    return controller({ storage, bindings, listeners: new Set(), controllers: new Set() });
  }
  function controller(shared) {
    const pressed = new Map();
    const clear = () => pressed.clear();
    shared.controllers.add(clear);
    function resolve(event, options = {}) {
      if (!options.allowEditable && isEditableTarget(event?.target)) return null;
      const key = bindingFromEvent(event);
      if (!key) return null;
      const exact = actions.find(action => shared.bindings[action.id].includes(key));
      if (exact) return exact.id;
      // Old movement/interaction keys still work while holding the light-step key.
      if (event.shiftKey && !event.ctrlKey && !event.altKey && !modifiers.test(event.code)) {
        return actions.find(action => shared.bindings[action.id].includes(event.code))?.id || null;
      }
      return null;
    }
    function press(event) {
      const action = resolve(event);
      if (action) pressed.set(event.code, action);
      return action;
    }
    function release(event) { pressed.delete(typeof event === 'string' ? event : event?.code); }
    function held(id) { return [...pressed.values()].includes(id); }
    function movement() {
      return { x: Number(held('moveRight')) - Number(held('moveLeft')), y: Number(held('moveDown')) - Number(held('moveUp')), sneak: held('sneak') };
    }
    function label(id, options = {}) {
      if (!byId[id]) return '未设';
      const keys = shared.bindings[id];
      if (Number.isInteger(options.slot)) return formatBinding(keys[options.slot]);
      const bound = keys.filter(Boolean);
      return options.primary ? formatBinding(bound[0]) : bound.map(formatBinding).join(' / ') || '未设';
    }
    function decorateBindings(container) {
      if (!container && typeof document !== 'undefined') container = document;
      if (!container?.querySelectorAll) return;
      for (const node of container.querySelectorAll('kbd[data-action],[data-control-label]')) {
        const id = node.dataset.controlLabel || node.dataset.action;
        if (!byId[id]) continue;
        const text = label(id, { primary: node.hasAttribute('data-primary-key') });
        if (node.textContent !== text) node.textContent = text;
      }
    }
    function notify() {
      for (const reset of shared.controllers) reset();
      for (const listener of shared.listeners) listener(api);
    }
    function commit(next, reset = false) {
      try {
        if (shared.storage) {
          if (reset) shared.storage.removeItem(STORAGE_KEY);
          else shared.storage.setItem(STORAGE_KEY, JSON.stringify({ schema: 1, bindings: next }));
        }
      } catch { return { ok: false, code: 'storage', error: '本机未能保存按键设置，原设置仍保留。请检查可用存储空间后重试。' }; }
      shared.bindings = next; notify();
      return { ok: true, persisted: !!shared.storage };
    }
    function conflictsFor(id, slot, binding) {
      if (!binding) return [];
      return actions.flatMap(action => shared.bindings[action.id].flatMap((key, index) => key === binding && (action.id !== id || slot !== index) ? [{ id: action.id, slot: index, label: action.label }] : []));
    }
    function setBinding(id, slot, value, options = {}) {
      if (!byId[id] || ![0, 1].includes(slot)) return { ok: false, code: 'action', error: '没有找到这个操作。' };
      const checked = validateBinding(value);
      if (!checked.ok) return checked;
      const conflicts = conflictsFor(id, slot, checked.binding);
      if (conflicts.length && !options.swap) return { ok: false, code: 'conflict', conflicts, binding: checked.binding, error: '此按键已用于' + conflicts.map(item => item.label).join('、') + '。' };
      const next = clone(shared.bindings), previous = next[id][slot] || '';
      while (next[id].length <= slot) next[id].push('');
      if (conflicts.length) {
        for (const conflict of conflicts) next[conflict.id][conflict.slot] = previous;
      }
      next[id][slot] = checked.binding;
      return commit(next);
    }
    function reload() {
      try {
        const raw = shared.storage && shared.storage.getItem(STORAGE_KEY), saved = raw && JSON.parse(raw);
        shared.bindings = saved && saved.schema === 1 ? normalizeBindings(saved.bindings) : defaults();
        notify(); return { ok: true };
      } catch { return { ok: false, code: 'storage', error: '本机暂时无法读取按键设置。' }; }
    }
    const api = {
      key: STORAGE_KEY, actions, resolve, press, release, clear, held, movement, label, decorateBindings,
      bindings: () => clone(shared.bindings), conflictsFor, setBinding, reset: () => commit(defaults(), true), reload,
      fork: () => controller(shared),
      subscribe(listener) { shared.listeners.add(listener); return () => shared.listeners.delete(listener); },
      destroy() { clear(); shared.controllers.delete(clear); }
    };
    return api;
  }
  return { STORAGE_KEY, actions, create, defaults, normalizeBindings, normalizeBinding, validateBinding, bindingFromEvent, formatBinding, isEditableTarget };
});
