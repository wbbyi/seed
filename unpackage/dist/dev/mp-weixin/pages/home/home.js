"use strict";
const pages_home_homeMethods = require("./homeMethods.js");
const common_vendor = require("../../common/vendor.js");
const uniIcons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _sfc_main = {
  components: { uniIcons },
  data() {
    return {
      imagePath: "",
      cloudUrl: "",
      loading: false,
      recordId: ""
    };
  },
  methods: {
    setState(obj) {
      Object.assign(this, obj);
    },
    handleTakePhoto() {
      this.$homeMethods.uploadAndSaveImage(this.setState);
    },
    handleIdentify() {
      this.$homeMethods.identifyAndSaveResult(this, this.setState);
    },
    handleDelete() {
      this.imagePath = "";
      this.cloudUrl = "";
      this.recordId = "";
    }
  },
  created() {
    this.$homeMethods = pages_home_homeMethods.useHomeMethods();
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
      size: "20",
      color: "#ff5252"
    }),
    d: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args))
  } : {
    e: common_vendor.p({
      type: "camera",
      size: "88",
      color: "#fff"
    }),
    f: common_vendor.o((...args) => $options.handleTakePhoto && $options.handleTakePhoto(...args))
  }, {
    g: common_vendor.o((...args) => $options.handleTakePhoto && $options.handleTakePhoto(...args)),
    h: common_vendor.o((...args) => _ctx.handleChoosePhoto && _ctx.handleChoosePhoto(...args)),
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
