
var html = "<div><p>m</p></div>";
var $ = window.$ || window.Zepto;

var body;
var tip;
var timeout;
var time = 3000;
var transitionValue = "opacity .3s ease";
var styles = {
  zIndex: 888,
  position: "fixed",
  webkitTransition: transitionValue,
  transition: transitionValue,
  opacity: 0,
  color: "#fff",
  borderRadius: "4px",
  left: "50%",
  width: "80%",
  marginLeft: "-40%",
  fontSize: "14px",
  lineHeight: "1.3",
  textAlign: "center",
  background: "rgba(0,0,0,.6)",
  padding: "12px 14px",
  top: "280px",
  boxSizing: "border-box"
};

function Tip(str, time) {

  body = document.body;  

  if (tip) {
    clearTimeout(timeout);
    tip.find('p').html(str);
  } else {
      tip = $(html.replace("m", str))
        .css(styles)
        .appendTo(body);

      setTimeout(function() {
        tip.css({
          opacity: 1
        });
      }, 50);
  }
  timeout = clear(time);
}

function clear(time) {
  return setTimeout(remove, time);
}

function remove() {
  if (tip) {
    tip.remove();
    tip = null;
  }
}

function entry(msg, expire) {
  msg = msg || "";
  expire = expire || time;

  Tip(msg, expire);
};

if (typeof module != "undefined" && module.exports) {
  module.exports = entry;
} else {
  window.toast = entry;
}