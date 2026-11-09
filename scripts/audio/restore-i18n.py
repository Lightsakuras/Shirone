from pathlib import Path
import json
p=Path(__file__).resolve().parents[2]/'src/i18n'
keys=['Title','Play','Pause','Next','Track','Volume','Note','Error','Playing','Paused']
words={
'zh_CN':['花间电台','开启音乐','暂停音乐','下一首','选择曲目','音量','临时原创合成配乐 · 非 QQ 歌单','播放失败，请重试','正在播放','已暂停'],
'zh_TW':['花間電台','開啟音樂','暫停音樂','下一首','選擇曲目','音量','暫時原創合成配樂 · 非 QQ 歌單','播放失敗，請重試','正在播放','已暫停'],
'en':['Petal Radio','Play music','Pause music','Next track','Select track','Volume','Temporary original synthesized music · not QQ playlists','Playback failed. Please retry.','Playing','Paused'],
'ja':['花のラジオ','音楽を再生','一時停止','次の曲','曲を選ぶ','音量','仮のオリジナル合成音楽 · QQ プレイリストではありません','再生できません。再試行してください。','再生中','一時停止中'],
'ko':['꽃잎 라디오','음악 재생','음악 일시정지','다음 곡','곡 선택','볼륨','임시 자체 합성 음악 · QQ 재생목록 아님','재생 실패. 다시 시도하세요.','재생 중','일시정지'],
'es':['Radio de pétalos','Reproducir música','Pausar música','Siguiente pista','Elegir pista','Volumen','Música sintetizada original provisional · no son listas QQ','Error de reproducción. Inténtalo de nuevo.','Reproduciendo','En pausa'],
'id':['Radio Kelopak','Putar musik','Jeda musik','Lagu berikutnya','Pilih lagu','Volume','Musik sintesis orisinal sementara · bukan daftar QQ','Gagal memutar. Coba lagi.','Memutar','Dijeda'],
'th':['วิทยุกลีบดอกไม้','เล่นเพลง','หยุดเพลงชั่วคราว','เพลงถัดไป','เลือกเพลง','ระดับเสียง','ดนตรีสังเคราะห์ต้นฉบับชั่วคราว · ไม่ใช่เพลย์ลิสต์ QQ','เล่นไม่สำเร็จ โปรดลองอีกครั้ง','กำลังเล่น','หยุดชั่วคราว'],
 'tr':['Yaprak Radyosu','Müziği çal','Müziği duraklat','Sonraki parça','Parça seç','Ses düzeyi','Geçici özgün sentez müzik · QQ listeleri değil','Çalma başarısız. Tekrar deneyin.','Çalıyor','Duraklatıldı'],
'vi':['Radio cánh hoa','Phát nhạc','Tạm dừng nhạc','Bài tiếp theo','Chọn bài','Âm lượng','Nhạc tổng hợp gốc tạm thời · không phải danh sách QQ','Phát thất bại. Vui lòng thử lại.','Đang phát','Đã tạm dừng']}
f=p/'i18nKey.ts';s=f.read_text()
if 'creativeAudioTitle =' not in s:
 s=s.replace('enum I18nKey {','enum I18nKey {\n'+''.join(f'\tcreativeAudio{k} = "creativeAudio{k}",\n' for k in keys),1);f.write_text(s)
for lang,ws in words.items():
 f=p/'languages'/f'{lang}.ts';s=f.read_text()
 if '[Key.creativeAudioTitle]' in s: continue
 pos=s.index(': Translation = {')+len(': Translation = {');s=s[:pos]+'\n'+''.join(f'\t[Key.creativeAudio{k}]: {json.dumps(w,ensure_ascii=False)},\n' for k,w in zip(keys,ws))+s[pos:];f.write_text(s)
