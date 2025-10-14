"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_my_myMethods = require("./myMethods.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    let { toHistory, updateUserText } = pages_my_myMethods.methods();
    common_vendor.ref("");
    common_vendor.ref("");
    let userText = common_vendor.ref("个人简介:");
    common_vendor.index.setStorageSync("userText", userText);
    const contentChange = () => {
      updateUserText(userText.value);
    };
    const onHistory = () => {
      toHistory();
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(common_vendor.unref(userText)),
        c: common_vendor.o([($event) => common_vendor.isRef(userText) ? userText.value = $event.detail.value : userText = $event.detail.value, contentChange]),
        d: common_vendor.unref(userText),
        e: common_assets._imports_1,
        f: common_assets._imports_2,
        g: common_assets._imports_3,
        h: common_assets._imports_2,
        i: common_vendor.o(onHistory),
        j: common_assets._imports_4,
        k: common_assets._imports_2,
        l: common_assets._imports_5,
        m: common_assets._imports_2,
        n: common_assets._imports_6,
        o: common_assets._imports_2
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
