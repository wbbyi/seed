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
async function addData(collection, data) {
  return await callDB("add", collection, data);
}
async function getData(collection, where = {}) {
  return await callDB("get", collection, {}, where);
}
async function updateData(collection, where, data) {
  return await callDB("update", collection, data, where);
}
async function getOpenId(collection) {
  return await callDB("get_openid", collection);
}
exports.addData = addData;
exports.getData = getData;
exports.getOpenId = getOpenId;
exports.updateData = updateData;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/db.js.map
