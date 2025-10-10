<template>
  <view class="container">
    <view class="title">种子识别系统</view>

    <!-- 图片预览 -->
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

    <!-- 拍照按钮 -->
    <view v-else class="fab-container">
      <button class="fab" @click="handleTakePhoto">
        <uni-icons type="camera" size="36" color="#fff" />
      </button>
      <view class="fab-label">拍照上传</view>
    </view>

    <!-- 开始识别按钮 -->
    <button v-if="imagePath" type="warn" class="identify-btn" @click="handleIdentify">
      <uni-icons type="search" size="22" color="#fff" /> 开始识别
    </button>

    <view class="loading" v-if="loading">识别中...</view>
	
	  <view class="container">
	    <button @click="testAdd">添加数据</button>
	    <button @click="testGet">获取数据</button>
	    <button @click="testUpdate">更新数据</button>
	    <button @click="testDelete">删除数据</button>
	    <button @click="testOpenId">获取OpenId</button>
	  </view>
	
  </view>
</template>

<script>
import { chooseImage } from '@/utils/upload.js'; // 只选择图片，不立即上传
import { uploadToCloud } from '@/utils/upload.js'; // 专门的上传函数
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import { addData, getData, updateData, deleteData, getOpenId } from '@/utils/db.js';

export default {
  components: { uniIcons },
  data() {
    return {
      imagePath: '',  // 本地路径
      cloudUrl: '',   // 上传到云后的链接
      loading: false
    };
  },
  methods: {
	  //测试各函数功能
	    async testAdd() {
	      const res = await addData('demo-image', { name: '小明', age: 20 });
	      console.log('添加结果:', res);
	    },
	    async testGet() {
	      const res = await getData('demo-image');
	      console.log('获取结果:', res);
	    },
	    async testUpdate() {
	      const res = await updateData('demo-image', { name: '小明' }, { age: 26 });
	      console.log('更新结果:', res);
	    },
	    async testDelete() {
	      const res = await deleteData('demo-image', { name: '小明' });
	      console.log('删除结果:', res);
	    },
	    async testOpenId() {
	      const res = await getOpenId();
	      console.log('当前用户OpenId:', res.openid);
	    },
	  
    async handleTakePhoto() {
      try {
        this.imagePath = await chooseImage(); // 这里只取本地路径，不上传
      } catch (err) {
        uni.showToast({ title: '选择图片失败', icon: 'none' });
      }
    },
    handleDelete() {
      this.imagePath = '';
      this.cloudUrl = '';
    },
    async handleIdentify() {
      if (!this.imagePath) return;
      this.loading = true;
      try {
        // === 1. 上传到云存储 ===
        this.cloudUrl = await uploadToCloud(this.imagePath);

        // === 2. 调用识别接口 ===
        const res = await plantApi.identifyPlant(this.cloudUrl);
        const result = JSON.parse(res.data);
        
        uni.navigateTo({
          url: '/pages/identify/result?data=' + encodeURIComponent(JSON.stringify(result)) + '&image=' + encodeURIComponent(this.cloudUrl)
        });
      } catch (err) {
        uni.showToast({ title: '识别失败', icon: 'none' });
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