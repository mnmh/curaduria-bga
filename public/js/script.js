(function ($, root, undefined) {

  var audio = document.getElementById("audio"); //toma el elemento de audio
  var $botPlay = $("#boton-audio"); //botón de play del reproductor
  var $botNext = $("#boton-siguiente"); //botón de siguiente
  var $botPrev = $("#boton-anterior"); //botón de anterior

  var totalSections = $( ".dibujo" ).length; //lee el número de secciones
  var id = 0; //empieza en la sección 0

  var $section; 
  var $path;
  var audioFrom; //segundo donde empieza el audio
  var audioTo; //segundo donde termina el audio

  var drawPath; //Animacion del path
  
  var primeraVez = true;
  

  updateValues(id);
  $botPlay.click(playPauseAudio); //pausar reproducir audio
  $botNext.click(playNext); //pasar a siguiente pista
  $botPrev.click(playPrev); //pasar a siguiente pista


  //funcion para actualizar variables 
  //de la sección corespondiente
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
    //revisar si el usuario ha interactuado con la página
    if (primeraVez) {
      var promise = audio.play(); 

      var top = $section.offset().top,
          height = $section.outerHeight(),
          wHeight = $(window).height(),
          wScroll= $(this).scrollTop();

        //si el usuario esta dentro del div de reproducción:
      if (wScroll > (top+height-wHeight)){ 

          // revisa si puede hacer autoplay en al página
          if (promise !== undefined) {

            promise.then(_ => {

              playPauseAudio();

            }).catch(error => {

              //no se puede reproducir el audio
              
            });
          }
          
          //solo realizar esta función la primera vez que se hace scroll
          primeraVez = false;
      }
    }
 });

  //funcion para cambiar a la siguiente seccion

  function playNext(){
    
    //esconder la seccion anterior
    $section.hide();
    drawPath.pause();
    id++;

    if (id === totalSections)  {
      //console.log('last section');
      id = 0;
      updateValues(id);
      playAudio();

    } else {
      updateValues(id);
      playAudio();
    }

  };

  //funcion para cambiar a la seccion anterior
  function playPrev(){

    //esconder la seccion anterior
    $section.hide();
    drawPath.pause();
    id--;

    if (id < 0)  {
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



 