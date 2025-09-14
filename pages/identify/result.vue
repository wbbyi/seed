<template>
  <view class="container">
    <view class="title">识别结果</view>

    <!-- 图片展示 -->
    <image :src="image" mode="aspectFit" class="result-image" v-if="image"></image>
    
    <!-- 结果展示 -->
    <view class="result-card" v-if="result.name">
      <view class="result-title">种子名称</view>
      <view class="result-value">{{ result.name }}</view>
    </view>
    
    <view class="result-card" v-if="result.probability !== undefined">
      <view class="result-title">识别准确率</view>
      <view class="result-value">{{ (result.probability * 100).toFixed(2) }}%</view>
    </view>
    
    <view class="result-card" v-if="result.description">
      <view class="result-title">描述</view>
      <view class="result-value">{{ result.description }}</view>
    </view>
    
    <!-- 按钮区 -->
    <view class="btn-group">
      <!-- 历史记录进入时不显示保存按钮 -->
      <button v-if="!fromHistory" type="primary" @click="handleSave">保存到数据库</button>
      <button v-if="!fromHistory" type="warn" @click="mockSave">模拟上传结果</button>
	  <button v-if="fromHistory" type="warn" @click="handleDelete">删除记录</button>
      <button type="default" @click="handleBack">返回</button>
    </view>
  </view>
</template>

<script>
const db = uniCloud.database()
const dbCollectionName = 'demo-image'

export default {
  data() {
    return {
      result: {},
      image: '',          // 图片URL或fileID
      fromHistory: false, // 是否从历史记录进入
      recordId: ''        // 历史记录ID
    }
  },
  async onLoad(options) {
    if (options.id) {
      //  历史记录进入
      this.fromHistory = true
      this.recordId = options.id
      await this.loadFromDb(options.id)
    } else {
      //  识别流程进入
      if (options.data) {
        this.result = JSON.parse(decodeURIComponent(options.data))
      }
      if (options.image) {
        this.image = decodeURIComponent(options.image)
      }
    }
  },
  methods: {
    handleBack() {
      uni.navigateBack()
    },

    // === 历史记录进入，查询数据库 ===
    async loadFromDb(id) {
      try {
        uni.showLoading({ title: '加载中...', mask: true })
        const res = await db.collection(dbCollectionName).doc(id).get()
        const item = res.result.data[0]
        if (item) {
          this.image = item.image?.url || item.image // 兼容对象/字符串
          this.result = {
            name: item.resultName,
            probability: item.resultRate,
            description: item.resultDes
          }
        }
      } catch (err) {
        uni.showToast({ title: '加载失败', icon: 'none' })
      } finally {
        uni.hideLoading()
      }
    },

    // === 保存识别结果 ===
    async handleSave() {
      try {
        uni.showLoading({ title: '保存中...', mask: true })

        // ⚡ 保存前检查是否已有相同的图片
        const exists = await db.collection(dbCollectionName)
          .where({ image: this.image })
          .get()

        if (exists.result.data.length > 0) {
          uni.showToast({ title: '已存在，无需重复保存', icon: 'none' })
          return
        }

        await db.collection(dbCollectionName).add({
          image: this.image,
          resultName: this.result.name || '',
          resultRate: this.result.probability || 0,
          resultDes: this.result.description || ''
        })
        uni.showToast({ title: '保存成功', icon: 'success' })
      } catch (err) {
        uni.showModal({
          title: '保存失败',
          content: err.message || '数据库请求失败',
          showCancel: false
        })
      } finally {
        uni.hideLoading()
      }
    },
	
	  // 删除功能
	  async handleDelete() {
	    const that = this
	    uni.showModal({
	      title: '确认删除',
	      content: '是否要删除该识别记录？',
	      success: async (res) => {
	        if (res.confirm) {
	          try {
	            uni.showLoading({ title: '删除中...', mask: true })
	            await db.collection('demo-image').doc(that.recordId).remove()
	            uni.hideLoading()
	            uni.showToast({ title: '删除成功', icon: 'success' })
	            // 删除后返回上一页（历史列表页）
	            setTimeout(() => {
	              uni.navigateBack()
	            }, 500)
	          } catch (err) {
	            uni.hideLoading()
	            uni.showToast({ title: '删除失败', icon: 'none' })
	          }
	        }
	      }
	    })
	  },

    // === 模拟保存识别结果 ===
    async mockSave() {
      try {
        uni.showLoading({ title: '模拟保存中...', mask: true })
        await db.collection(dbCollectionName).add({
          image: this.image,
          resultName: '模拟玉米种子',
          resultRate: 0.88,
          resultDes: '这是模拟的识别结果，表示一种常见的玉米种子'
        })
        uni.showToast({ title: '模拟保存成功', icon: 'success' })
      } catch (err) {
        uni.showModal({
          title: '模拟失败',
          content: err.message || '数据库请求失败',
          showCancel: false
        })
      } finally {
        uni.hideLoading()
      }
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