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

  $('.vis').on('mouseover', _.throttle(function () {
    mixpanel.track('visualization mouseover', {
      'post-id' : $(this).parents('article').find('.post-title').text()
    });
  }, 1000));

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

  function reloadIframes () {
    $('[data-reload-on-resize]').each(function () {
      var $iframe = $(this);
      var minWidth = $iframe.data('min-width');
      if (minWidth && window.innerWidth <= minWidth) {
        return;
      }
      $iframe.show();
      var src = $iframe.data('src');
      $iframe.attr('src', '');
      setTimeout(function () {
        $iframe.attr('src', src);
      }, 1);
    });
  }

  function setPopupIframes () {
    $('[data-min-width]').each(function () {
      var $iframe = $(this);
      var minWidth = $iframe.data('min-width');
      if (minWidth && window.innerWidth <= minWidth) {
        $iframe.parent().addClass('popup');
        $iframe.attr('src', '');
        $iframe.css('background-image', 'url(' + $iframe.data('placeholder-image') + ')');
      } else {
        $iframe.parent().removeClass('popup');
        $iframe.css('background-image', '');
      }
    });
  }

  $('article').on('click', '.vis.popup', function () {
    var src = $(this).find('iframe').data('src');
    window.open(src);
  });

  setPopupIframes();

  $(window).resize(_.debounce(function () {
    reloadIframes();
    setPopupIframes();
  }, 1000));

  window.rpc = function (id, fn) {
    $('iframe#' + id).get(0).contentWindow.postMessage(fn, '*');
  };
});

function cleanLeadingTraingSpace (str) {
  return (str || '').replace(/^\s*/, '').replace(/\s*$/, '');
}
