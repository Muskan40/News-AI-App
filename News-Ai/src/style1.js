for(let i = 0; i < 90; i++){
  
    const left = (i * 2) + 1;
    const anim = Math.floor(Math.random() * 75 + 400);
    const height = Math.floor(Math.random() * 25 + 3);
    console.log(height);
    
    document.querySelector('#bars').innerHTML += `<div class="bar" style="left:${left}px;animation-duration:${anim}ms;height:${height}px"></div>`;//`<div class="bar" style="left:${left}px">Hello</div>`;
  }