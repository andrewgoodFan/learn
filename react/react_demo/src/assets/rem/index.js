(function (win, doc) {
    if (!win.addEventListener) return;
    var html = document.documentElement;
    function setFont() {
      var cliWidth = html.clientWidth;
      html.style.fontSize = 100 * (cliWidth / 750) + 'px';
    }
    win.addEventListener('resize', setFont, false);
    setFont();
})(window, document)