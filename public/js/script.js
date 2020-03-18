(function ($, root, undefined) {

  var audio = document.getElementById("audio");
  var $boton = $("#boton-audio");
  var totalSections = $( ".dibujo" ).length;
  var id = 0;
  var $section;
  var $path;
  var audioFrom;
  var audioTo;
  
  updateValues(id);
  $boton.click(playPauseAudio); //pausar reproducir audio

  function updateValues(i) {
    console.log('id: ', i);

    if (i < totalSections) { //revisa que aun hayan secciones
      $section = $('#'+ id);
      $path = $section.find("path");
      audioFrom = $section.attr("audio-from");
      audioTo = $section.attr("audio-to");
      
      audio.currentTime = audioFrom;
      pathPrepare($path); //preparar path
      $section.show();
    }
  }

   //funcion para preparar el path
  function pathPrepare ($p) {
    var lineLength = $p[0].getTotalLength();
    $p.css("stroke-dasharray", lineLength);
    $p.css("stroke-dashoffset", lineLength);
  }

  function playPauseAudio() {
    var playing = $boton.hasClass('playing') ? true : false;
    
    if (!playing) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  function playAudio() {
    $boton.removeClass('playing').removeClass('paused');
    $boton.addClass('playing');
    audio.play();
    drawPath.play();
  
    audio.ontimeupdate = () => {
        var timeCurrent = audio.currentTime - audioFrom;
        var timeTotal = audioTo - audioFrom;
        updateProgressBar( timeCurrent, timeTotal );
    }
  }

  function pauseAudio() {
    $boton.removeClass('playing').removeClass('paused');
      $boton.addClass('paused');

      audio.pause();
      drawPath.pause();
  }

  //funcion para controlar barra de progreso del a
  function updateProgressBar( current, total ) {
    var porcentaje = ( current * 100 ) / total;
    $( '.slider .current' ).attr( 'style', 'width: '+porcentaje+'%' ); 
  };

  //animación del path
  var drawPath = gsap.to(
    $path, 
      { 
      duration: audioTo,
      strokeDashoffset: 0, 
      ease:Linear.easeNone,
      paused:true,
      onComplete:function(){playNext()}
  });

  function playNext(){
    $section.hide();
    updateValues(++id);
    drawPath.play();
  };

})(jQuery, this);


    /*//funcion para controlar barra de progreso del a
    function updateAnimation(current, total) {
      var porcentaje = (current * 100)/total;
      var pathOffset = lineLength - (lineLength * current/total);

      $('.slider .current').attr('style', 'width: '+porcentaje+'%');
      $path.animate({ "stroke-dashoffset": pathOffset } );
 
  }*/



 