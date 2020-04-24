(function ($, root, undefined) {
    //console.log('modal ready');

    $('.galeria a').on('click', function() {

        $('.modal-content').html($(this).html());
        
        $(this).addClass("clicked");
        
        $('.modal').fadeIn(300);

        return false;
    })

    $('.modal-close, .modal-background, .modal-content').on('click', function() {
        
        $('.modal').fadeOut(300);

        return false;
    })

    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        if (this.hash !== "") {
    
            event.preventDefault();
    
            var hash = this.hash;
    
            $('html, body').animate({
            scrollTop: $(hash).offset().top
            }, 800, function(){
                });
            
             window.location.hash = hash;
        }
    });

})(jQuery, this);
