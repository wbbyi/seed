"use strict";
const common_vendor = require("../common/vendor.js");
const db = common_vendor.tr.database();
class HistoryApi {
  constructor(limit = 10) {
    this.limit = limit;
    this.page = 1;
    this.hasMore = true;
    this.loading = false;
  }
  async getList(reset = false) {
    if (this.loading)
      return [];
    if (reset) {
      this.page = 1;
      this.hasMore = true;
    }
    if (!this.hasMore)
      return [];
    this.loading = true;
    try {
      const skip = (this.page - 1) * this.limit;
      const res = await db.collection("demo-image").orderBy("name", "desc").skip(skip).limit(this.limit).get();
      const list = res.result.data || [];
      if (list.length < this.limit) {
        this.hasMore = false;
      } else {
        this.page += 1;
      }
      return list;
    } finally {
      this.loading = false;
    }
  }
}
exports.HistoryApi = HistoryApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/historyApi.js.map
