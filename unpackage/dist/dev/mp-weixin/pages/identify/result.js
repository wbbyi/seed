"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.tr.database();
const dbCollectionName = "demo-image";
const _sfc_main = {
  data() {
    return {
      result: {},
      image: "",
      // 图片URL或fileID
      fromHistory: false,
      // 是否从历史记录进入
      recordId: ""
      // 历史记录ID
    };
  },
  async onLoad(options) {
    if (options.id) {
      this.fromHistory = true;
      this.recordId = options.id;
      await this.loadFromDb(options.id);
    } else {
      if (options.data) {
        this.result = JSON.parse(decodeURIComponent(options.data));
      }
      if (options.image) {
        this.image = decodeURIComponent(options.image);
      }
    }
  },
  methods: {
    handleBack() {
      common_vendor.index.navigateBack();
    },
    // === 历史记录进入，查询数据库 ===
    async loadFromDb(id) {
      var _a;
      try {
        common_vendor.index.showLoading({ title: "加载中...", mask: true });
        const res = await db.collection(dbCollectionName).doc(id).get();
        const item = res.result.data[0];
        if (item) {
          this.image = ((_a = item.image) == null ? void 0 : _a.url) || item.image;
          this.result = {
            name: item.resultName,
            probability: item.resultRate,
            description: item.resultDes
          };
        }
      } catch (err) {
        common_vendor.index.showToast({ title: "加载失败", icon: "none" });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // === 保存识别结果 ===
    async handleSave() {
      try {
        common_vendor.index.showLoading({ title: "保存中...", mask: true });
        const exists = await db.collection(dbCollectionName).where({ image: this.image }).get();
        if (exists.result.data.length > 0) {
          common_vendor.index.showToast({ title: "已存在，无需重复保存", icon: "none" });
          return;
        }
        await db.collection(dbCollectionName).add({
          image: this.image,
          resultName: this.result.name || "",
          resultRate: this.result.probability || 0,
          resultDes: this.result.description || ""
        });
        common_vendor.index.showToast({ title: "保存成功", icon: "success" });
      } catch (err) {
        common_vendor.index.showModal({
          title: "保存失败",
          content: err.message || "数据库请求失败",
          showCancel: false
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // 删除功能
    async handleDelete() {
      const that = this;
      common_vendor.index.showModal({
        title: "确认删除",
        content: "是否要删除该识别记录？",
        success: async (res) => {
          if (res.confirm) {
            try {
              common_vendor.index.showLoading({ title: "删除中...", mask: true });
              await db.collection("demo-image").doc(that.recordId).remove();
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({ title: "删除成功", icon: "success" });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 500);
            } catch (err) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({ title: "删除失败", icon: "none" });
            }
          }
        }
      });
    },
    // === 模拟保存识别结果 ===
    async mockSave() {
      try {
        common_vendor.index.showLoading({ title: "模拟保存中...", mask: true });
        await db.collection(dbCollectionName).add({
          image: this.image,
          resultName: "模拟玉米种子",
          resultRate: 0.88,
          resultDes: "这是模拟的识别结果，表示一种常见的玉米种子"
        });
        common_vendor.index.showToast({ title: "模拟保存成功", icon: "success" });
      } catch (err) {
        common_vendor.index.showModal({
          title: "模拟失败",
          content: err.message || "数据库请求失败",
          showCancel: false
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.image
  }, $data.image ? {
    b: $data.image
  } : {}, {
    c: $data.result.name
  }, $data.result.name ? {
    d: common_vendor.t($data.result.name)
  } : {}, {
    e: $data.result.probability !== void 0
  }, $data.result.probability !== void 0 ? {
    f: common_vendor.t(($data.result.probability * 100).toFixed(2))
  } : {}, {
    g: $data.result.description
  }, $data.result.description ? {
    h: common_vendor.t($data.result.description)
  } : {}, {
    i: !$data.fromHistory
  }, !$data.fromHistory ? {
    j: common_vendor.o((...args) => $options.handleSave && $options.handleSave(...args))
  } : {}, {
    k: !$data.fromHistory
  }, !$data.fromHistory ? {
    l: common_vendor.o((...args) => $options.mockSave && $options.mockSave(...args))
  } : {}, {
    m: $data.fromHistory
  }, $data.fromHistory ? {
    n: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args))
  } : {}, {
    o: common_vendor.o((...args) => $options.handleBack && $options.handleBack(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/result.js.map
