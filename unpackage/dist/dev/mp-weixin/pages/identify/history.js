"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_historyApi = require("../../utils/historyApi.js");
const _sfc_main = {
  data() {
    return {
      historyList: []
    };
  },
  async onShow() {
    this.historyList = await utils_historyApi.getHistoryList();
  },
  methods: {
    viewDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/identify/result?data=" + encodeURIComponent(JSON.stringify(item.result)) + "&image=" + encodeURIComponent(item.image)
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.historyList.length === 0
  }, $data.historyList.length === 0 ? {} : {}, {
    b: common_vendor.f($data.historyList, (item, k0, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.result.name),
        c: common_vendor.t(item.time),
        d: item.id,
        e: common_vendor.o(($event) => $options.viewDetail(item), item.id)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/history.js.map
