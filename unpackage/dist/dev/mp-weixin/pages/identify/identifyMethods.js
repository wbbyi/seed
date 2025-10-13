"use strict";
const common_vendor = require("../../common/vendor.js");
function methods() {
  function comeBack() {
    common_vendor.index.switchTab({
      url: "/pages/home/home"
    });
  }
  const logRawData = (data) => {
    common_vendor.index.__f__("log", "at pages/identify/identifyMethods.ts:9", "原始检测数据:", data);
    try {
      common_vendor.index.setStorageSync("lastRawDetectionData", data);
    } catch (e) {
      common_vendor.index.__f__("error", "at pages/identify/identifyMethods.ts:14", "存储原始数据失败:", e);
    }
  };
  return { comeBack, logRawData };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/identifyMethods.js.map
