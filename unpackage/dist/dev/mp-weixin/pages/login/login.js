"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_login_loginMethods = require("./loginMethods.js");
const url_url = require("../../url/url.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    let { login, phoneLogin } = pages_login_loginMethods.methods();
    const isChecked = common_vendor.ref(false);
    const judge = common_vendor.ref(false);
    let check = [];
    let method = "post";
    const toggleCheck = () => {
      isChecked.value = !isChecked.value;
    };
    const onLogin = () => {
      check = login(isChecked.value, judge.value, url_url.baseUrl, method);
      isChecked.value = check[0];
      judge.value = check[1];
    };
    const onPhoneLogin = () => {
      let check2 = phoneLogin(isChecked.value, judge.value);
      isChecked.value = check2[0];
      judge.value = check2[1];
    };
    common_vendor.index.__f__("log", "at pages/login/login.vue:52", judge.value);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => onLogin()),
        c: common_vendor.o(onPhoneLogin),
        d: isChecked.value ? 1 : "",
        e: judge.value
      }, judge.value ? {} : {}, {
        f: common_vendor.o(toggleCheck)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
