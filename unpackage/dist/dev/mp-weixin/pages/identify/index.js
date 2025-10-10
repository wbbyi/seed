"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_upload = require("../../utils/upload.js");
const utils_db = require("../../utils/db.js");
const uniIcons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _sfc_main = {
  components: { uniIcons },
  data() {
    return {
      imagePath: "",
      // 本地路径
      cloudUrl: "",
      // 上传到云后的链接
      loading: false
    };
  },
  methods: {
    //测试各函数功能
    async testAdd() {
      const res = await utils_db.addData("demo-image", { name: "小明", age: 20 });
      common_vendor.index.__f__("log", "at pages/identify/index.vue:63", "添加结果:", res);
    },
    async testGet() {
      const res = await utils_db.getData("demo-image");
      common_vendor.index.__f__("log", "at pages/identify/index.vue:67", "获取结果:", res);
    },
    async testUpdate() {
      const res = await utils_db.updateData("demo-image", { name: "小明" }, { age: 26 });
      common_vendor.index.__f__("log", "at pages/identify/index.vue:71", "更新结果:", res);
    },
    async testDelete() {
      const res = await utils_db.deleteData("demo-image", { name: "小明" });
      common_vendor.index.__f__("log", "at pages/identify/index.vue:75", "删除结果:", res);
    },
    async testOpenId() {
      const res = await utils_db.getOpenId();
      common_vendor.index.__f__("log", "at pages/identify/index.vue:79", "当前用户OpenId:", res.openid);
    },
    async handleTakePhoto() {
      try {
        this.imagePath = await utils_upload.chooseImage();
      } catch (err) {
        common_vendor.index.showToast({ title: "选择图片失败", icon: "none" });
      }
    },
    handleDelete() {
      this.imagePath = "";
      this.cloudUrl = "";
    },
    async handleIdentify() {
      if (!this.imagePath)
        return;
      this.loading = true;
      try {
        this.cloudUrl = await utils_upload.uploadToCloud(this.imagePath);
        const res = await plantApi.identifyPlant(this.cloudUrl);
        const result = JSON.parse(res.data);
        common_vendor.index.navigateTo({
          url: "/pages/identify/result?data=" + encodeURIComponent(JSON.stringify(result)) + "&image=" + encodeURIComponent(this.cloudUrl)
        });
      } catch (err) {
        common_vendor.index.showToast({ title: "识别失败", icon: "none" });
        common_vendor.index.__f__("error", "at pages/identify/index.vue:109", err);
      } finally {
        this.loading = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.imagePath
  }, $data.imagePath ? {
    b: $data.imagePath,
    c: common_vendor.p({
      type: "closeempty",
      size: "22",
      color: "#fff"
    }),
    d: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args)),
    e: common_vendor.p({
      type: "camera",
      size: "22",
      color: "#fff"
    }),
    f: common_vendor.o((...args) => $options.handleTakePhoto && $options.handleTakePhoto(...args))
  } : {
    g: common_vendor.p({
      type: "camera",
      size: "36",
      color: "#fff"
    }),
    h: common_vendor.o((...args) => $options.handleTakePhoto && $options.handleTakePhoto(...args))
  }, {
    i: $data.imagePath
  }, $data.imagePath ? {
    j: common_vendor.p({
      type: "search",
      size: "22",
      color: "#fff"
    }),
    k: common_vendor.o((...args) => $options.handleIdentify && $options.handleIdentify(...args))
  } : {}, {
    l: $data.loading
  }, $data.loading ? {} : {}, {
    m: common_vendor.o((...args) => $options.testAdd && $options.testAdd(...args)),
    n: common_vendor.o((...args) => $options.testGet && $options.testGet(...args)),
    o: common_vendor.o((...args) => $options.testUpdate && $options.testUpdate(...args)),
    p: common_vendor.o((...args) => $options.testDelete && $options.testDelete(...args)),
    q: common_vendor.o((...args) => $options.testOpenId && $options.testOpenId(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/index.js.map
