require([
	"libs/zepto",
  "utils/query_data",
	"utils/utils",
  "libs/toast"
], function (
	$,
	query,
  utils,
  toast
) {
	var {
		info_id,
		protocal
	} = query
	var Mod = {
		init() {
			var htmlStr = $("div").html()
			console.log("init", info_id, protocal)
      var isWx = utils.isWexin(),
          $mainContent = $(".main-content"),
          $weixinContent = $(".weixin-content")
      if (isWx) {
        $mainContent.hide()
        $weixinContent.show()
      } else {
        $weixinContent.hide()
        $mainContent.show()
        Mod.appealApp()
        Mod.bindEvent()
      }
		},
		bindEvent() {
			$("#openNN").on("click", Mod.appealApp)
		},
    appealApp() {
    	console.log("appealApp")
      if (info_id == null) {
        console.log("info_id参数不能为空")
        toast("您访问的链接有误")
        return
      }

      var debugmode = `debugmode?info_id=${info_id}`
      nativeSchema.loadSchema({
        // 通过NN打开某个链接
        schema: debugmode,
        //schema头协议，实际情况填写
        protocal: protocal,
        //发起唤醒请求后，会等待loadWaiting时间，超时则跳转到failUrl，默认3000ms
        loadWaiting: "3000",
        //唤起失败时的跳转链接，默认跳转到下载页
        failUrl: "fail.html",
        // apk信息,请根据实际情况填写
        apkInfo: {
          PKG: "com.sensorsdata.analytics.android.demo",
          CATEGORY: "android.intent.category.DEFAULT",
          ACTION: "android.intent.action.VIEW"
        }
      })
    }

	}

	Mod.init()

})