<template>
  <view class="container">
    <view class="title">历史识别记录</view>
    <view v-if="historyList.length === 0" class="empty-tip">暂无历史记录</view>
    <view v-for="item in historyList" :key="item.id" class="history-card" @click="viewDetail(item)">
      <image :src="item.image" class="history-image" mode="aspectFit"></image>
      <view class="history-info">
        <view class="history-name">{{ item.result.name }}</view>
        <view class="history-time">{{ item.time }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getHistoryList } from '@/utils/historyApi.js';

export default {
  data() {
    return {
      historyList: []
    };
  },
  async onShow() {
    // 页面显示时加载历史记录
    this.historyList = await getHistoryList();
  },
  methods: {
    viewDetail(item) {
      uni.navigateTo({
        url: '/pages/identify/result?data=' + encodeURIComponent(JSON.stringify(item.result)) + '&image=' + encodeURIComponent(item.image)
      });
    }
  }
};
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