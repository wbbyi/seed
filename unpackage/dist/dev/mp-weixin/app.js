"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/seedManager/seedManager.js";
  "./pages/home/home.js";
  "./pages/my/my.js";
  "./pages/login/login.js";
  "./pages/identify/identify.js";
  "./pages/phoneLogin/phoneLogin.js";
  "./pages/history/history.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:14", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:17", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:20", "App Hide");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
const UniIcons = () => "./node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const UniSwiperDot = () => "./uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const UniPopup = () => "./uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const uniTransition = () => "./uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const UniSearchBar = () => "./uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const UniDataTimePiker = () => "./uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.component("uni-icons", UniIcons);
  app.component("uni-swiper-dot", UniSwiperDot);
  app.component("uni-popup", UniPopup);
  app.component("uni-transition", uniTransition);
  app.component("lottie", common_vendor.Lottie);
  app.component("uni-search-bar", UniSearchBar);
  app.component("uni-datetime-picker", UniDataTimePiker);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
