// 封装zepto的ajax方法

// const uiLoading = require("modules/ui_loading")
const device = require("libs/device")
const toast = require("libs/toast")

var {
	CONFIG: {
		ENV,
		API
	}
} = window

const {
	isIOS,
	isAndroid
} = device

var {
	extend
} = $

var _ajax = $.ajax

// 真实api地址
// 在FIS中配置替换:
// 1. apitest
var baseURL = API

function onAjaxStart() {
	// uiLoading.start()
}

function onAjaxEnd() {
	// uiLoading.end()
}

function req(config) {
	var url = config.url
	var real_url = baseURL + url
	config.url = real_url
	config.timeout = "10000"
	config.dataType = "json"

	config.error = function(xhr, errorType, error) {
		if ("timeout" == errorType) {
			toast("请求超时，请稍后再试")
		}
	}

	if (ENV == "debug") {
		config.type = "get"
	}

	config.beforeSend = onAjaxStart
	config.complete = function(res) {
		onAjaxEnd()
	}

	_ajax.call($, config)
}

$.ajax = req

req.get = $.get
req.post = $.post

module.exports = req