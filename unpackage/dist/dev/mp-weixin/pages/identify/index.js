"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_upload = require("../../utils/upload.js");
const uniIcons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _sfc_main = {
  components: { uniIcons },
  data() {
    return {
      imagePath: "",
      loading: false
    };
  },
  methods: {
    async handleTakePhoto() {
      try {
        this.imagePath = await utils_upload.chooseAndUpload();
      } catch (err) {
        common_vendor.index.showToast({
          title: "选择图片失败",
          icon: "none"
        });
      }
    },
    handleDelete() {
      this.imagePath = "";
    },
    async handleIdentify() {
      if (!this.imagePath)
        return;
      this.loading = true;
      try {
        const res = await plantApi.identifyPlant(this.imagePath);
        const result = JSON.parse(res.data);
        common_vendor.index.navigateTo({
          url: "/pages/identify/result?data=" + encodeURIComponent(JSON.stringify(result))
        });
      } catch (err) {
        common_vendor.index.showToast({
          title: "识别失败",
          icon: "none"
        });
        common_vendor.index.__f__("error", "at pages/identify/index.vue:68", err);
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
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/identify/index.js.map
