(function ($, root, undefined) {

  var audio = document.getElementById("audio");
  var $botPlay = $("#boton-audio");
  var $botNext = $("#boton-siguiente");
  var totalSections = $( ".dibujo" ).length;
  var id = 0;
  var $section;
  var $path;
  var audioFrom;
  var audioTo;
  var drawPath; //Animacion del path
  
  updateValues(id);
  $botPlay.click(playPauseAudio); //pausar reproducir audio

  $botNext.click(playNext); //pasar a siguiente pista

  function updateValues(i) {
    console.log('id: ', i);

    if (i < totalSections) { //revisa que aun hayan secciones
      var $seccionAnterior = $('#'+ (id - 1));
      if  ( $seccionAnterior.length ) {
        $seccionAnterior.hide();
        console.log('hide section');
      }
      $section = $('#'+ id);
      $path = $section.find("path");
      audioFrom = $section.attr("audio-from");
      audioTo = $section.attr("audio-to");
      audio.currentTime = audioFrom;
      pathPrepare($path); //preparar path
      
      //animación path
      drawPath = gsap.to(
        $path, 
          { 
          duration: audioTo - audioFrom,
          strokeDashoffset: 0, 
          ease:Linear.easeNone,
          paused:true,
          onComplete:function(){pauseAudio()}
      });
    
      $section.show(); //mostrar seccion actual
    }
  }

  function playNext(){
    console.log('PlayNext');
    updateValues(++id);
    playPauseAudio();
  };

   //funcion para preparar el path
  function pathPrepare ($p) {
    var lineLength = $p[0].getTotalLength();
    $p.css("stroke-dasharray", lineLength);
    $p.css("stroke-dashoffset", lineLength);
  }

  function playPauseAudio() {
    var playing = $botPlay.hasClass('playing') ? true : false;
    
    if (!playing) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  function playAudio() {
    console.log('audio play');
    $botPlay.removeClass('playing').removeClass('paused');
    $botPlay.addClass('playing');
    audio.play();
    drawPath.play();
  
    audio.ontimeupdate = () => {
        var timeCurrent = audio.currentTime - audioFrom;
        var timeTotal = audioTo - audioFrom;
        updateProgressBar( timeCurrent, timeTotal );
    }
  }

  function pauseAudio() {
    console.log('audio pause');
    $botPlay.removeClass('playing').removeClass('paused');
      $botPlay.addClass('paused');

      audio.pause();
      drawPath.pause();
  }

  //funcion para controlar barra de progreso del a
  function updateProgressBar( current, total ) {
    var porcentaje = ( current * 100 ) / total;
    $( '.slider .current' ).attr( 'style', 'width: '+porcentaje+'%' ); 
  };


})(jQuery, this);


    /*//funcion para controlar barra de progreso del a
    function updateAnimation(current, total) {
      var porcentaje = (current * 100)/total;
      var pathOffset = lineLength - (lineLength * current/total);

      $('.slider .current').attr('style', 'width: '+porcentaje+'%');
      $path.animate({ "stroke-dashoffset": pathOffset } );
 
  }*/



 