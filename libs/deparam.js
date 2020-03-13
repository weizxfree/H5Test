module.exports = function (url) {
  var qs = url.split('&');
  var obj = {};
  qs.forEach (function (value) {
    var param = value.split('=');
    var v = (typeof param[1]).localeCompare('undefined') === 0 ? '' : param[1];
    obj[param[0]] = window.decodeURIComponent(v);
  });
  return obj;
}