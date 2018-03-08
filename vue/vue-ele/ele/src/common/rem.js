(function (win,doc){
      if (!win.addEventListener) return;
      var html=document.documentElement;
      function setFont() {
          var w = html.clientWidth,
              h = html.clientHeight;
          html.style.fontSize= w/750*100+"px";
      }
      doc.addEventListener('DOMContentLoaded',setFont,false);
      win.addEventListener('resize',setFont,false);
      win.addEventListener('load',setFont,false);
  })(window,document);