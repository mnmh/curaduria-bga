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
    15, 
      { 
      strokeDashoffset: 0, 
      ease:Linear.easeNone,
      paused:true
      /*onStart:function(){x.play()},
      Complete:function(){x.pause()}*/

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
    } else {
      x.pause();
      $("#audio").addClass('paused').removeClass('playing');
      drawPath.pause();
      console.log('pause');
    }
  }

  if($("#audio").hasClass('playing')) {
  console.log('currenttime: ', x.currentTime);
  };


})(jQuery, this);