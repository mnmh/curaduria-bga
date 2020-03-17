(function ($, root, undefined) {

  var x = $("#audio")[0];

  var id = 1;
  var $section = $('#'+ id);
  var $path = $section.find("path");
  var audioFrom = $section.attr("audio-from");
  var audioTo = $section.attr("audio-to");
  x.currentTime = parseFloat(audioFrom);
  
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
      onComplete: playNext
  });

  //funcion para pasar a la siguiente seccion
  function playNext() {
    x.pause();
    drawPath.pause();
    $section.hide();

    //update id
    id++;
    $section = $('#'+ id);
    $section.show();
    $path = $section.find("path");
    audioFrom = $section.attr("audio-from");
    audioTo = $section.attr("audio-to");
    x.currentTime = audioFrom; //avanzar reproductor
    pathPrepare($path);
    
  }
	
  //funcion para Pausar / reproducir Audio
  function togglePlay() { 
    if (x.currentTime === 0 || (x.paused && x.currentTime > 0 && !x.ended)){
      x.play(); //reproducir
      drawPath.play(); //empieza anim
      console.log('play', 'time:', x.currentTime);
    } else {
      x.pause(); //pausar
      drawPath.pause(); //pausar anim
      console.log('pause', 'time:', x.currentTime);
    }
  }
})(jQuery, this);

//$("#audio").addClass('paused').removeClass('playing');