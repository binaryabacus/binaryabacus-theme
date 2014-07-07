$(function domready () {

  mixpanel.track('page viewed', {
    'page name' : document.title,
    'url' : window.location.pathname
  });

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
      mixpanel.track('visualization interacted', {
        'button-name' : cleanLeadingTraingSpace($(this).text()),
        'post-id' : $(this).parents('article').find('.post-title').text()
      });
    });
  });

  window.rpc = function (id, fn) {
    $('iframe#' + id).get(0).contentWindow.postMessage(fn, '*');
  };
});

function cleanLeadingTraingSpace (str) {
  return (str || '').replace(/^\s*/, '').replace(/\s*$/, '');
}
