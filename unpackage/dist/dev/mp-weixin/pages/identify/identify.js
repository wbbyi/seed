"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_identify_identifyMethods = require("./identifyMethods.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "identify",
  setup(__props) {
    let { comeBack } = pages_identify_identifyMethods.methods();
    let seedMessage = common_vendor.ref();
    const onBack = () => {
      comeBack();
    };
    common_vendor.onLoad((options) => {
      if (options.data) {
        seedMessage.value = JSON.parse(decodeURIComponent(options.data));
      }
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return {
        a: _ctx.imageSrc || "/static/紫罗兰.jpg",
        b: common_assets._imports_0,
        c: common_vendor.t((_a = common_vendor.unref(seedMessage)) == null ? void 0 : _a.resultName),
        d: common_vendor.t((_b = common_vendor.unref(seedMessage)) == null ? void 0 : _b.englishName),
        e: common_vendor.t((_c = common_vendor.unref(seedMessage)) == null ? void 0 : _c.seedClass),
        f: common_assets._imports_1$1,
        g: common_vendor.t((_d = common_vendor.unref(seedMessage)) == null ? void 0 : _d.otherName),
        h: common_assets._imports_2$1,
        i: common_vendor.t((_e = common_vendor.unref(seedMessage)) == null ? void 0 : _e.resultDes),
        j: common_assets._imports_3$1,
        k: common_assets._imports_4$1,
        l: common_vendor.o(onBack)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a33b9c31"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/identify.js.map
