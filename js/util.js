$(document).ready(function() {
    $(".modal-trigger").live("click", function() {
    var target = $(this).attr("href");
        $(target).modal({close:false});
    });
});
