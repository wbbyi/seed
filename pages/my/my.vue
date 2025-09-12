<template>
	<uni-card class="myPhoto" title="昵称" thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
	</uni-card>
	<view class="my-buttons">
		<button class="myButton">
			<view class="btn-item1">
				<image class="btn-img" src="/static/question.png"></image>
				<text class="btn-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用帮助</text>
			</view>
			<view class="btn-item2">
				<image class="bracket" src="/static/angleBracket.png"></image>
			</view>
		</button>
		<button class="myButton">
			<view class="btn-item1">
				<image class="btn-img" src="/static/ex.png"></image>
				<text class="btn-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注销账户</text>
			</view>
			<view class="btn-item2">
				<image class="bracket" src="/static/angleBracket.png"></image>
			</view>
		</button>
	</view>









	<!-- 蒙层 -->
	<view v-if="showPopup" class="mask" @click="closePopup"></view>

	<!-- 半屏弹窗 -->
	<view v-if="showPopup" class="bottom-popup">
		<view class="camera-text">
			<text>半屏弹窗内容</text>
		</view>
		<view class="btn-camera">
			<button class="camera">
				<image src="/static/takePhoto.png" mode="widthFix">拍照</image>
			</button>
			<button class="camera">
				<image src="/static/album.png" mode="widthFix"></image>
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import { onShow } from '@dcloudio/uni-app'



	let myContent = ref("这个人很懒什么也没说")
	onShow(() => {
		const pages = getCurrentPages()
		const page = pages[pages.length - 1] as any
		page.getTabBar?.()?.setData({ selected: 1 }) // 我的选中
	})
	const showPopup = ref(false)

	// 打开弹窗
	const openPopup = () => {
		showPopup.value = true
	}

	// 关闭弹窗
	const closePopup = () => {
		showPopup.value = false
	}

	onMounted(() => {
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1] as any

		// 注册页面方法供 tabBar 调用
		currentPage.openPopup = openPopup
	})

	onUnmounted(() => {
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1] as any

		// 卸载时清理
		delete currentPage.openPopup
	})


	onShow(() => {
		// 调用自定义 tabbar 组件中暴露的 setData 来切换选中项
		const tabBar = getApp().$tabbar
		if (tabBar) {
			tabBar.setData({
				selected: 1
			})
		}
	})
</script>

<style scoped>
	.myPhoto {
		display: flex;
	}

	.myText {
		display: flex;
		font-size: 78%;

	}

	.edit {
		display: flex;
		flex-direction: column-reverse;
		width: 75rpx;
		height: 80rpx;
	}

	.editImg {
		display: flex;
		border: none;
		width: 100rpx;
		height: 100rpx;
	}

	.float-btn {
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: #007AFF;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.float-btn cover-image {
		width: 60rpx;
		height: 60rpx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.bottom-popup {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 25%;
		background-color: #fff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		z-index: 101;
		padding: 20px;
		flex-direction: column;
		padding: 40rpx 20rpx;
		align-items: center;
		/* 水平居中 */
	}

	.camera-text {
		text-align: center;
		font-size: 32rpx;
		font-weight: 600;
	}

	.btn-camera {
		flex: 1;
		/* 占据剩余空间 */
		display: flex;
		justify-content: center;
		/* 横向居中分布 */
		align-items: center;
		/* 垂直居中 */
		gap: 60rpx;
		width: 100%;
	}

	.camera {
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		background-color: #f7f7f7;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		padding: 0;
	}

	.camera image {
		width: 60rpx;
		height: 60rpx;
	}

	.myButton {
		display: flex;
		background-color: white;
		border: none;
		justify-content: space-between;
		align-items: center;
		
	}

	.btn-img {
		width: 40rpx;
		height: 40rpx;
	}

	.btn-text {
		text-align: left;
		font-size: 32rpx;
	}

	.bracket {
		width: 40rpx;
		height: 40rpx;
	}
	
	.btn-item1{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30%;
		height: 100%;
	}
	
	.btn-item{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20%;
		height: 100%;
	}
</style>