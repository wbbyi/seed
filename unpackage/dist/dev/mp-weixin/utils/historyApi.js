"use strict";
const common_vendor = require("../common/vendor.js");
const HISTORY_KEY = "seed_history";
async function saveHistory(item) {
  let list = common_vendor.index.getStorageSync(HISTORY_KEY) || [];
  list.unshift(item);
  common_vendor.index.setStorageSync(HISTORY_KEY, list);
}
async function getHistoryList() {
  let list = common_vendor.index.getStorageSync(HISTORY_KEY) || [];
  return list;
}
exports.getHistoryList = getHistoryList;
exports.saveHistory = saveHistory;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/historyApi.js.map
