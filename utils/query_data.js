const deparam = require("libs/deparam")
const query = deparam(location.search.substr(1)) || {}

module.exports = query