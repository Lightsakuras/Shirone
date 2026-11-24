(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.XiuxianJourneyRecords = factory();
})(typeof window === 'object' ? window : globalThis, function () {
  'use strict';
  function create({storage, baseKey, validateSave, validateRecovery}) {
    const archiveKey=baseKey+'-journeys', activeKey=baseKey+'-active-journey', prefix=baseKey+'-journey-';
    const validId=id=>typeof id==='string'&&/^[a-zA-Z0-9-]{8,80}$/.test(id);
    const validKey=key=>key===baseKey||typeof key==='string'&&key.startsWith(prefix)&&validId(key.slice(prefix.length));
    const recoveryKey=key=>{if(!validKey(key))throw Error('旅程来源不完整');return key+'-ending-recovery';};
    const verify=(key,raw)=>{storage.setItem(key,raw);if(storage.getItem(key)!==raw)throw Error('旅程记录未完整写入');};
    const clone=value=>JSON.parse(JSON.stringify(value));
    function resolve() {
      const raw=storage.getItem(activeKey);if(raw===null)return baseKey;
      const value=JSON.parse(raw);
      if(!value||value.version!==1||!validKey(value.key))throw Error('当前旅程索引暂不可读取');
      if(storage.getItem(value.key)===null)throw Error('当前旅程存档尚未找到');
      return value.key;
    }
    function read() {
      const raw=storage.getItem(archiveKey);if(raw===null)return {version:1,records:[]};
      const value=JSON.parse(raw);
      if(!value||value.version!==1||!Array.isArray(value.records)||value.records.length>64)throw Error('旅程档案暂不可读取');
      const ids=new Set();
      for(const record of value.records){
        if(!record||!validId(record.id)||ids.has(record.id)||!validKey(record.sourceKey)||typeof record.title!=='string'||record.title.length>160||!Number.isFinite(Date.parse(record.createdAt)))throw Error('旅程档案来源不完整');
        ids.add(record.id);validateSave(record.save);validateRecovery(record.recovery);
      }
      return value;
    }
    function fork({currentKey, save, recovery, newSave, title, id, createdAt}) {
      if(!validKey(currentKey)||!validId(id)||typeof title!=='string'||title.length>160||!Number.isFinite(Date.parse(createdAt)))throw Error('新旅程说明不完整');
      validateSave(save);validateRecovery(recovery);validateSave(newSave);
      if(!save.campaign?.ending||newSave.campaign?.ending)throw Error('须从已经落定的行程开始新旅程');
      if(resolve()!==currentKey)throw Error('另一窗口已切换行程，请先导出当前进度');
      const key=prefix+id, oldPointer=storage.getItem(activeKey), archive=read();
      if(storage.getItem(key)!==null||storage.getItem(recoveryKey(key))!==null)throw Error('新旅程编号已被使用');
      const snapshot=JSON.stringify({save,recovery});
      if(!archive.records.some(record=>record.sourceKey===currentKey&&JSON.stringify({save:record.save,recovery:record.recovery})===snapshot)){
        if(archive.records.length>=64)throw Error('旅程档案已满，请先导出留存；旧档不会自动删除');
        if(archive.records.some(record=>record.id===id))throw Error('旅程档案编号已被使用');
        archive.records.push({id,sourceKey:currentKey,title,createdAt,save:clone(save),recovery:clone(recovery)});
        verify(archiveKey,JSON.stringify(archive));
      }
      verify(key,JSON.stringify(newSave));
      verify(recoveryKey(key),JSON.stringify({version:1,points:{}}));
      if(storage.getItem(activeKey)!==oldPointer)throw Error('另一窗口已切换行程，旧记录仍保留');
      // Each storage write is atomic; the collection is not. Activate only after all copies verify.
      try { verify(activeKey,JSON.stringify({version:1,key})); }
      catch(error){
        try {if(oldPointer===null)storage.removeItem(activeKey);else storage.setItem(activeKey,oldPointer);}
        catch {throw Error('旅程切换结果暂无法核对，旧行程与备份仍保留；请先导出当前进度并重新打开');}
        throw error;
      }
      return {key,archive:clone(archive)};
    }
    return {resolve,read,fork,recoveryKey,archiveKey,activeKey};
  }
  return {create};
});
