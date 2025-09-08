<template>
  <view class="container">
    <view class="title">种子识别系统</view>
    <view v-if="imagePath" class="preview-wrapper">
      <image :src="imagePath" mode="aspectFit" class="preview-image"></image>
      <view class="preview-actions">
        <button class="action-btn" @click="handleDelete">
          <uni-icons type="closeempty" size="22" color="#fff" />
        </button>
        <button class="action-btn" @click="handleTakePhoto">
          <uni-icons type="camera" size="22" color="#fff" />
        </button>
      </view>
    </view>
    <view v-else class="fab-container">
      <button class="fab" @click="handleTakePhoto">
        <uni-icons type="camera" size="36" color="#fff" />
      </button>
      <view class="fab-label">拍照上传</view>
    </view>
    <button v-if="imagePath" type="warn" class="identify-btn" @click="handleIdentify">
      <uni-icons type="search" size="22" color="#fff" /> 开始识别
    </button>
    <view class="loading" v-if="loading">识别中...</view>
  </view>
</template>

<script>
import { chooseAndUpload } from '@/utils/upload.js';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';

export default {
  components: { uniIcons },
  data() {
    return {
      imagePath: '',
      loading: false
    };
  },
  methods: {
    async handleTakePhoto() {
      try {
        this.imagePath = await chooseAndUpload();
      } catch (err) {
        uni.showToast({
          title: '选择图片失败',
          icon: 'none'
        });
      }
    },
    handleDelete() {
      this.imagePath = '';
    },
    async handleIdentify() {
      if (!this.imagePath) return;
      this.loading = true;
      try {
        const res = await plantApi.identifyPlant(this.imagePath);
        const result = JSON.parse(res.data);
        uni.navigateTo({
          url: '/pages/identify/result?data=' + encodeURIComponent(JSON.stringify(result))
        });
      } catch (err) {
        uni.showToast({
          title: '识别失败',
          icon: 'none'
        });
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  padding: 32px 18px;
  background: linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.title {
  font-size: 30px;
  margin-bottom: 32px;
  font-weight: bold;
  color: #009688;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #b2dfdb;
}

.fab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
}

.fab {
  background: linear-gradient(135deg, #009688 60%, #26c6da 100%);
  border: none;
  border-radius: 50%;
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px #b2dfdb;
  margin-bottom: 8px;
  transition: box-shadow 0.2s;
}
.fab:active {
  box-shadow: 0 2px 8px #b2dfdb;
}

.fab-label {
  font-size: 15px;
  color: #009688;
  font-weight: bold;
  letter-spacing: 1px;
}

.preview-wrapper {
  position: relative;
  width: 90vw;
  max-width: 350px;
  margin-bottom: 18px;
}
.preview-image {
  width: 100%;
  height: 220px;
  border-radius: 18px;
  box-shadow: 0 4px 16px #b2dfdb;
  object-fit: cover;
}
.preview-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 10px;
}
.action-btn {
  background: linear-gradient(135deg, #009688 60%, #26c6da 100%);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #b2dfdb;
}

.identify-btn {
  width: 80vw;
  max-width: 300px;
  height: 48px;
  font-size: 18px;
  border-radius: 24px;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px #b2dfdb;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(90deg, #009688 60%, #26c6da 100%);
  color: #fff;
  border: none;
}

.loading {
  margin-top: 24px;
  color: #009688;
  font-size: 16px;
  font-weight: bold;
}
</style>