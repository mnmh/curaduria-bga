(function ($, root, undefined) {

  var x = $("#audio")[0];
  var id = 1;
  var $section = $('#'+ id);

   /* ---------------------------------------------
  ENCONTRAR INTERVALO DE TIEMPO
  ------------------------------------------------*/
  var audioFrom = $section.attr("audio-from");
  var audioTo = $section.attr("audio-to");
  console.log ('audio desde:', audioFrom, ' hasta: ', audioTo);

  /* ---------------------------------------------
  ANIMATE SVG
  ------------------------------------------------*/
	function pathPrepare ($p) {
		var lineLength = $el[0].getTotalLength();
		$p.css("stroke-dasharray", lineLength);
		$p.css("stroke-dashoffset", lineLength);
  }
  
  var $path = section.find("path");
  pathPrepare($path);

  //var tl = gsap.timeline();
  var drawPath = gsap.to(
    $path, 
      { 
      duration: audioTo,
      strokeDashoffset: 0, 
      ease:Linear.easeNone,
      paused:true,
      onComplete:function(){ x.pause()}
  });
	
  /* ---------------------------------------------
  CONTROLES DE AUDIO
  ------------------------------------------------*/
  //$("#1").on("scroll", console.log('scroll'));
  $("#toggle-play").click(togglePlay);

  function togglePlay() { 
    if (x.currentTime === 0 || (x.paused && x.currentTime > 0 && !x.ended)){
      x.play();
      $("#audio").addClass('playing').removeClass('paused');
      drawPath.play();
      console.log('play');
      console.log('time:', x.currentTime);
    } else {
      x.pause();
      $("#audio").addClass('paused').removeClass('playing');
      drawPath.pause();
      console.log('pause');
      console.log('time:', x.currentTime);
    }
  }

  if($("#audio").hasClass('playing')) {
  console.log('currenttime: ', x.currentTime);
  };

})(jQuery, this);