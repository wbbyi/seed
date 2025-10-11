"use strict";
const common_vendor = require("../common/vendor.js");
async function callDB(action, collection, data = {}, where = {}) {
  try {
    const res = await common_vendor.nr.callFunction({
      name: "saveHistory",
      data: { action, collection, data, where }
    });
    return res.result;
  } catch (err) {
    common_vendor.index.__f__("error", "at utils/db.js:18", `❌ 调用云函数出错：${action}`, err);
    throw err;
  }
}
async function getData(collection, where = {}) {
  return await callDB("get", collection, {}, where);
}
async function getOpenId(collection) {
  return await callDB("get_openid", collection);
}
exports.getData = getData;
exports.getOpenId = getOpenId;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/db.js.map
