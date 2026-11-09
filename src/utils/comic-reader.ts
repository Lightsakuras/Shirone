/** Reader runtime owns browser-only progress, with per-navigation cleanup.
 * No account/server data is stored; entries are scoped to the visible series.
 * Resume is explicit rather than unexpectedly scrolling on page entry.
 */
let dispose: (() => void) | undefined;
function initReader(): void {
 dispose?.();
 const reader=document.querySelector<HTMLElement>('[data-comic-reader]');
 if(!reader)return;
 const pages=Array.from(reader.querySelectorAll<HTMLElement>('.comic-reader figure'));
 const select=reader.querySelector<HTMLSelectElement>('[data-comic-select]');
 const tools=reader.querySelector<HTMLElement>('[data-comic-tools]');
 const previous=reader.querySelector<HTMLButtonElement>('[data-comic-prev]');
 const next=reader.querySelector<HTMLButtonElement>('[data-comic-next]');
 const resume=reader.querySelector<HTMLAnchorElement>('[data-comic-resume]');
 if(!pages.length||!select||!tools||!previous||!next||!resume)return;
 const key=`sakura-reader-v1:${reader.dataset.comicReader}`;
 let current=0,frame=0,hasRead=false;
 try{const saved=Number(localStorage.getItem(key));if(Number.isInteger(saved)&&saved>1&&saved<=pages.length){resume.href=`#page-${saved}`;resume.hidden=false;}}catch{}
 tools.hidden=false;
 const update=()=>{
  frame=0;
  const checkpoint=Math.min(innerHeight*.35,240);
  let active=0;
  for(let i=0;i<pages.length;i++){if(pages[i].getBoundingClientRect().top<=checkpoint)active=i;else break;}
  current=active;select.value=String(active+1);previous.disabled=active===0;next.disabled=active===pages.length-1;
  reader.querySelectorAll('.comic-page-index a').forEach((a,i)=>{if(i===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  // Do not erase a saved position while merely revisiting the story header.
  if(pages[0].getBoundingClientRect().top<innerHeight*.75)hasRead=true;
  if(hasRead){try{localStorage.setItem(key,String(active+1));}catch{}}
 };
 const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
 const go=(page:number)=>{const target=pages[Math.max(0,Math.min(pages.length-1,page))];const paused=document.documentElement.dataset.creativePaused==='true'||document.documentElement.classList.contains('motion-reduced');target.scrollIntoView({block:'start',behavior:paused||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 const prevClick=()=>go(current-1),nextClick=()=>go(current+1),selectChange=()=>go(Number(select.value)-1);
 previous.addEventListener('click',prevClick);next.addEventListener('click',nextClick);select.addEventListener('change',selectChange);
 addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);update();
 dispose=()=>{cancelAnimationFrame(frame);removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);previous.removeEventListener('click',prevClick);next.removeEventListener('click',nextClick);select.removeEventListener('change',selectChange);};
}
initReader();
document.addEventListener('DOMContentLoaded',initReader);
document.addEventListener('swup:page:view',initReader);
document.addEventListener('astro:page-load',initReader);
