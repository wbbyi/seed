"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_historyApi = require("../../utils/historyApi.js");
const _sfc_main = {
  data() {
    return {
      historyApi: null,
      historyList: [],
      loading: false,
      hasMore: true
    };
  },
  async onLoad() {
    this.historyApi = new utils_historyApi.HistoryApi(10);
    await this.loadData(true);
  },
  onShow() {
    this.loadData(true);
  },
  onReachBottom() {
    this.loadData();
  },
  methods: {
    async loadData(reset = false) {
      this.loading = true;
      const list = await this.historyApi.getList(reset);
      if (reset) {
        this.historyList = list;
      } else {
        this.historyList = [...this.historyList, ...list];
      }
      this.hasMore = this.historyApi.hasMore;
      this.loading = false;
    },
    viewDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/identify/result?id=" + item._id
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.historyList.length === 0 && !$data.loading
  }, $data.historyList.length === 0 && !$data.loading ? {} : {}, {
    b: common_vendor.f($data.historyList, (item, k0, i0) => {
      return {
        a: item.image.url,
        b: common_vendor.t(item.resultName),
        c: common_vendor.t(item.name),
        d: item._id,
        e: common_vendor.o(($event) => $options.viewDetail(item), item._id)
      };
    }),
    c: common_vendor.p({
      status: $data.loading ? "loading" : $data.hasMore ? "more" : "noMore"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/history.js.map
