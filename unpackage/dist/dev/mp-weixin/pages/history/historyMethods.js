"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_db = require("../../utils/db.js");
function methods() {
  async function getHistory() {
    let seedData = [];
    let openID = utils_db.getOpenId("seedHistory");
    let res = await utils_db.getData("seedHistory", { _id: openID });
    seedData = res.data;
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:21", "res.data", res.data);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:22", "seedData", seedData);
    return seedData;
  }
  function selectUserHistoryByTime(timeRange, userMessages) {
    let start = new Date(timeRange[0]);
    let end = new Date(timeRange[1]);
    let current = start;
    const dateList = [];
    const userMessage = [];
    while (current <= end) {
      dateList.push(current);
      current.setDate(current.getDate() + 1);
    }
    for (let i = 0; i < userMessages.length; i++) {
      for (let j = 0; j < dateList.length; j++) {
        if (dateList[j].toString() == userMessages[i].name) {
          userMessage.push(userMessages[i]);
        }
      }
    }
    return userMessage;
  }
  function toDetail(seedHistory) {
    common_vendor.index.navigateTo({
      url: "/pages/identify/identify?data=" + encodeURIComponent(JSON.stringify(seedHistory))
    });
  }
  return { getHistory, selectUserHistoryByTime, toDetail };
}
exports.methods = methods;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/history/historyMethods.js.map
