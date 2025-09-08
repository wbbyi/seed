<template>
  <view class="container">
    <view class="title">识别结果</view>
    <image :src="result.image" mode="aspectFit" class="result-image" v-if="result.image"></image>
    
    <view class="result-card" v-if="result.name">
      <view class="result-title">种子名称</view>
      <view class="result-value">{{ result.name }}</view>
    </view>
    
    <view class="result-card" v-if="result.probability">
      <view class="result-title">识别准确率</view>
      <view class="result-value">{{ (result.probability * 100).toFixed(2) }}%</view>
    </view>
    
    <view class="result-card" v-if="result.description">
      <view class="result-title">描述</view>
      <view class="result-value">{{ result.description }}</view>
    </view>
    
    <button type="primary" @click="handleBack">返回</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      result: {}
    };
  },
  onLoad(options) {
    if (options.data) {
      this.result = JSON.parse(decodeURIComponent(options.data));
    }
  },
  methods: {
    handleBack() {
      uni.navigateBack();
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

.result-image {
  width: 90vw;
  max-width: 350px;
  height: 220px;
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px #b2dfdb;
  border: none;
  object-fit: cover;
}

.result-card {
  background: #ffffffcc;
  border-radius: 16px;
  box-shadow: 0 2px 8px #b2dfdb;
  padding: 18px 20px;
  margin-bottom: 18px;
  width: 80vw;
  max-width: 320px;
}

.result-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #009688;
}

.result-value {
  font-size: 15px;
  color: #666;
  word-break: break-all;
}

button {
  width: 80vw;
  max-width: 300px;
  height: 48px;
  font-size: 18px;
  border-radius: 24px;
  margin-top: 18px;
  box-shadow: 0 2px 8px #b2dfdb;
  letter-spacing: 1px;
}
</style>