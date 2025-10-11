"use strict";
const common_vendor = require("../common/vendor.js");
function chooseImage() {
  return new Promise((resolve, reject) => {
    common_vendor.index.chooseImage({
      count: 1,
      success: (res) => resolve(res.tempFilePaths[0]),
      fail: reject
    });
  });
}
function uploadToCloud(filePath) {
  return new Promise((resolve, reject) => {
    const cloudPath = Date.now() + "-" + Math.floor(Math.random() * 1e3) + ".jpg";
    common_vendor.tr.uploadFile({
      filePath,
      cloudPath,
      success: (res) => resolve(res.fileID),
      // 返回云文件ID
      fail: reject
    });
  });
}
exports.chooseImage = chooseImage;
exports.uploadToCloud = uploadToCloud;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/upload.js.map
