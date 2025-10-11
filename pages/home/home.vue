<template>
  <view class="background-container">
    <view class="container">
      <view class="title"></view>
      <view v-if="imagePath" class="preview-wrapper">
        <image :src="imagePath" mode="aspectFit" class="preview-image"></image>
        <view class="preview-actions-top">
            <button class="action-btn-top delete-btn" @click="handleDelete">
              <uni-icons type="closeempty" size="20" color="#ff5252" />
            </button>
        </view>
      </view>
      <view v-else class="camera-container">
        <view class="outer-circle">
          <view class="camera-circle">
            <button class="camera-btn" @click="handleTakePhoto">
              <uni-icons type="camera" size="88" color="#fff" />
            </button>
          </view>
        </view>
      </view>
      <view class="buttons-container">
        <view class="action-buttons">
          <button class="action-btn-text" @click="handleTakePhoto">拍照上传</button>
          <button class="action-btn-text" @click="handleChoosePhoto">从照片中选择</button>
        </view>
      </view>
      <button v-if="imagePath" type="warn" class="identify-btn" @click="handleIdentify">
        <uni-icons type="search" size="22" color="#fff" /> 开始识别
      </button>
      <view class="loading" v-if="loading">识别中...</view>
    </view>
  </view>
</template>

<script>
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import { useHomeMethods } from './homeMethods';

export default {
  components: { uniIcons },
  data() {
    return {
      imagePath: '',
      cloudUrl: '',
      loading: false,
      recordId: ''
    };
  },
  methods: {
    setState(obj) {
      Object.assign(this, obj);
    },
    handleTakePhoto() {
      this.$homeMethods.uploadAndSaveImage(this.setState);
    },
    handleIdentify() {
      this.$homeMethods.identifyAndSaveResult(this, this.setState);
    },
    handleDelete() {
      this.imagePath = '';
      this.cloudUrl = '';
      this.recordId = '';
    }
  },
  created() {
    this.$homeMethods = useHomeMethods();
  }
};
</script>


<style>
.background-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 200px; /* 留出空间给底部弧形 */
  background: linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%);
   border-radius: 0 0 50% 50% / 0 0 20% 20%;
  z-index: -1;
}


.container {
  min-height: 100vh;
  padding: 32px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.title {
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #009688;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #b2dfdb;
}

.camera-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.outer-circle {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 16px rgba(26, 2, 2, 0.2);
  animation: pulse 2.5s infinite;
}

.camera-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, #009688 60%, #26c6da 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 16px #b2dfdb;
}

.camera-btn {
  background: transparent;
  border: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px; /* 为弧形留出空间 */
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
}

.action-btn-text {
  background: #fff;
  border: 1px solid #009688;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 16px;
  color: #009688;
  text-align: center;
  box-shadow: 0 2px 8px #b2dfdb;
  width: 280px;
}
.action-btn-text:active {
  background: #009688;
  color: #fff;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
}

/* 右上角按钮样式 */
.preview-actions-top {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  z-index: 2;
}
.action-btn-top {
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px #b2dfdb;
  padding: 0;
}
.action-btn-top:active {
  background: #e0f7fa;
}
/* 删除按钮颜色 */
.delete-btn {
  background: #fff0f0;
}
.delete-btn:active {
  background: #ffebee;
}

</style>