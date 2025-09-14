<template>
  <view class="container">
    <view class="title">历史识别记录</view>

    <view v-if="historyList.length === 0 && !loading" class="empty-tip">
      暂无历史记录
    </view>

    <view v-for="item in historyList" :key="item._id" class="history-card" @click="viewDetail(item)">
      <image :src="item.image.url" class="history-image" mode="aspectFit"></image>
      <view class="history-info">
        <view class="history-name">{{ item.resultName }}</view>
        <view class="history-time">{{ item.name }}</view>
      </view>
    </view>

    <uni-load-more :status="loading ? 'loading' : (hasMore ? 'more' : 'noMore')" />
  </view>
</template>

<script>
import HistoryApi from '@/utils/historyApi.js'

export default {
  data() {
    return {
      historyApi: null,
      historyList: [],
      loading: false,
      hasMore: true
    }
  },
  async onLoad() {
    this.historyApi = new HistoryApi(10) // 每页 10 条
    await this.loadData(true)
  },
  onShow() {
      //  页面每次显示时刷新一次
      this.loadData(true)
    },
  onReachBottom() {
    this.loadData()
  },
  methods: {
    async loadData(reset = false) {
      this.loading = true
      const list = await this.historyApi.getList(reset)
      if (reset) {
        this.historyList = list
      } else {
        this.historyList = [...this.historyList, ...list]
      }
      this.hasMore = this.historyApi.hasMore
      this.loading = false
    },
    viewDetail(item) {
      uni.navigateTo({
        url: '/pages/identify/result?id=' + item._id
      })
    }
  }
}
</script>


<style>
.container {
  min-height: 100vh;
  padding: 32px 16px;
  background: linear-gradient(135deg, #fffde4 0%, #e0f7fa 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 28px;
  margin-bottom: 28px;
  font-weight: bold;
  color: #009688;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #b2dfdb;
}
.empty-tip {
  color: #aaa;
  margin-top: 40px;
  font-size: 16px;
}
.history-card {
  background: #ffffffcc;
  border-radius: 16px;
  box-shadow: 0 2px 8px #b2dfdb;
  padding: 12px 16px;
  margin-bottom: 18px;
  width: 80vw;
  max-width: 320px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.history-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 16px;
  object-fit: cover;
}
.history-info {
  flex: 1;
}
.history-name {
  font-size: 17px;
  color: #009688;
  font-weight: bold;
}
.history-time {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}
</style>