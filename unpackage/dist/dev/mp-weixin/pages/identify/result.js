"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      result: {},
      image: ""
    };
  },
  onLoad(options) {
    if (options.data) {
      this.result = JSON.parse(decodeURIComponent(options.data));
    }
    if (options.image) {
      this.image = decodeURIComponent(options.image);
    }
  },
  methods: {
    handleBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.result.image
  }, $data.result.image ? {
    b: $data.result.image
  } : {}, {
    c: $data.result.name
  }, $data.result.name ? {
    d: common_vendor.t($data.result.name)
  } : {}, {
    e: $data.result.probability
  }, $data.result.probability ? {
    f: common_vendor.t(($data.result.probability * 100).toFixed(2))
  } : {}, {
    g: $data.result.description
  }, $data.result.description ? {
    h: common_vendor.t($data.result.description)
  } : {}, {
    i: common_vendor.o((...args) => $options.handleBack && $options.handleBack(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/result.js.map
