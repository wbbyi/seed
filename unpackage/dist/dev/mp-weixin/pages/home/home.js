"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_home_homeClass = require("./homeClass.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_swiper_dot2 + _easycom_uni_card2)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_card)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const current = common_vendor.ref(0);
    const info = common_vendor.ref([
      {
        content: "页面1"
      },
      {
        content: "页面2"
      },
      {
        content: "页面3"
      }
    ]);
    let seedList = common_vendor.ref([]);
    const date = /* @__PURE__ */ new Date();
    const seed1 = new pages_home_homeClass.CardMessage("/static/history.png", "1", "1", date);
    seedList.value.push(seed1);
    const dotsStyles = {
      backgroundColor: "rgba(0, 0, 0, .3)",
      border: "1px rgba(0, 0, 0, .3) solid",
      color: "#fff",
      selectedBackgroundColor: "rgba(0, 0, 0, .9)",
      selectedBorder: "1px rgba(0, 0, 0, .9) solid"
    };
    const onSwiperChange = (e) => {
      current.value = e.detail.current;
    };
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
          selected: 0
        });
      }
    });
    let imageStyles = {
      width: 50,
      height: 50
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(info.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: index
          };
        }),
        b: current.value,
        c: common_vendor.o(onSwiperChange),
        d: common_vendor.p({
          info: info.value,
          current: current.value,
          mode: "round",
          ["dots-styles"]: dotsStyles
        }),
        e: common_vendor.unref(seedList).length === 0
      }, common_vendor.unref(seedList).length === 0 ? {
        f: common_assets._imports_0
      } : {
        g: common_vendor.f(common_vendor.unref(seedList), (i, k0, i0) => {
          return {
            a: common_vendor.t(i.text),
            b: "07e72d3c-1-" + i0,
            c: common_vendor.p({
              title: i.name,
              ["sub-title"]: i.time,
              thumbnail: i.photo
            }),
            d: i
          };
        })
      }, {
        h: showPopup.value
      }, showPopup.value ? {
        i: common_vendor.o(closePopup)
      } : {}, {
        j: showPopup.value
      }, showPopup.value ? {
        k: common_assets._imports_3,
        l: common_vendor.unref(imageStyles),
        m: common_assets._imports_4,
        n: common_vendor.unref(imageStyles)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
