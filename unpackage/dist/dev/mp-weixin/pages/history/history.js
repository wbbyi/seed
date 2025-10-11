"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_history_historyMethods = require("./historyMethods.js");
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_datetime_picker2 + _easycom_uni_card2)();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_datetime_picker + _easycom_uni_card)();
}
const userName = "hello";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "history",
  setup(__props) {
    let { getHistory, selectUserHistoryByTime, toDetail } = pages_history_historyMethods.methods();
    let allSeedHistorys = [];
    const seedHistorys = common_vendor.ref([]);
    const cropNum = common_vendor.ref(2);
    const otherNum = common_vendor.ref(3);
    const selectNum = common_vendor.ref();
    const range = common_vendor.ref([]);
    const allSelectNum = common_vendor.ref();
    const app = getApp();
    app.globalData.userUID;
    const systemText = common_vendor.ref("我们为您记录近一年种子日记，珍藏绿意时光！");
    const history = async () => {
      allSeedHistorys = await getHistory();
      seedHistorys.value = allSeedHistorys;
      selectNum.value = seedHistorys.value.length;
      allSelectNum.value = seedHistorys.value.length;
    };
    const selectByTime = (res) => {
      if (res.length == 0) {
        history();
      }
      common_vendor.index.__f__("log", "at pages/history/history.vue:86", res);
      seedHistorys.value = selectUserHistoryByTime(res, allSeedHistorys);
      selectNum.value = seedHistorys.value.length;
    };
    const detail = (name) => {
      for (let i = 0; i < allSeedHistorys.length; i++) {
        if (allSeedHistorys[i].resultName == name) {
          toDetail(allSeedHistorys[i]);
          break;
        }
      }
    };
    const maskClick = () => {
      history();
    };
    common_vendor.onMounted(() => {
      history();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.t(cropNum.value),
        c: common_vendor.t(otherNum.value),
        d: common_vendor.t(allSelectNum.value),
        e: common_vendor.t(userName),
        f: common_vendor.t(systemText.value),
        g: common_vendor.o(selectByTime),
        h: common_vendor.o(maskClick),
        i: common_vendor.o(($event) => range.value = $event),
        j: common_vendor.p({
          type: "daterange",
          modelValue: range.value
        }),
        k: selectNum.value === 0
      }, selectNum.value === 0 ? {
        l: common_assets._imports_1$1
      } : {
        m: common_vendor.f(seedHistorys.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.resultDes),
            b: "b2d018fa-1-" + i0,
            c: common_vendor.p({
              title: item.resultName + "(" + item.seedClass + ")",
              extra: item.name
            }),
            d: index,
            e: common_vendor.o(($event) => detail(item.resultName), index)
          };
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b2d018fa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/history/history.js.map
