
(function(){
'use strict';
const {KEY,TOPICS,S}=window.AYL;
const PREF='are-you-lost:cinema-v1';
const $=id=>document.getElementById(id);
const make=(tag,cl,t)=>{const el=document.createElement(tag);if(cl)el.className=cl;if(t!==undefined)el.textContent=t;return el};
function fresh(){return {node:'start',visited:[],note:'',started:Date.now(),incident:null,seen:{}}}
function restore(){
 try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&S[s.node]&&Array.isArray(s.visited))return {
 node:s.node,visited:s.visited.filter(x=>TOPICS[x]),note:typeof s.note==='string'?s.note.slice(0,600):'',
 started:s.started||Date.now(),incident:['returned','ledge','untouched'].includes(s.incident)?s.incident:null,
 seen:s.seen&&typeof s.seen==='object'?s.seen:{}
 }}catch(e){}
 return fresh();
}
function prefRead(){try{const v=JSON.parse(localStorage.getItem(PREF)||'null');return v&&typeof v==='object'?v:{}}catch(e){return {}}}
let state=restore();
let prefs=prefRead();
let reduce=prefs.reduce===true||(prefs.reduce===undefined&&typeof window.matchMedia==='function'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
let autoplay=!!prefs.autoplay;
let audioOn=false,ctxSound=null;
let timer=null,lines=[],cursor=0,choiceMode=false,demo=false;
const outsideEvents=[
 '站外的送货车正在卸货，司机已经工作四个小时。',
 '夜班保洁员在交接钥匙，有一把暂时找不到。',
 '便利店的灯亮了。第一位客人只买了面包。',
 '一个年轻人坐上早班车，准备去面试一份并不喜欢的工作。',
 '城市里的早班人群陆续经过，没有人注意候车室。',
 '天色渐亮。路口的红灯按照自己的节奏变换。',
 '另一条街的早餐店开门了。今天也有人忘带零钱。'
];
const coinEcho={
 returned:'你把硬币交给了清洁工。他仍不确定那是不是自己的钱。',
 ledge:'你留在台面的硬币，后来被清洁工放进失物盒。',
 untouched:'你没有碰那枚硬币。它后来滑进了售货机底座。'
};
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function savePrefs(){try{localStorage.setItem(PREF,JSON.stringify({reduce,autoplay}))}catch(e){}}
function setPrefs(){
 $('film').classList.toggle('reduce',reduce);
 $('motionBtn').textContent='动态排版：'+(reduce?'关闭':'开启');
 $('autoBtn').textContent='自动放映：'+(autoplay?'开启':'关闭');
}
function stopTimer(){if(timer!==null){window.clearTimeout(timer);timer=null}}
function schedule(){
 stopTimer();if(!autoplay||choiceMode||demo||document.hidden||$('menuDialog').open||$('recordDialog').open||$('helpDialog').open)return;
 const text=lines[cursor]&&lines[cursor][1]||'';
 timer=window.setTimeout(next,Math.max(3700,Math.min(8200,2500+text.length*90)));
}
function effectFor(id){
 if(['future','futureC','projection'].includes(id))return 'scatter';
 if(['money','moneyA','moneyB','moneyC','work','workA','workB','futureB'].includes(id))return 'pressure';
 if(['meaning','meaningA','meaningB','exist','existA','existC'].includes(id))return 'void';
 if(['loss','lossA','lossB','start','arriveA','arriveB','note'].includes(id))return 'memory';
 if(['ending','existB'].includes(id))return 'resolve';
 return 'still';
}
function fragments(){
 $('effectField').replaceChildren();
 if(reduce||$('film').dataset.emotion!=='scatter')return;
 const words=['如果','还来得及吗','为什么','我应该','可是','是不是','又一次','万一','算了','也许','不对','怎么办'];
 words.forEach((word,i)=>{
  const el=make('span','fragment',word);
  el.style.setProperty('--angle',(-80+i*14.5)+'deg');
  el.style.setProperty('--distance',(115+(i%4)*29)+'px');
  el.style.setProperty('--delay',((i%4)*45)+'ms');
  $('effectField').append(el);
 });
}
function buildLines(){
 const s=S[state.node];
 const out=(typeof s.lines==='function'?s.lines(state):s.lines).map(([who,t])=>[who,t]);
 if(state.node==='lossA'&&state.visited.includes('money'))out.push(['girl','“你刚才谈过钱。”她说，“资源不足与失去后的遗憾，会纠缠在一起。但它们不是同一件事。”']);
 if(state.node==='meaningB'&&state.visited.includes('work'))out.push(['narrator','你想起了刚才关于劳动价值的谈话。原来你也曾经拿市场给出的价格衡量自己。']);
 if(state.node==='ending'){
  const count=state.visited.length;
  out.push(['narrator',count===0?'你没有谈起任何问题。沉默也没关系。':count<3?'你只谈了几个问题。其余的问题不必今天解决。':'你谈过了'+count+'个问题，没有人因此给你颁发“想明白了”的证书。']);
  if(state.incident)out.push(['narrator','【另一条因果】\n'+coinEcho[state.incident]]);
  if(state.note)out.push(['self','你留下的一句话：\n“'+state.note+'”']);
 }
 return out;
}
function go(id){
 if(!S[id])return;
 stopTimer();demo=false;
 state.node=id;
 state.seen[id]=(Number(state.seen[id])||0)+1;
 if(S[id].incident)state.incident=S[id].incident;
 if(S[id].topic&&!state.visited.includes(S[id].topic))state.visited.push(S[id].topic);
 save();render();
}
function render(){
 const s=S[state.node];
 stopTimer();choiceMode=false;demo=false;cursor=0;
 lines=buildLines();
 $('film').dataset.emotion=effectFor(state.node);
 $('film').dataset.scene=state.node;
 $('chapter').textContent=s.chapter;
 $('heading').textContent=s.title;
 $('heading').className='heading'+(reduce?'':' animate');
 $('subtitle').textContent=s.subtitle;
 $('frame').textContent='REEL 01 / SHOT '+String(Object.values(state.seen).reduce((a,n)=>a+(Number(n)||0),1)).padStart(3,'0');
 $('timecode').textContent='03:17 · B&W';
 $('choices').replaceChildren();$('choices').className='choices';
 $('extra').replaceChildren();$('extra').className='extra';
 $('skipBtn').hidden=false;
 fragments();
 showLine(0);
 if(state.node==='note')drawNote();
 if(state.node==='ending')drawEnding();
 record();
 document.title=s.title+' — ARE YOU LOST?';
 soundCue();
}
function showLine(index){
 if(index>=lines.length){reveal();return}
 stopTimer();cursor=index;
 const [who,original]=lines[index];
 let text=original||'';
 const bracket=/^【([^】]+)】\s*/.exec(text);
 if(bracket)text=text.slice(bracket[0].length);
 const whoText=who==='girl'?'她 / THE STRANGER':who==='self'?'你 / YOU':'画面 / THE FRAME';
 $('voice').textContent=bracket?bracket[1]+' · '+whoText:whoText;
 $('line').textContent=text;
 $('line').dataset.who=who;
 $('line').className='line'+(reduce?'':' animate');
 $('lineWrap').scrollTop=0;
 $('sceneCount').textContent='FRAME '+String(index+1).padStart(2,'0')+' / '+String(lines.length).padStart(2,'0');
 $('railFill').style.width=(((index+1)/Math.max(1,lines.length))*100)+'%';
 $('tapHint').textContent='轻触银幕 · 下一镜';
 $('skipBtn').hidden=false;
 schedule();
}
function next(){
 if(demo){render();return}
 if(choiceMode)return;
 if(cursor+1<lines.length)showLine(cursor+1);else reveal();
}
function reveal(){
 stopTimer();choiceMode=true;
 $('skipBtn').hidden=true;
 $('tapHint').textContent='镜头暂停 · 等待选择';
 $('choices').replaceChildren();
 const options=S[state.node].choices.filter(c=>!c.when||c.when(state));
 options.forEach((c,i)=>{
  const b=make('button','choice');
  b.type='button';
  b.append(make('span','',c.label),make('span','num',String(i+1).padStart(2,'0')+' ↗'));
  b.addEventListener('click',()=>{if(c.action==='help'){$('helpDialog').showModal()}else go(c.next)});
  $('choices').append(b);
 });
 $('choices').className='choices visible';
 $('sceneCount').textContent='你可以选择，也可以不选';
 $('railFill').style.width='100%';
 if(state.node==='note'||state.node==='ending')$('extra').className='extra visible';
}
function drawNote(){
 const area=make('textarea');area.maxLength=600;area.value=state.note;
 area.placeholder='现在最难说出口的事是……';area.setAttribute('aria-label','写给自己的话');
 const wrapper=make('div');
 const hint=make('p','note-hint','最多 600 字。只保存到当前浏览器，不会上传或发送给任何人。');
 const buttons=make('div','note-actions');
 const btn=make('button','primary','保存文字');
 const status=make('span','note-hint');status.setAttribute('role','status');
 btn.addEventListener('click',()=>{state.note=area.value.slice(0,600);save();record();status.textContent='已经留在这个浏览器里。'});
 buttons.append(btn,status);wrapper.append(area,hint,buttons);
 $('extra').append(wrapper);
}
function drawEnding(){
 const b=make('button','outline','导出车票 · TXT');
 b.addEventListener('click',exportTicket);$('extra').append(b);
}
function exportTicket(){
 const list=['ARE YOU LOST?','一张没有终点的车票','',
 '触碰过的问题：'+(state.visited.map(k=>TOPICS[k]).join(' / ')||'尚未选择'),'',
 '写给自己的话：',state.note||'（留白）','','电影结束了。世界没有。'];
 const blob=new Blob([list.join('\n')],{type:'text/plain;charset=utf-8'});
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download='are-you-lost-车票.txt';
 document.body.append(a);a.click();a.remove();
 window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function record(){
 $('tokens').replaceChildren();
 Object.entries(TOPICS).forEach(([k,v])=>$('tokens').append(make('span','token'+(state.visited.includes(k)?'':' missing'),v)));
 $('outside').textContent=outsideEvents[Math.min(state.visited.length,outsideEvents.length-1)];
 $('cause').textContent=coinEcho[state.incident]||'还有一枚硬币，在等待下一场戏。';
 $('memo').textContent=state.note||'还没有写下什么。沉默也没关系。';
}
const previewData={
 scatter:['杂念','如果，还有别的可能','如果我早点知道。如果那天没有回头。如果当时再快一点。'],
 pressure:['压力','还 不 够','再快一点。还差一点。每一个字都快要被挤碎。'],
 void:['虚无','一切终将消失吗','你凝视着这些文字。它们慢慢变得透明。'],
 memory:['回忆','那一场雨','旧日的光慢慢显影，像放在抽屉里的一卷底片。']
};
function preview(mode){
 if(!previewData[mode])return;
 stopTimer();demo=true;choiceMode=false;
 $('menuDialog').close();
 $('film').dataset.scene='preview';
 $('film').dataset.emotion=mode;
 $('chapter').textContent='SPECIAL SCREENING / 文字试镜';
 $('heading').textContent=previewData[mode][1];$('heading').className='heading'+(reduce?'':' animate');
 $('subtitle').textContent=previewData[mode][0]+' / KINETIC TYPE';
 $('voice').textContent='银幕 / THE SCREEN';
 $('line').textContent=previewData[mode][2];
 $('line').dataset.who='self';$('line').className='line'+(reduce?'':' animate');
 $('sceneCount').textContent='演出预览 · 不改变游戏进度';
 $('railFill').style.width='100%';
 $('tapHint').textContent='轻触银幕 · 返回剧情';
 $('choices').className='choices';$('extra').className='extra';$('skipBtn').hidden=true;
 fragments();soundCue();
}
function reset(){
 if(window.confirm('从头开始并清除本机的剧情选择与笔记吗？此操作无法撤销。')){
  $('menuDialog').close();state=fresh();save();go('start');
 }
}
function createAudio(){
 const Context=window.AudioContext||window.webkitAudioContext;
 if(!Context)throw new Error('Web Audio unsupported');
 const ctx=new Context(),master=ctx.createGain();master.gain.value=.6;master.connect(ctx.destination);
 const osc=ctx.createOscillator(),og=ctx.createGain();osc.type='sine';osc.frequency.value=57;og.gain.value=.016;
 osc.connect(og);og.connect(master);osc.start();
 const buf=ctx.createBuffer(1,Math.floor(ctx.sampleRate*2),ctx.sampleRate),data=buf.getChannelData(0);
 for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.6;
 const noise=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),ng=ctx.createGain();
 noise.buffer=buf;noise.loop=true;filter.type='lowpass';filter.frequency.value=380;ng.gain.value=.02;
 noise.connect(filter);filter.connect(ng);ng.connect(master);noise.start();
 return {ctx,master,osc,noise};
}
async function toggleAudio(){
 if(audioOn){
  audioOn=false;
  try{await ctxSound.ctx.suspend()}catch(e){}
  $('soundBtn').textContent='SOUND OFF';$('soundBtn').setAttribute('aria-pressed','false');
 }else{
  try{if(!ctxSound)ctxSound=createAudio();await ctxSound.ctx.resume();audioOn=true;
   $('soundBtn').textContent='SOUND ON';$('soundBtn').setAttribute('aria-pressed','true');
  }catch(e){audioOn=false;$('soundBtn').textContent='声音不可用'}
 }
}
function soundCue(){
 if(!audioOn||!ctxSound)return;
 try{
  const ctx=ctxSound.ctx,osc=ctx.createOscillator(),gain=ctx.createGain();
  osc.type='sine';osc.frequency.value=$('film').dataset.emotion==='pressure'?44:90;
  gain.gain.setValueAtTime(.0001,ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.012,ctx.currentTime+.09);
  gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+1.1);
  osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+1.15);
 }catch(e){}
}
$('screen').addEventListener('click',next);
$('screen').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();next()}});
$('skipBtn').addEventListener('click',()=>{if(demo)render();else reveal()});
$('soundBtn').addEventListener('click',toggleAudio);
$('menuBtn').addEventListener('click',()=>{stopTimer();$('menuDialog').showModal()});
$('noteBtn').addEventListener('click',()=>{$('menuDialog').close();go('note')});
$('recordBtn').addEventListener('click',()=>{$('menuDialog').close();record();$('recordDialog').showModal()});
$('helpBtn').addEventListener('click',()=>{stopTimer();$('helpDialog').showModal()});
$('resetBtn').addEventListener('click',reset);
$('motionBtn').addEventListener('click',()=>{reduce=!reduce;setPrefs();savePrefs();fragments()});
$('autoBtn').addEventListener('click',()=>{autoplay=!autoplay;setPrefs();savePrefs();if(autoplay)schedule();else stopTimer()});
document.querySelectorAll('[data-preview]').forEach(b=>b.addEventListener('click',()=>preview(b.dataset.preview)));
['menuDialog','recordDialog','helpDialog'].forEach(id=>$(id).addEventListener('close',()=>schedule()));
document.addEventListener('visibilitychange',()=>{
 if(document.hidden){stopTimer();if(audioOn&&ctxSound)ctxSound.ctx.suspend().catch(()=>{})}
 else{if(audioOn&&ctxSound)ctxSound.ctx.resume().catch(()=>{});schedule()}
});
setPrefs();render();
})();
