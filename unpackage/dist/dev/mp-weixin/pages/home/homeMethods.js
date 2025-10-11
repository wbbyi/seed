"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_upload = require("../../utils/upload.js");
const utils_db = require("../../utils/db.js");
function useHomeMethods() {
  async function uploadAndSaveImage(setState) {
    try {
      const imagePath = await utils_upload.chooseImage();
      const cloudUrl = await utils_upload.uploadToCloud(imagePath);
      const now = /* @__PURE__ */ new Date();
      const name = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const res = await utils_db.addData("seedHistory", {
        image: cloudUrl,
        name,
        createTime: now
      });
      setState({
        imagePath,
        cloudUrl,
        recordId: res.id || res._id
      });
    } catch (err) {
      if (err && err.errMsg && err.errMsg.indexOf("cancel") === -1) {
        common_vendor.index.showToast({ title: "图片上传失败", icon: "none" });
      }
      common_vendor.index.__f__("error", "at pages/home/homeMethods.ts:28", err);
    }
  }
  async function identifyAndSaveResult(state, setState) {
    if (!state.cloudUrl)
      return;
    setState({ loading: true });
    try {
      const result = {
        name: "玉米",
        rate: 0.98,
        description: "玉米是一种重要的粮食作物。"
      };
      await utils_db.updateData("seedHistory", { _id: state.recordId }, {
        resultName: result.name,
        resultRate: result.rate,
        resultDes: result.description
      });
      common_vendor.index.showToast({ title: "识别成功", icon: "success" });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/identify/identify?data=" + encodeURIComponent(JSON.stringify({
            imageSrc: state.imagePath,
            // <--- 新增这一行
            resultName: result.name,
            resultRate: result.rate,
            resultDes: result.description
          }))
        });
        common_vendor.index.navigateTo({
          url: "/pages/identify/identify?data=" + encodeURIComponent(JSON.stringify({
            resultName: result.name,
            resultRate: result.rate,
            resultDes: result.description
          }))
        });
      }, 500);
    } catch (err) {
      common_vendor.index.showToast({ title: "识别失败", icon: "none" });
      common_vendor.index.__f__("error", "at pages/home/homeMethods.ts:73", err);
    } finally {
      setState({ loading: false });
    }
  }
  return { uploadAndSaveImage, identifyAndSaveResult };
}
exports.useHomeMethods = useHomeMethods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/homeMethods.js.map
