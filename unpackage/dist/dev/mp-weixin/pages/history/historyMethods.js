"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_db = require("../../utils/db.js");
function methods() {
  async function getHistory() {
    let seedData = [];
    let openID = utils_db.getOpenId("seedHistory");
    let res = await utils_db.getData("seedHistory", { _id: openID });
    seedData = res.data;
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:20", "res.data", res.data);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:21", "seedData", seedData);
    return seedData;
  }
  function selectUserHistoryByTime(timeRange, userMessages) {
    const start = new Date(timeRange[0]);
    const end = new Date(timeRange[1]);
    const dateList = [];
    const userMessage = [];
    const dates = [];
    const tempDates = [];
    let currentDate = start;
    if (currentDate instanceof Date && end instanceof Date) {
      while (currentDate.getTime() <= end.getTime()) {
        tempDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
        common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:39", "currentDate---while", currentDate);
      }
    }
    for (let msg of tempDates) {
      let msgNum = msg.setTime(msg.getTime() - 8 * 60 * 60 * 1e3);
      dateList.push(new Date(msgNum));
    }
    for (let i = 0; i < dateList.length; i++) {
      let str = dateList[i].getFullYear().toString() + "-" + (dateList[i].getMonth() + 1).toString() + "-" + (dateList[i].getDate() < 10 ? "0" + dateList[i].getDate().toString() : dateList[i].getDate().toString());
      dates.push(str);
    }
    for (let i = 0; i < dates.length; i++) {
      for (let j = 0; j < userMessages.length; j++) {
        if (dates[i] === userMessages[j].name) {
          userMessage.push(userMessages[j]);
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
