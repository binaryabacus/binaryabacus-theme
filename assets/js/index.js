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
});
