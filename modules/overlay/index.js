const addCSS = require("libs/addcss")

module.exports = function(WIN, DOC) {
  var css = __inline("./index.less")
  addCSS(css);
  var $, CLICK, Fancy, elBody, elHtml, entry, getMax, inWalletFancyCls, isHasMask;
  $ = window.$ || window.Zepto;
  elBody = $("body");
  elHtml = $("html");
  CLICK = "click";
  inWalletFancyCls = "in-m-fancy";
  isHasMask = false;
  getMax = function(arr) {
    var _arr;
    if (arr == null) {
      arr = [];
    }
    _arr = arr.sort(function(a, b) {
      return b - a;
    });
    return _arr[0];
  };

  Fancy = (function() {
    var easeHide, easeShow, elMask, fancyStyles, htmlContent, htmlMask, mask, maskStyles, publicStyles, transitionValue;

    htmlMask = "<div class='m-mask'></div>";

    htmlContent = [
      "<div class='m-fancy'>",
        "{title}",
        "{content}",
        "{btns}",
        "<em class=x-fancy>close</em>",
      "</div>"
    ];

    easeShow = function(el, time) {
      if (time == null) {
        time = 50;
      }
      el.show();
      return setTimeout(function() {
        return el.css("opacity", 1);
      }, time);
    };

    easeHide = function(el, time) {
      if (time == null) {
        time = 50;
      }
      el.css("opacity", 0);
      return setTimeout(function() {
        return el.hide();
      }, time);
    };

    elMask = null;

    mask = {
      init: function(config) {
        elMask = $(htmlMask);
        return elMask.appendTo(elBody);
      },
      show: function(time) {
        if (time == null) {
          time = 50;
        }
        return easeShow(elMask, time);
      },
      hide: function(time) {
        if (time == null) {
          time = 50;
        }
        return easeHide(elMask, time);
      }
    };

    function noop() {}

    function Fancy(config) {
      this.config = config != null ? config : {};
      this.content = this.config.content || "";
      this.name = this.config.name || "";
      this.title = this.config.title || "";
      this.btns = this.config.btns || this.config.buttons || [];
      this.time = this.config.time || 50;
      this.elFancy = null;
      this.width = config.width;
    }

    Fancy.prototype.init = function() {
      var config, elClose, elFancy, title;
      config = this.config;
      if (!isHasMask) {
        mask.init(config);
      }
      isHasMask = true;

      var that = this;
      var html = function() {
        var s = htmlContent.join("");
        var title = "";
        var btns = "";
        var btnLength = that.btns.length;
        if (that.title) {
          title = "<h3>" + that.title + "</h3>"
        }

        if (btnLength) {
          if (btnLength == 1) {
            btns = "<div class=m-btn-row><b class='m-btn m-left-btn m-btn-full'>" + that.btns[0] + "</b></div>";
          } else {
            btns = [
              "<div class=m-btn-row>",
              "<b class='m-btn m-left-btn m-btn-half'>" + that.btns[0] + "</b>",
              "<b class='m-btn m-right-btn m-btn-half'>" + that.btns[1] + "</b>",
              "</div>"
            ].join("");
          }
        }

        return s
          .replace("{title}", title)
          .replace("{content}", 
            that.content.indexOf('<') == 0 
              ? that.content 
              : ('<p>' + that.content+ '</p>'))
          .replace("{btns}", btns);
      }();

      this.elFancy = elFancy = $(html);

      if (config.noX) {
        elFancy.addClass("no-x");
      }
      
      if (this.name) {
        elFancy.attr("name", this.name);
        elFancy.addClass("name-" + this.name);
      }
      if (!this.config.onlyMask) {
        elFancy.appendTo(elBody);
      }

      this.elClose = $("em", elFancy);
      this.leftBtn = $(".m-left-btn", elFancy);
      this.rightBtn = $(".m-right-btn", elFancy);

      bindEvent();

      function bindEvent() {
        that.elClose.click(function() {
          that.hide();
          (that.config.fns[2] || noop).call(that);
        });
        that.leftBtn.click(function() {
          (that.config.fns[0] || noop).call(that);
        });

        that.rightBtn.click(function() {
          (that.config.fns[1] || noop).call(that);
        });

      }

      return this;
    };

    Fancy.prototype.show = function() {
      var elFancy;
      var height = getMax([window.innerHeight, elHtml[0].offsetHeight, elBody[0].offsetHeight]);
      elMask[0].style.height = height + "px";
      elFancy = this.elFancy;
      mask.show(this.time);
      easeShow(elFancy, this.time);
      elHtml.addClass(inWalletFancyCls);
      window.screenTop = 0;
      return this;
    };

    Fancy.prototype.hide = function() {
      var elFancy;
      elFancy = this.elFancy;
      mask.hide(this.time);
      easeHide(elFancy);
      elHtml.removeClass(inWalletFancyCls);
      return this;
    };

    Fancy.prototype.remove = function() {
      this.hide().elFancy.remove();

    }

    return Fancy;

  })();
  entry = function(config) {
    config.noX = true;
    return (new Fancy(config)).init().show();
  };
  entry.mask = function() {
    return (new Fancy({
      onlyMask: true
    })).init().show();
  };

  entry.confirm = function(config) {

    var QueryData = window.QueryData || {}
    var lang = QueryData.lang || "zh"
    
    config.noX = true;
    config.btns = [lang == "zh" ? "确定" : "OK"];
    config.fns = [function() {
      this.remove();
      config.fn && config.fn();
    }];
    return entry(config);
  };
  
  return entry;
  
}(window, document);