"use strict";
const common_vendor = require("../../common/vendor.js");
function methods() {
  function chooseImage(type, num) {
    const types = ["camera", "album"];
    return new Promise((resolve, reject) => {
      common_vendor.index.chooseImage({
        count: num,
        sourceType: [types[type]],
        success: (res) => resolve(res.tempFilePaths),
        fail: (err) => reject(err)
      });
    });
  }
  return { chooseImage };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/homeMethods.js.map
