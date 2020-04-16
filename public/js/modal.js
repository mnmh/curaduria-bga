(function ($, root, undefined) {
    //console.log('modal ready');

    $('.galeria a').on('click', function() {

        $('.modal-content').html($(this).html());
        
        $(this).addClass("clicked");
        
        $('.modal').fadeIn(300);

        return false;
    })

    $('.modal-close, .modal-background').on('click', function() {
        
        $('.modal').fadeOut(300);

        return false;
    })


})(jQuery, this);