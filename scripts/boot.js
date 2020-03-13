__inline("./mod.js")
__inline("./betty.js")
__inline("../var_config.js")
var SA = Betty({
	uri: __uri("./sa.js"),
	key: "h5/sa.js",
	noCache: CONFIG.ENV == "debug",
	xDomain: true
})
