"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_identify_identifyMethods = require("./identifyMethods.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "identify",
  setup(__props) {
    let { comeBack, logRawData } = pages_identify_identifyMethods.methods();
    const seedImg = common_vendor.ref();
    let seedMessage = common_vendor.ref({});
    const getSafeResultName = (data) => {
      var _a, _b;
      return (data == null ? void 0 : data.resultName) || ((_b = (_a = data == null ? void 0 : data.predictions) == null ? void 0 : _a[0]) == null ? void 0 : _b.class_name) || "未知";
    };
    const onBack = () => {
      comeBack();
    };
    common_vendor.onLoad((options) => {
      if (options.data) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(options.data));
          common_vendor.index.__f__("log", "at pages/identify/identify.vue:94", "接收到的原始数据:", parsedData);
          logRawData(parsedData);
          parsedData.predictions = parsedData.predictions || [];
          parsedData.allClasses = parsedData.allClasses || [];
          parsedData.resultDes = parsedData.resultDes || "暂无简介";
          seedMessage.value = {
            ...parsedData,
            resultName: getSafeResultName(parsedData)
          };
          if (!parsedData.imageSrc || parsedData.imageSrc.trim() === "") {
            seedImg.value = "/static/紫罗兰.jpg";
          } else {
            seedImg.value = parsedData.imageSrc;
          }
          common_vendor.index.__f__("log", "at pages/identify/identify.vue:110", "处理后的数据:", seedMessage.value);
        } catch (e) {
          common_vendor.index.__f__("error", "at pages/identify/identify.vue:112", "解析识别数据失败:", e);
          seedMessage.value = {
            resultName: "未知",
            resultDes: "暂无简介",
            predictions: [],
            allClasses: []
          };
        }
      }
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return {
        a: seedImg.value,
        b: seedImg.value,
        c: common_vendor.t(((_a = common_vendor.unref(seedMessage)) == null ? void 0 : _a.resultName) || "未知"),
        d: common_vendor.t(((_b = common_vendor.unref(seedMessage)) == null ? void 0 : _b.englishName) || ""),
        e: common_vendor.t(((_c = common_vendor.unref(seedMessage)) == null ? void 0 : _c.seedClass) || ""),
        f: common_assets._imports_0$1,
        g: common_vendor.t(((_d = common_vendor.unref(seedMessage)) == null ? void 0 : _d.otherName) || "无"),
        h: common_assets._imports_1$1,
        i: common_vendor.t(((_e = common_vendor.unref(seedMessage)) == null ? void 0 : _e.resultDes) || "暂无简介"),
        j: common_assets._imports_2$1,
        k: common_assets._imports_3$1,
        l: common_vendor.o(onBack)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a33b9c31"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/identify.js.map
