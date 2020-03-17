(function ($, root, undefined) {

  var x = $("#audio")[0]; 

  /* ---------------------------------------------
  ANIMATE SVG
  ------------------------------------------------*/
	function pathPrepare ($el) {
		var lineLength = $el[0].getTotalLength();
		$el.css("stroke-dasharray", lineLength);
		$el.css("stroke-dashoffset", lineLength);
  }
  
  var $path = $("path#path");
  pathPrepare($path);

  //var tl = gsap.timeline();
  var drawPath = gsap.to(
    $path, 
    30.3, 
      { 
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