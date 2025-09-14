"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "phoneLogin",
  setup(__props) {
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const countdown = common_vendor.ref(0);
    let timer = null;
    const getCode = () => {
      if (!/^1\d{10}$/.test(phone.value)) {
        common_vendor.index.showToast({ title: "请输入正确手机号", icon: "none" });
        return;
      }
      common_vendor.index.request({
        url: "https://你的后台地址/sendCode",
        method: "POST",
        data: { phone: phone.value },
        success: (res) => {
          common_vendor.index.showToast({ title: "验证码已发送", icon: "success" });
          startCountdown();
        }
      });
    };
    const startCountdown = () => {
      countdown.value = 60;
      timer = setInterval(() => {
        countdown.value -= 1;
        if (countdown.value <= 0)
          clearInterval(timer);
      }, 1e3);
    };
    const login = () => {
      if (!/^1\d{10}$/.test(phone.value)) {
        common_vendor.index.showToast({ title: "请输入正确手机号", icon: "none" });
        return;
      }
      if (!code.value) {
        common_vendor.index.showToast({ title: "请输入验证码", icon: "none" });
        return;
      }
      common_vendor.index.request({
        url: "https://你的后台地址/loginByPhone",
        method: "POST",
        data: {
          phone: phone.value,
          code: code.value
        },
        success: (res) => {
          const data = res.data;
          if (data.success) {
            common_vendor.index.showToast({ title: "登录成功", icon: "success" });
            common_vendor.index.setStorageSync("token", data.token);
            common_vendor.index.switchTab({ url: "/pages/index/index" });
          } else {
            common_vendor.index.showToast({ title: data.message || "登录失败", icon: "none" });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: phone.value,
        b: common_vendor.o(($event) => phone.value = $event.detail.value),
        c: code.value,
        d: common_vendor.o(($event) => code.value = $event.detail.value),
        e: common_vendor.t(countdown.value > 0 ? countdown.value + "s" : "获取验证码"),
        f: countdown.value > 0,
        g: common_vendor.o(getCode),
        h: common_vendor.o(login)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d909cbb8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/phoneLogin/phoneLogin.js.map
