(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.XiuxianPlayerProfile = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const STORAGE_KEY = 'xiuxian-player-profile-v1';
  const AVATAR_SIZE = 256;
  const MAX_FILE_BYTES = 8 * 1024 * 1024;
  const MAX_SOURCE_EDGE = 8192;
  const MAX_SOURCE_PIXELS = 24000000;
  const MAX_DATA_URL_LENGTH = 400000;
  const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];
  function fail(message, code = 'image') { const error = new Error(message); error.code = code; throw error; }
  function ascii(bytes, start, count) { return String.fromCharCode(...bytes.subarray(start, start + count)); }
  function sourceSize(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) fail('图片尺寸无效，请换一张完整图片。');
    if (width > MAX_SOURCE_EDGE || height > MAX_SOURCE_EDGE || width * height > MAX_SOURCE_PIXELS) fail('图片尺寸过大，请选择边长不超过 8192 像素、总像素不超过 2400 万的图片。', 'dimensions');
    return { width, height };
  }
  function inspectBytes(input) {
    const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
    if (bytes.length < 12) fail('图片内容不完整，请换一张图片。');
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (PNG_SIGNATURE.every((value, i) => bytes[i] === value)) {
      if (bytes.length < 33 || view.getUint32(8) !== 13 || ascii(bytes, 12, 4) !== 'IHDR') fail('PNG 图片内容不完整。');
      return { mime: 'image/png', ...sourceSize(view.getUint32(16), view.getUint32(20)) };
    }
    if (bytes[0] === 255 && bytes[1] === 216) {
      let offset = 2;
      while (offset < bytes.length) {
        if (bytes[offset++] !== 255) fail('JPEG 图片内容无效。');
        while (offset < bytes.length && bytes[offset] === 255) offset++;
        const marker = bytes[offset++];
        if (marker === 217 || marker === 218) break;
        if (marker === 1 || marker >= 208 && marker <= 215) continue;
        if (offset + 2 > bytes.length) break;
        const length = view.getUint16(offset);
        if (length < 2 || offset + length > bytes.length) fail('JPEG 图片内容不完整。');
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marker)) {
          if (length < 8) fail('JPEG 图片尺寸无效。');
          return { mime: 'image/jpeg', ...sourceSize(view.getUint16(offset + 5), view.getUint16(offset + 3)) };
        }
        offset += length;
      }
      fail('未能读取 JPEG 图片尺寸，请换一张完整图片。');
    }
    if (ascii(bytes, 0, 4) === 'RIFF' && ascii(bytes, 8, 4) === 'WEBP') {
      const end = view.getUint32(4, true) + 8;
      if (end > bytes.length || end < 20) fail('WebP 图片内容不完整。');
      for (let offset = 12; offset + 8 <= end;) {
        const type = ascii(bytes, offset, 4), length = view.getUint32(offset + 4, true), start = offset + 8;
        if (start + length > end) fail('WebP 图片内容不完整。');
        if (type === 'VP8X' && length >= 10) {
          const width = 1 + bytes[start + 4] + (bytes[start + 5] << 8) + (bytes[start + 6] << 16);
          const height = 1 + bytes[start + 7] + (bytes[start + 8] << 8) + (bytes[start + 9] << 16);
          return { mime: 'image/webp', ...sourceSize(width, height) };
        }
        if (type === 'VP8 ' && length >= 10 && bytes[start + 3] === 157 && bytes[start + 4] === 1 && bytes[start + 5] === 42) {
          return { mime: 'image/webp', ...sourceSize(view.getUint16(start + 6, true) & 16383, view.getUint16(start + 8, true) & 16383) };
        }
        if (type === 'VP8L' && length >= 5 && bytes[start] === 47) {
          const packed = view.getUint32(start + 1, true);
          return { mime: 'image/webp', ...sourceSize((packed & 16383) + 1, ((packed >>> 14) & 16383) + 1) };
        }
        offset = start + length + (length & 1);
      }
      fail('未能读取 WebP 图片尺寸，请换一张完整图片。');
    }
    fail('请选择 PNG、JPEG 或 WebP 图片；不支持 SVG、动图及其他文件类型。', 'type');
  }
  function decodeBase64Prefix(value) {
    const prefix = value.slice(0, 48);
    if (typeof atob === 'function') return Uint8Array.from(atob(prefix), char => char.charCodeAt(0));
    if (typeof Buffer !== 'undefined') return new Uint8Array(Buffer.from(prefix, 'base64'));
    return null;
  }
  function validAvatar(value) {
    if (!value || typeof value !== 'object' || value.width !== AVATAR_SIZE || value.height !== AVATAR_SIZE ||
      typeof value.dataUrl !== 'string' || value.dataUrl.length > MAX_DATA_URL_LENGTH ||
      !/^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(value.dataUrl)) return null;
    try {
      const header = decodeBase64Prefix(value.dataUrl.slice(22));
      if (!header) return null;
      const info = inspectBytes(header);
      if (info.width !== AVATAR_SIZE || info.height !== AVATAR_SIZE || info.mime !== 'image/png') return null;
      return { dataUrl: value.dataUrl, width: AVATAR_SIZE, height: AVATAR_SIZE };
    } catch { return null; }
  }
  async function decode(blob) {
    if (typeof createImageBitmap === 'function') {
      try { return await createImageBitmap(blob, { imageOrientation: 'from-image' }); }
      catch { /* Some browsers need the Image fallback even for a valid image. */ }
    }
    if (typeof Image === 'undefined' || typeof URL === 'undefined') fail('当前环境无法预览图片，请在游戏窗口中重试。', 'decode');
    const url = URL.createObjectURL(blob);
    try {
      return await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('图片无法解码，请换一张完整图片。'));
        image.src = url;
      });
    } finally { URL.revokeObjectURL(url); }
  }
  async function prepare(file) {
    if (!file || typeof file.arrayBuffer !== 'function' || !Number.isFinite(file.size) || file.size < 1) fail('请先选择一张本地图片。', 'file');
    if (file.size > MAX_FILE_BYTES) fail('图片超过 8 MB，请先选择较小的图片。', 'size');
    if (file.type && !['image/png', 'image/jpeg', 'image/webp', 'image/jpg'].includes(file.type.toLowerCase())) fail('请选择 PNG、JPEG 或 WebP 图片。', 'type');
    let bytes;
    try { bytes = new Uint8Array(await file.arrayBuffer()); }
    catch { fail('暂时无法读取这张本地图片，请重新选择。', 'read'); }
    if (bytes.length > MAX_FILE_BYTES) fail('图片超过 8 MB，请选择较小的图片。', 'size');
    const inspected = inspectBytes(bytes);
    let image;
    try {
      image = await decode(new Blob([bytes], { type: inspected.mime }));
      const width = image.naturalWidth || image.width, height = image.naturalHeight || image.height;
      sourceSize(width, height);
      if (typeof document === 'undefined') fail('当前环境无法生成头像预览。', 'decode');
      const canvas = document.createElement('canvas');
      canvas.width = AVATAR_SIZE; canvas.height = AVATAR_SIZE;
      const context = canvas.getContext('2d');
      if (!context) fail('当前环境无法生成头像预览。', 'decode');
      context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
      const side = Math.min(width, height);
      context.drawImage(image, (width - side) / 2, (height - side) / 2, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE);
      const avatar = validAvatar({ dataUrl: canvas.toDataURL('image/png'), width: AVATAR_SIZE, height: AVATAR_SIZE });
      if (!avatar) fail('生成的头像过大或无效，请换一张较简单的图片。', 'output');
      return avatar;
    } catch (error) {
      if (error.code) throw error;
      fail('图片无法解码，请换一张完整的 PNG、JPEG 或 WebP 图片。', 'decode');
    } finally { image?.close?.(); }
  }
  function defaultStorage() { try { return typeof localStorage !== 'undefined' ? localStorage : null; } catch { return null; } }
  function create(options = {}) {
    const storage = Object.hasOwn(options, 'storage') ? options.storage : defaultStorage();
    let avatar = null;
    try {
      const raw = storage && storage.getItem(STORAGE_KEY), value = raw && JSON.parse(raw);
      if (value?.schema === 1) avatar = validAvatar(value.avatar);
    } catch { /* A broken avatar preference never changes or hides a journey save. */ }
    const listeners = new Set();
    function notify() { for (const listener of listeners) listener(current()); }
    function current() { return avatar ? { ...avatar } : null; }
    function confirm(value) {
      const next = validAvatar(value);
      if (!next) return { ok: false, code: 'invalid', error: '头像预览已失效，请重新选择图片。' };
      try {
        if (!storage) throw Error('storage unavailable');
        storage.setItem(STORAGE_KEY, JSON.stringify({ schema: 1, avatar: next }));
      } catch { return { ok: false, code: 'storage', error: '本机未能保存头像，旧头像和剧情存档未改动。请检查可用存储空间后重试。' }; }
      avatar = next; notify(); return { ok: true };
    }
    function reset() {
      try { if (storage) storage.removeItem(STORAGE_KEY); else if (avatar) throw Error('storage unavailable'); }
      catch { return { ok: false, code: 'storage', error: '本机未能恢复默认头像，旧头像仍保留。请检查本地存储后重试。' }; }
      avatar = null; notify(); return { ok: true };
    }
    return { key: STORAGE_KEY, current, prepare, confirm, reset, subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); } };
  }
  return { STORAGE_KEY, AVATAR_SIZE, MAX_FILE_BYTES, MAX_SOURCE_EDGE, MAX_SOURCE_PIXELS, MAX_DATA_URL_LENGTH, inspectBytes, validAvatar, prepare, create };
});
