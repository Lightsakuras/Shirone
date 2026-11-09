"""Original procedural compositions for Lightsakura. No samples, recordings or borrowed melodies.
Reproduce with Python + numpy + ffmpeg. All note events are authored below.
"""
from pathlib import Path
import numpy as np, wave, subprocess
SR=32000
OUT=Path(__file__).resolve().parents[2]/'public/audio/creative'
OUT.mkdir(parents=True,exist_ok=True)
def render(name,bpm,roots,melody):
    beat=60/bpm; bars=32; length=bars*4*beat+6
    mix=np.zeros((int(length*SR),2),dtype=np.float64)
    def note(midi,start,dur,amp,kind='bell',pan=0):
        n=int(dur*SR);t=np.arange(n)/SR; f=440*2**((midi-69)/12)
        if kind=='pad':
            env=np.minimum(t/1.8,1)*np.minimum((dur-t)/2.5,1)
            sig=(np.sin(2*np.pi*f*t)+.20*np.sin(2*np.pi*f*2*t)+.10*np.sin(2*np.pi*(f+.35)*t))*env
        else:
            env=(1-np.exp(-t/0.018))
            sig=sum(a*np.sin(2*np.pi*f*k*t)*np.exp(-t/(tau*dur)) for k,a,tau in [(1,1,.26),(2,.22,.13),(3,.06,.08)])*env
        p=int(start*SR);n=min(n,len(mix)-p)
        if n<=0:return
        mix[p:p+n,0]+=sig[:n]*amp*np.sqrt((1-pan)/2)
        mix[p:p+n,1]+=sig[:n]*amp*np.sqrt((1+pan)/2)
    for bar in range(bars):
        root=roots[bar%len(roots)];start=bar*4*beat
        for interval in [0,7,14,19]: note(root+interval,start,6*beat,.045,'pad',interval/30-.3)
        note(root-12,start,3.4*beat,.11,'bell',0)
        for j,interval in enumerate([12,19,24,26]): note(root+interval,start+(j+.15)*beat,3*beat,.07,'bell',(-.32,.12,.32,-.12)[j])
        if bar%8!=7:
            for j,offset in enumerate(melody[bar%len(melody)]):
                if offset is not None: note(60+offset,start+(j*.75+.35)*beat,3.5*beat,.095,'bell',.18)
    dry=mix.copy()
    for delay,gain in [(.173,.12),(.347,.09),(.53,.06),(.811,.04)]:
        k=int(delay*SR);mix[k:]+=dry[:-k,::-1]*gain
    fade=min(int(3*SR),len(mix)//2);mix[:fade]*=np.linspace(0,1,fade)[:,None];mix[-fade:]*=np.linspace(1,0,fade)[:,None]
    peak=np.max(np.abs(mix));mix=mix/peak*.70
    wav=OUT/(name+'.wav')
    with wave.open(str(wav),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype('<i2').tobytes())
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','128k',str(OUT/(name+'.mp3'))],check=True);wav.unlink()
    print(name,round(length,2),'seconds')
render('sakura-after-rain',76,[48,45,53,43],[[7,12,14,None,12],[9,7,4,None,7],[5,9,12,None,9],[7,2,7,None,None]])
render('tidal-observatory',64,[45,41,48,43],[[9,16,None,12,7],[5,12,None,9,None],[7,12,16,None,14],[7,14,None,11,7]])
render('starlit-walk',88,[50,47,43,45],[[14,9,7,None,9],[11,7,2,None,7],[7,14,19,None,14],[9,16,14,None,9]])
