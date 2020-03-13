/*
 * 去除字符串两边空格
 */
function trim(str) {
  return `${str}`.replace(/(^\s*)|(\s*$)/g, "");
}

function isWexin() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  trim,
  isWexin
}
