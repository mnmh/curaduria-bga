(function ($, root, undefined) {

  var audio = document.getElementById("audio");

  var id = 1;
  var $section = $('#'+ id);
  var $path = $section.find("path");
  var audioFrom = $section.attr("audio-from");
  var audioTo = $section.attr("audio-to");
  audio.currentTime = parseFloat(audioFrom);
  
  //preparar path
  pathPrepare($path);

  //pausar reproducir audio
  $("#toggle-play").click(togglePlay);

  //funcion para preparar el path
	function pathPrepare ($p) {
		var lineLength = $p[0].getTotalLength();
		$p.css("stroke-dasharray", lineLength);
		$p.css("stroke-dashoffset", lineLength);
  }
  
  //animación svg
  var drawPath = gsap.to(
    $path, 
      { 
      duration: (audioTo - audioFrom),
      strokeDashoffset: 0, 
      ease:Linear.easeNone,
      paused:true,
      onComplete: audio.pause()
  });
  
  //funcion para Pausar / reproducir Audio
  function togglePlay() { 
    if (audio.currentTime === 0 || (audio.paused && audio.currentTime > 0 && !audio.ended)){
      audio.play(); //reproducir
      drawPath.play(); //empieza anim
    } else {
      audio.pause(); //pausar
      drawPath.pause(); //pausar anim
    }
  }
})(jQuery, this);