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
    const start = timeRange[0];
    const end = timeRange[1];
    let current = new Date(start);
    const dateList = [];
    const userMessage = [];
    const dates = [];
    if (current instanceof Date) {
      while (current.getDate() <= new Date(end).getDate()) {
        let tempTime = current.setTime(current.getTime() - 8 * 60 * 60 * 1e3);
        const date = new Date(tempTime);
        dateList.push(date);
        current.setDate(current.getDate() + 1);
      }
    }
    for (let i = 0; i < dateList.length; i++) {
      let str = dateList[i].getFullYear().toString() + "-" + (dateList[i].getMonth() + 1).toString() + "-" + (dateList[i].getDate() < 10 ? "0" + dateList[i].getDate().toString() : dateList[i].getDate().toString());
      dates.push(str);
    }
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:49", "timeRange[0]:", timeRange[0]);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:50", "dateList:", dateList);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:51", "start:", start);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:52", "current:", current);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:53", "current type:", current instanceof Date);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:54", "current-type", typeof current);
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:55", "dateList[0].getDate()", dateList[0].getDate());
    common_vendor.index.__f__("log", "at pages/history/historyMethods.ts:56", "dates", dates);
    for (let i = 0; i < userMessages.length; i++) {
      for (let j = 0; j < dateList.length; j++) {
        if (dates[j] === userMessages[i].name) {
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
