"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_seedManager_seedManagerMethods = require("./seedManagerMethods.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "seedManager",
  setup(__props) {
    let { search } = pages_seedManager_seedManagerMethods.methods();
    const onConfirm = (res) => {
      search(res);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onConfirm)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/seedManager/seedManager.js.map
