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
  return { toHistory, toSeedManager };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/myMethods.js.map
