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
    connectType,
    feature_code,
    protocal,
    project
  } = query
  var Mod = {
    init() {
      var htmlStr = $("div").html()
      console.log("init", feature_code, protocal)
      var isWx = utils.isWexin(),
          $mainContent = $(".main-content"),
          $weixinContent = $(".weixin-content")
      if (isWx) {
        $mainContent.hide()
        $weixinContent.show()
      } else {
        $weixinContent.hide()
        $mainContent.show()
        Mod.scanned(feature_code)
        Mod.bindEvent()
      }
    },
    bindEvent() {
      $("#openNN").on("click", Mod.appealApp)
    },
    scanned(featureCode) {
      var origin = location.origin
      $.ajax({
        type: 'POST',
        url: `${origin}/api/heat_map/scanning?project=${project}`,
        ContentType: "json",
        headers: {'Content-Type': 'application/json'},
        data: featureCode,
        success: function(res) {
          if (res.error) {
            toast(res.error)
          } else {
            Mod.appealApp()
          }
          console.log(res)
        }
      })
    },
    appealApp() {

      feature_code = "sab498952b";
      connectType = "visualized";
      if (feature_code == null) {
        console.log("feature_code参数不能为空")
        toast("您访问的链接有误")
        return
      }
      if (!connectType) {
        connectType = 'heatmap'
      }
      var origin = location.origin,
          url = `${origin}/api/heat_map/upload?project=${project}`,
          heatmap = `${connectType}?feature_code=${feature_code}&url=${encodeURIComponent(url)}`
      nativeSchema.loadSchema({
        // 通过NN打开某个链接
        schema: heatmap,
        //schema头协议，实际情况填写
        protocal: protocal,
        //发起唤醒请求后，会等待loadWaiting时间，超时则跳转到failUrl，默认3000ms
        loadWaiting: "20000",
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