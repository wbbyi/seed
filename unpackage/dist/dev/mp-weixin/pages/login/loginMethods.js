"use strict";
const common_vendor = require("../../common/vendor.js");
function methods() {
  function login(isChecked, judge, url, method) {
    let check = [];
    if (!isChecked) {
      judge = true;
    }
    common_vendor.index.login({
      provider: "weixin",
      success: (res) => {
        common_vendor.index.__f__("log", "at pages/login/loginMethods.ts:10", "登录成功，code:", res.code);
        common_vendor.index.request({
          url,
          method,
          data: { code: res.code },
          success: (res2) => {
            common_vendor.index.getUserProfile({
              desc: "用于完善会员资料",
              success: (res3) => {
                common_vendor.index.__f__("log", "at pages/login/loginMethods.ts:21", "用户信息", res3.userInfo);
                common_vendor.index.setStorageSync("userInfo", res3.userInfo);
              },
              fail: (err) => {
                common_vendor.index.__f__("log", "at pages/login/loginMethods.ts:28", "用户拒绝授权", err);
              }
            });
            common_vendor.index.__f__("log", "at pages/login/loginMethods.ts:31", "后台返回：", res2.data);
            common_vendor.index.setStorageSync("userInfo", res2.data);
            common_vendor.index.showToast({ title: "登录成功", icon: "success" });
            common_vendor.index.switchTab({ url: "/pages/home/home" });
          },
          fail: (err2) => {
            common_vendor.index.__f__("log", "at pages/login/loginMethods.ts:41", "请求失败", err2);
          }
        });
      },
      fail: (err) => {
        common_vendor.index.__f__("log", "at pages/login/loginMethods.ts:46", "微信登录失败", err);
      }
    });
    check.push(isChecked, judge);
    return check;
  }
  function phoneLogin(isChecked, judge) {
    let check = [];
    if (!isChecked) {
      judge = true;
    } else {
      common_vendor.index.navigateTo({
        url: "/pages/phoneLogin/phoneLogin"
      });
    }
    check.push(isChecked, judge);
    return check;
  }
  return { login, phoneLogin };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/loginMethods.js.map
