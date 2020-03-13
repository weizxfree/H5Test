((sa) => {
  // 如果有 Basket 设置 ，注入进去存储
  // 没有就直接执行
  if (SA) {
    SA.store(sa)
  } else {
    sa()
  }

})(() => {

  __inline("../libs/zepto.js")
  __inline("../libs/fastclick.js")
  __inline("../libs/deparam.js")
  __inline("../libs/template.js")
  __inline("../libs/toast.js")
  __inline("../libs/istype.js")
  __inline("../libs/touch.js")
  __inline("../utils/ajax.js")
  __inline("../utils/query_data.js")
  __inline("../utils/utils.js")

  require([
    "libs/zepto",
    "libs/deparam",
    "libs/fastclick",
    "utils/query_data"
  ], (
    $,
    deparam,
    fastClick,
    query
  ) => {
    // 激活CSS的:active
    $("body").on("touchend", () => {})
    fastClick(document.body)

  })

})
