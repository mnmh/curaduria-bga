(function ($, root, undefined) {

  var audio = document.getElementById("audio");
  var $boton = $("#boton-audio");

  var id = 1;
  var $section = $('#'+ id);
  var $path = $section.find("path");
  var audioFrom = $section.attr("audio-from");
  var audioTo = $section.attr("audio-to");
  audio.currentTime = parseFloat(audioFrom);
  
  
  //pausar reproducir audio
  $boton.click(playPauseAudio);

  function playPauseAudio() {
    var playing = $boton.hasClass('playing') ? true : false;
    
    if (!playing) {
      $boton.removeClass('playing').removeClass('paused');
      $boton.addClass('playing');

      audio.play();

      audio.ontimeupdate = () => {
          var timeCurrent = audio.currentTime - audioFrom;
          var timeTotal = audioTo - audioFrom;
          updateAnimation(timeCurrent, timeTotal);
    }

    } else {
      $boton.removeClass('playing').removeClass('paused');
      $boton.addClass('paused');

      audio.pause();
    }
  }

})(jQuery, this);


 /* //preparar path
  pathPrepare($path);


  //funcion para preparar el path
	function pathPrepare ($p) {
		var lineLength = $p[0].getTotalLength();
		$p.css("stroke-dasharray", lineLength);
		$p.css("stroke-dashoffset", lineLength);
  }*/