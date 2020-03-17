(function ($, root, undefined) {

  //var a = document.getElementsByClassName("ensayo")[0]; //selecciona el tag objeto
  //var length = a.getTotalLength();
  //console.log("length", length);

  /* ---------------------------------------------
  CONTROLES DE AUDIO
  ------------------------------------------------*/
  document.getElementById("toggle-play").addEventListener("click", togglePlay);

  var x = document.getElementById("audio"); 

  function togglePlay() { 
    if (x.currentTime === 0 || (x.paused && x.currentTime > 0 && !x.ended)){
      x.play();
      console.log('play');
    } else {
      x.pause();
      console.log('pause');
    }
  }

})(jQuery, this);