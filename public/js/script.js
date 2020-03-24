(function ($, root, undefined) {

  var audio = document.getElementById("audio");
  var $botPlay = $("#boton-audio");
  var $botNext = $("#boton-siguiente");
  var totalSections = $( ".dibujo" ).length;
  console.log('toal sections: ', totalSections );
  var id = 0;
  var $section;
  var $path;
  var audioFrom;
  var audioTo;
  var drawPath; //Animacion del path
  
  updateValues(id);
  $botPlay.click(playPauseAudio); //pausar reproducir audio

  $botNext.click(playNext); //pasar a siguiente pista

  //funcion para actualizar variables
  function updateValues(i) {
    //console.log('id: ', i);

    //revisa que aun hayan secciones
    if (i < totalSections) { 

      //Actualizar variables
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

  //funcion para cambiar a la siguiente seccion
  function playNext(){
    console.log('PlayNext');
    //esconder la seccion anterior
    $section.hide();
    drawPath.pause();
    id++;

    if (id === totalSections)  {
      console.log('last section');
      id = 0;
      updateValues(id);

    } else {
      updateValues(id);
    }

    playAudio();
  };

   //funcion para preparar el path
  function pathPrepare ($p) {
    var lineLength = $p[0].getTotalLength();
    $p.css("stroke-dasharray", lineLength);
    $p.css("stroke-dashoffset", lineLength);
  }

  // función para hacer toggle a reproducir/pausar audio
  function playPauseAudio() {
    var playing = $botPlay.hasClass('playing') ? true : false;
    
    if (!playing) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  //función para reproducir la pista de audio
  function playAudio() {
    //console.log('audio play');
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

  //función para pausar la pista de audio
  function pauseAudio() {
    //console.log('audio pause');
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



 