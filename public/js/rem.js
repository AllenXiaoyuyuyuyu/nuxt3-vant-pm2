
  ; (function (doc, win) {
    var docEl = win.document.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var refreshRem = function () {
      var clientWidth = win.innerWidth
        || doc.documentElement.clientWidth
        || doc.body.clientWidth;

      // console.log(clientWidth)
      if (!clientWidth) return;
      var fz;
      var width = clientWidth;
      fz = 16 * width / 375;  // 可以根据项目需要，自行修改
      docEl.style.fontSize = fz + 'px';  //这样每一份也是16px,即1rem=16px
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refreshRem, false);
    doc.addEventListener('DOMContentLoaded', refreshRem, false);
    refreshRem();

  })(document, window);
