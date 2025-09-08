"use strict";
const common_vendor = require("../common/vendor.js");
function chooseAndUpload() {
  return new Promise((resolve, reject) => {
    common_vendor.index.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        resolve(tempFilePaths[0]);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.chooseAndUpload = chooseAndUpload;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/upload.js.map
