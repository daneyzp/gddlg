(function(){

function parseURL(url){
  try{
    const parsed = new URL(url);
    let id = null;
    let isShort = false;

    /* youtu.be */
    if(parsed.hostname.includes("youtu.be")){
      id = parsed.pathname.slice(1);
    }

    /* watch?v= */
    if(parsed.searchParams.get("v")){
      id = parsed.searchParams.get("v");
    }

    /* embed */
    if(parsed.pathname.includes("/embed/")){
      id = parsed.pathname.split("/embed/")[1];
    }

    /* shorts */
    if(parsed.pathname.includes("/shorts/")){
      id = parsed.pathname.split("/shorts/")[1];
      isShort = true;
    }

    /* live */
    if(parsed.pathname.includes("/live/")){
      id = parsed.pathname.split("/live/")[1];
    }

    /* remove extra params */
    if(id && id.includes("?")){
      id = id.split("?")[0];
    }

    return { id, isShort };

  }catch(e){
    return { id:null, isShort:false };
  }
}

document.querySelectorAll(".yt-premium-embed").forEach(box => {

  const { id:videoID, isShort } = parseURL(box.dataset.url);

  if(!videoID){
    box.innerHTML = "Invalid YouTube URL";
    return;
  }

  /* Aspect ratio */
  box.classList.add(isShort ? "yt-ratio-9x16" : "yt-ratio-16x9");

  /* Thumbnail + Play */
  box.innerHTML = `
    <img class="yt-premium-thumb"
         src="https://img.youtube.com/vi/${videoID}/hqdefault.jpg"
         alt="YouTube Thumbnail">
    <div class="yt-premium-play"></div>
  `;

  /* Load iframe on click */
  box.addEventListener("click", function(){

    box.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen; gyroscope; accelerometer"
        allowfullscreen>
      </iframe>
    `;

  }, { once:true });

});

})();