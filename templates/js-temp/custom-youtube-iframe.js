(function(){

function extractVideoID(url){
  try{
    const parsed = new URL(url);

    if(parsed.hostname.includes("youtu.be")){
      return parsed.pathname.slice(1);
    }

    if(parsed.searchParams.get("v")){
      return parsed.searchParams.get("v");
    }

    if(parsed.pathname.includes("/embed/")){
      return parsed.pathname.split("/embed/")[1];
    }

  }catch(e){
    return null;
  }
  return null;
}

document.querySelectorAll(".yt-premium-embed").forEach(box => {

  const videoID = extractVideoID(box.dataset.url);

  if(!videoID){
    box.innerHTML = "Invalid YouTube URL";
    return;
  }

  box.innerHTML = `
    <img class="yt-premium-thumb"
         src="https://img.youtube.com/vi/${videoID}/hqdefault.jpg">
    <div class="yt-premium-play"></div>
  `;

  box.addEventListener("click", function(){

    box.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
    `;

  }, { once:true });

});

})();
