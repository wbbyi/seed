"use strict";
const common_vendor = require("../common/vendor.js");
async function callDB(action, collection, data = {}, where = {}) {
  try {
    const res = await common_vendor.tr.callFunction({
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
async function deleteData(collection, where) {
  return await callDB("delete", collection, {}, where);
}
async function getOpenId() {
  return await callDB("get_openid");
}
exports.addData = addData;
exports.deleteData = deleteData;
exports.getData = getData;
exports.getOpenId = getOpenId;
exports.updateData = updateData;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/db.js.map
