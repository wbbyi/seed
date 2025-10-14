"use strict";
const common_vendor = require("../../common/vendor.js");
function methods() {
  function toHistory() {
    common_vendor.index.navigateTo({
      url: "/pages/history/history"
    });
  }
  function toSeedManager() {
    common_vendor.index.navigateTo({
      url: "/pages/history/history"
    });
  }
  function updateUserText(userText) {
    common_vendor.index.setStorageSync("userText", userText);
  }
  return { toHistory, toSeedManager, updateUserText };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/myMethods.js.map
