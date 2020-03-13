var ip = require("ip")
var opn = require("opn")

module.exports = function(port) {
	opn("http://" + ip.address() + ":" + port)
}