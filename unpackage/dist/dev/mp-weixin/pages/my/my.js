"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_my_myMethods = require("./myMethods.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    let { toHistory } = pages_my_myMethods.methods();
    common_vendor.ref("");
    common_vendor.ref("");
    const onHistory = () => {
      toHistory();
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_assets._imports_2,
        d: common_assets._imports_3,
        e: common_assets._imports_2,
        f: common_vendor.o(onHistory),
        g: common_assets._imports_4,
        h: common_assets._imports_2,
        i: common_assets._imports_5,
        j: common_assets._imports_2,
        k: common_assets._imports_6,
        l: common_assets._imports_2
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
