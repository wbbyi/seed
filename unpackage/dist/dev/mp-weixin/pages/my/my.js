"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    common_vendor.ref("这个人很懒什么也没说");
    common_vendor.onShow(() => {
      var _a, _b;
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      (_b = (_a = page.getTabBar) == null ? void 0 : _a.call(page)) == null ? void 0 : _b.setData({ selected: 1 });
    });
    const showPopup = common_vendor.ref(false);
    const openPopup = () => {
      showPopup.value = true;
    };
    const closePopup = () => {
      showPopup.value = false;
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      currentPage.openPopup = openPopup;
    });
    common_vendor.onUnmounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      delete currentPage.openPopup;
    });
    common_vendor.onShow(() => {
      const tabBar = getApp().$tabbar;
      if (tabBar) {
        tabBar.setData({
          selected: 1
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "昵称",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        b: common_assets._imports_0$1,
        c: common_assets._imports_1,
        d: common_assets._imports_2,
        e: common_assets._imports_1,
        f: showPopup.value
      }, showPopup.value ? {
        g: common_vendor.o(closePopup)
      } : {}, {
        h: showPopup.value
      }, showPopup.value ? {
        i: common_assets._imports_3,
        j: common_assets._imports_4
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
