"use strict";
const common_vendor = require("../../common/vendor.js");
function methods() {
  function chooseImage(type, num) {
    const types = ["camera", "album"];
    let imageSrc = [];
    if (type === 0) {
      common_vendor.index.chooseImage({
        count: num,
        sourceType: [types[type]],
        success: (res) => {
          imageSrc[0] = res.tempFilePaths[0];
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/home/homeMethods.ts:13", "选择图片失败", err);
        }
      });
    } else {
      common_vendor.index.chooseImage({
        count: num,
        sourceType: [types[type]],
        success: (res) => {
          imageSrc = res.tempFilePaths;
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/home/homeMethods.ts:25", "选择图片失败", err);
        }
      });
    }
    return imageSrc;
  }
  return { chooseImage };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/homeMethods.js.map
