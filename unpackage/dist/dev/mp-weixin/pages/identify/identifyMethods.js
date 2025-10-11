"use strict";
const common_vendor = require("../../common/vendor.js");
function methods() {
  function comeBack() {
    common_vendor.index.switchTab({
      url: "/pages/home/home"
    });
  }
  return { comeBack };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/identifyMethods.js.map
