(function ($, root, undefined) {

  //var a = document.getElementsByClassName("ensayo")[0]; //selecciona el tag objeto
  //var length = a.getTotalLength();
  //console.log("length", length);

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

  var tl = gsap.timeline();
  tl.to($path, {duration: 5, strokeDashoffset: 0, ease:Linear.easeNone });


	
  /* ---------------------------------------------
  CONTROLES DE AUDIO
  ------------------------------------------------*/
  //$("#1").on("scroll", console.log('scroll'));
  $("#toggle-play").click(togglePlay);

  var x = $("#audio")[0]; 

  function togglePlay() { 
    if (x.currentTime === 0 || (x.paused && x.currentTime > 0 && !x.ended)){
      x.play();
      $("#audio").addClass('playing').removeClass('paused');
      console.log('play');
    } else {
      x.pause();
      $("#audio").addClass('paused').removeClass('playing');
      console.log('pause');
    }
  }

  if($("#audio").hasClass('playing')) {
  console.log('currenttime: ', x.currentTime);
  };


})(jQuery, this);