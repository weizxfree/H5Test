/**
 * 创建 style 标记
 * @param rules
 * @returns {*}
 */

var styles = [];

function createStyle( rules ) {
    var tag  = document.createElement( 'STYLE' );
    tag.type = 'text/css';
    if ( tag.styleSheet ) {
      tag.styleSheet.cssText = rules;
    } else {
      tag.innerHTML = rules;
    }
    return tag;
}

function addCSS(style) {
  if (!~styles.join("|").indexOf(style)) {
    styles.push(style);
    (document.head || document.body).appendChild(createStyle(style));
  }
}

module.exports = addCSS;

