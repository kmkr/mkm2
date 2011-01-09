$(function() {
$.easing.bouncy = function (x, t, b, c, d) {
    var s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}

// create custom tooltip effect for jQuery Tooltip
$.tools.tooltip.addEffect("bouncy",

  // opening animation
  function(done) {
    this.getTip().animate({top: '-=10'}, 500, 'bouncy', done).show();
  },

  // closing animation
  function(done) {
    this.getTip().animate({top: '-=10'}, 50, 'bouncy', function()  {
      $(this).hide('fade');
      done.call();
    });
  }
);
  $("#tools a[title]").tooltip({effect: 'bouncy'});
});
