(function ($, root, undefined) {
    console.log('modal ready');

    $('.galeria a').on('click', function() {
        
        $('.modal').fadeIn(200);

        return false;
    })

    $('.modal-close, .modal-background').on('click', function() {
        
        $('.modal').hide();

        return false;
    })


})(jQuery, this);