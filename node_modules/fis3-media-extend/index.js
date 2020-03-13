module.exports = function(fis) {
	fis.extendMedia = function(src, dest) {
	  var config = fis.media(src);

	  fis.media(dest)._matches = fis.media(dest)._matches.concat(config._matches);
	};
}