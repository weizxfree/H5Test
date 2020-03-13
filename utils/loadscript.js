
const loadScript = require("libs/loadscript")
const uiLoading = require("modules/ui_loading")

// loadScript时增加loading态
module.exports = (url, callback) => {
  uiLoading.start()
  loadScript(url, () => {
    uiLoading.end()
    callback()
  })
}