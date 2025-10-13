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
      common_vendor.index.__f__("error", "at pages/home/homeMethods.ts:25", "图片上传错误:", err);
    }
  }
  async function identifyAndSaveResult(state, setState) {
    if (!state.cloudUrl || !state.imagePath) {
      common_vendor.index.showToast({ title: "请先上传图片", icon: "none" });
      return;
    }
    setState({ loading: true });
    const apiUrl = "https://dp111379621p.vicp.fun/predict/get_category";
    const filePath = state.imagePath;
    try {
      const requestConfig = {
        url: apiUrl,
        filePath,
        name: "file",
        formData: {},
        header: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        },
        timeout: 15e3
      };
      const uploadRes = await new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          ...requestConfig,
          success: (res) => {
            try {
              const responseData = JSON.parse(res.data);
              if (!responseData || typeof responseData !== "object") {
                return reject(new Error("无效的响应数据格式"));
              }
              if (responseData.code !== 200) {
                return reject(new Error(responseData.message || `后端错误: ${responseData.code}`));
              }
              const resultData2 = responseData.data || {};
              const predictions2 = (resultData2.predictions || []).filter((item) => item && item.class_name);
              const firstPrediction2 = predictions2.length > 0 ? predictions2[0] : { class_name: "未知", confidence: 0 };
              const allClasses = Array.isArray(resultData2.all_classes_probabilities) ? resultData2.all_classes_probabilities : [];
              resolve({
                ...responseData,
                predictions: predictions2,
                all_classes_probabilities: allClasses
              });
            } catch (e) {
              reject(new Error("响应数据解析失败"));
            }
          },
          fail: (err) => {
            reject(new Error(`网络请求失败: ${err.errMsg}`));
          }
        });
      });
      const resultData = uploadRes;
      const predictions = resultData.predictions || [];
      const firstPrediction = predictions.length > 0 ? predictions[0] : { class_name: "未知", confidence: 0 };
      await utils_db.updateData("seedHistory", { _id: state.recordId }, {
        resultName: firstPrediction.class_name,
        resultRate: firstPrediction.confidence,
        resultDes: JSON.stringify(resultData.all_classes_probabilities || {})
      });
      common_vendor.index.showToast({ title: "识别成功", icon: "success" });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: `/pages/identify/identify?data=${encodeURIComponent(JSON.stringify({
            imageSrc: state.imagePath,
            predictions,
            resultName: firstPrediction.class_name,
            allClasses: resultData.all_classes_probabilities || []
          }))}`
        });
      }, 500);
    } catch (err) {
      const errorMap = {
        "无效的响应数据格式": "服务器返回了无效的数据",
        "后端错误": `后端处理失败: ${err.message.replace(/后端错误: /, "")}`,
        "响应数据中缺少predictions数组": "服务器未返回预测结果",
        "未识别出任何结果": "服务器未识别出任何结果",
        "网络请求失败": "网络连接失败，请检查网络设置",
        "响应数据解析失败": "服务器返回数据格式错误",
        "默认错误": "识别失败，请重试"
      };
      let errorMsg = errorMap[Object.keys(errorMap).find((key) => err.message.includes(key)) || "默认错误"];
      common_vendor.index.showToast({
        title: errorMsg,
        icon: "none",
        duration: 3e3
      });
      common_vendor.index.__f__("error", "at pages/home/homeMethods.ts:139", "完整错误信息:", {
        time: (/* @__PURE__ */ new Date()).toISOString(),
        error: err.message || err,
        stack: err.stack,
        requestInfo: {
          url: apiUrl,
          filePath
        }
      });
    } finally {
      setState({ loading: false });
    }
  }
  return { uploadAndSaveImage, identifyAndSaveResult };
}
exports.useHomeMethods = useHomeMethods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/homeMethods.js.map
