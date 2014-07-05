$(function domready () {
  $('iframe').attr({
    marginWidth: 0,
    marginHeight: 0,
    scrolling: 'no'
  });

  // Defer loading of iframe or else margin won't be applied
  $('iframe').each(function () {
    $(this).attr('src', $(this).data('src'));
  });

  $('[data-fn]').each(function () {
    var id = $(this).attr('data-target');
    var fn = $(this).attr('data-fn');
    $(this).click(function () {
      window.rpc(id, fn);
    });
  });

  window.rpc = function (id, fn) {
    $('iframe#' + id).get(0).contentWindow.postMessage(fn, '*');
  };
});
