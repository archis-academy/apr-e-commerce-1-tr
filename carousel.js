$(".carousel").carousel({
  interval: 5000,
});

$(document).ready(function() {
  $('.carousel-indicators span').click(function() {
    var index = $(this).data('index');
    $('#carouselExampleIndicators').carousel(index);
  });
});
