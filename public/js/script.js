(function ($, root, undefined) {

  var x = $("#audio")[0];

  var id = 1;
  var $section = $('#'+ id);
  var $path = $section.find("path");
  var audioFrom = $section.attr("audio-from");
  var audioTo = $section.attr("audio-to");
  
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
      duration: audioTo,
      strokeDashoffset: 0, 
      ease:Linear.easeNone,
      paused:true,
      onComplete:function(){ x.pause()}
  });
	
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