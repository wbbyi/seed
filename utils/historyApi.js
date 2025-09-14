
const db = uniCloud.database()

/**
 * 历史记录 API
 */
export default class HistoryApi {
  constructor(limit = 10) {
    this.limit = limit            // 每页条数
    this.page = 1                 // 当前页码
    this.hasMore = true           // 是否还有更多
    this.loading = false          // 是否在加载中
  }

  async getList(reset = false) {
    if (this.loading) return []

    if (reset) {
      this.page = 1
      this.hasMore = true
    }

    if (!this.hasMore) return []

    this.loading = true
    try {
      const skip = (this.page - 1) * this.limit
      const res = await db.collection('demo-image')
        .orderBy('name', 'desc')   // 按识别时间倒序
        .skip(skip)
        .limit(this.limit)
        .get()

      const list = res.result.data || []

      if (list.length < this.limit) {
        this.hasMore = false
      } else {
        this.page += 1
      }

      return list
    } finally {
      this.loading = false
    }
  }
}
