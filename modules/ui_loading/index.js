
var NAME = "loading"

var html = __inline("./index.html")
var style = __inline("./index.less")
var $body = $("body")
var addCSS = require("libs/addcss")

function init() {
	addCSS(style)
	$body.append(html)
}

function start() {
	$body.addClass(NAME)
}

function end() {
	$body.removeClass(NAME)
}

init()

module.exports = {
	start,
	end
}

