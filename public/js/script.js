(function ($, root, undefined) {

  var audio = document.getElementById("audio");
  var $botPlay = $("#boton-audio");
  var $botNext = $("#boton-siguiente");
  var $botPrev = $("#boton-anterior");
  var totalSections = $( ".dibujo" ).length;
  var id = 0;
  var $section;
  var $path;
  var audioFrom;
  var audioTo;
  var drawPath; //Animacion del path
  var primeraVez = true;
  
  updateValues(id);
  $botPlay.click(playPauseAudio); //pausar reproducir audio
  $botNext.click(playNext); //pasar a siguiente pista
  $botPrev.click(playPrev); //pasar a siguiente pista


  //funcion para actualizar variables
  function updateValues(i) {

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
        onComplete:function(){playNext()}
    });
  
    $section.show(); //mostrar seccion actual
    
  }

  $(window).scroll(function() {
    if (primeraVez) {
      var promise = audio.play(); //revisar si el usuario ha interactuado con la página

      var top = $section.offset().top,
          height = $section.outerHeight(),
          wHeight = $(window).height(),
          wScroll= $(this).scrollTop();

      if (wScroll > (top+height-wHeight)){
          console.log('scroll en seccion');

          // revisa si puede hacer autoplay en al página
          if (promise !== undefined) {

            promise.then(_ => {

              playPauseAudio();

            }).catch(error => {

              console.log('autoplay was prevented');
              
            });
          }
          
          primeraVez = false;
      }
    }
 });

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
      playAudio();
    }

  };

  //funcion para cambiar a la seccion anterior
  function playPrev(){
    console.log('PlayPrev');

    //esconder la seccion anterior
    $section.hide();
    drawPath.pause();
    id--;

    if (id < 0)  {
      console.log('first section');
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



 