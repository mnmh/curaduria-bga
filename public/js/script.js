(function ($, root, undefined) {

  var audio = document.getElementById("audio");
  var $boton = $("#boton-audio");

  var id = 1;
  var $section = $('#'+ id);
  var $path = $section.find("path");
  var lineLength = $path[0].getTotalLength();
  var audioFrom = $section.attr("audio-from");
  var audioTo = $section.attr("audio-to");
  audio.currentTime = parseFloat(audioFrom);
  
  
  //pausar reproducir audio
  $boton.click(playPauseAudio);

   //preparar path
   pathPrepare($path);
   //funcion para preparar el path
   function pathPrepare ($p) {
    $p.css("stroke-dasharray", lineLength);
    $p.css("stroke-dashoffset", lineLength);
  }

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

    //funcion para controlar animaciones con el audio
    function updateAnimation(current, total) {
      var porcentaje = (current * 100)/total;
      var pathOffset = lineLength - (lineLength * current/total);

      $('.slider .current').attr('style', 'width: '+porcentaje+'%');

      $path.css("stroke-dashoffset", pathOffset);

    }
  }

})(jQuery, this);


 