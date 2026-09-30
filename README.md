<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Assista Grátis - Player Kwai</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;overflow:hidden;font-family:Arial}
#feed{height:100vh;overflow-y:scroll;scroll-snap-type:y mandatory;-webkit-overflow-scrolling:touch}
.box{height:100vh;width:100vw;scroll-snap-align:start;position:relative;background:#000;display:flex;align-items:center;justify-content:center}
video{height:100vh;width:100vw;object-fit:contain;background:#000}
.btn{position:fixed;top:15px;left:50%;transform:translateX(-50%);z-index:99;background:#ff0050;color:#fff;padding:14px 22px;border-radius:30px;border:0;font-weight:bold;font-size:15px}
.info{position:absolute;bottom:90px;left:12px;color:#fff;text-shadow:1px 1px 3px #000;font-size:13px;max-width:80%}
</style>
</head>
<body>
<button class="btn" id="pick">📁 ESCOLHER VÍDEOS DA MEMÓRIA</button>
<div id="feed"></div>
<script>
document.getElementById('pick').onclick=()=>{
 let inp=document.createElement('input');inp.type='file';inp.multiple=true;inp.accept='video/*';
 inp.onchange=e=>{
   document.getElementById('pick').style.display='none';
   let feed=document.getElementById('feed');
   [...e.target.files].forEach(file=>{
     let box=document.createElement('div');box.className='box';
     let v=document.createElement('video');
     v.src=URL.createObjectURL(file);v.loop=true;v.playsInline=true;v.muted=false;
     v.setAttribute('playsinline','');box.appendChild(v);
     let info=document.createElement('div');info.className='info';info.textContent=file.name;box.appendChild(info);
     box.onclick=()=>v.paused?v.play():v.pause();
     let obs=new IntersectionObserver(ents=>{
       ents.forEach(ent=>{if(ent.isIntersecting){ent.target.play().catch(()=>{})}else{ent.target.pause()}})
     },{threshold:0.6});obs.observe(v);
     feed.appendChild(box);
   });
 };
 inp.click();
}
</script>
</body>
</html>
