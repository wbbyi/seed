<template>
	<view class="swiper">
		<!-- 指示点组件 -->
		<uni-swiper-dot :info="info" :current="current" mode="round" :dots-styles="dotsStyles">
			<!-- 轮播图主体 -->
			<swiper :current="current" @change="onSwiperChange" :autoplay="true" :circular="true">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item">{{ item.content }}</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
	<view class="historyCard">
		<text class="history">&nbsp; &nbsp; 历史记录</text>
		<view class="noHistory" v-if="seedList.length === 0">
			<image src="/static/history.png" mode="widthFix"></image>
		</view>

		<view class="cards" v-else v-for="i in seedList" :key="i">
			<uni-card :title="i.name" :sub-title="i.time" :thumbnail="i.photo">
				<text>{{i.text}}</text>;
			</uni-card>
		</view>
	</view>
	<!-- 蒙层 -->
	<view v-if="showPopup || showModel" class="mask" @click="closePopup"></view>

	<view class="upload-cartoon" v-show="showUploadCartoon">
		<canvas id="canvas" type="2d" style="width: 300px; height: 300px;"></canvas>
	</view>

	<!-- 半屏弹窗 -->
	<view v-if="showPopup" class="bottom-popup">
		<view class="camera-text">
			<text>半屏弹窗内容</text>
		</view>
		<view class="btn-camera">
			<button class="camera" fileMediatype="image" @click="takePhoto">
				<image src="/static/takePhoto.png" mode="widthFix"></image>
			</button>
			<button class="camera" @click="chooseImages">
				<image src="/static/album.png" mode="widthFix"></image>
			</button>
		</view>
	</view>
	<view class="modal-mask" v-if="showModel">
		<view class="modal-box">
			<view class="img-box" v-for="(i, index) in imgPaths" :key="index">
				<image class="img-style" :src="i" mode="aspectFit"></image>
				<button class="img-delete" :plain="true" @click="deletePhoto(index)">×</button>
			</view>
		</view>
		<view class="modal-button-box">
			<view>
				<button class="modal-btn" @click="uploadImages">上传</button>
				<button class="modal-btn" @click="cancel">取消</button>
			</view>
		</view>
	</view>
	<!-- 	<lottie id="lottie" src="/static/lottie/animation.json" background="transparent" loop autoplay
		style="width:300px;height:300px;">
	</lottie> -->
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import methods from '@/pages/home/homeMethods'
	import { onShow } from '@dcloudio/uni-app'
	import { CardMessage } from "@/pages/home/homeClass"
	import { baseUrl, functionUrl } from "@/url/url"
	import lottie from 'lottie-miniprogram'
	import animationData from '@/static/loading5-color-data.json'




	let { chooseImage } = methods()
	const showUploadCartoon = ref(false)
	const showModel = ref(false)
	const current = ref(0);
	const info = ref([{
		content: '页面1'
	},
	{
		content: '页面2'
	},
	{
		content: '页面3'
	}
	]);
	const maxNum = 2;
	const imgPaths = ref<string[]>([])
	let seedList = ref<CardMessage[]>([])
	const date = "2025"
	const seed1 = new CardMessage('/static/history.png', '1', '1', date)
	seedList.value.push(seed1)


	// 指示点样式配置
	const dotsStyles = {
		backgroundColor: 'rgba(0, 0, 0, .3)',
		border: '1px rgba(0, 0, 0, .3) solid',
		color: '#fff',
		selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
		selectedBorder: '1px rgba(0, 0, 0, .9) solid'
	};

	// 轮播图切换事件
	const onSwiperChange = (e : { detail : { current : number; }; }) => {
		current.value = e.detail.current;
	};

	const showPopup = ref(false)

	// 打开弹窗
	const openPopup = () => {
		showPopup.value = true
	}

	// 关闭弹窗
	const closePopup = () => {
		showPopup.value = false
	}

	const takePhoto = async () => {
		closePopup()
		const paths = await chooseImage(1, maxNum)
		imgPaths.value = paths
		showModel.value = true
	}

	const chooseImages = async () => {
		closePopup()
		const paths = await chooseImage(1, maxNum)
		imgPaths.value = paths
		showModel.value = true
		console.log("imgPaths:", imgPaths.value)
	}

	const closemodalMask = () => {
		closePopup()
		showModel.value = false
	}

	const uploadImages = () => {
		closemodalMask()
		showUploadCartoon.value = true
		uni.request({
			url: baseUrl + functionUrl,
			method: 'POST',
			data: {
				imgs: seedList
			},
			success: (res) => {
				console.log('请求成功', res.data)
				showUploadCartoon.value = false
			},
			fail: (err) => {
				console.error('请求失败', err)
				showUploadCartoon.value = false
			},
			complete: () => {
				console.log('请求完成')
			}
		})
	}

	const cancel = () => {
		closemodalMask()
	}

	const deletePhoto = (index : number) => {
		imgPaths.value.splice(index, 1)
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
				selected: 0
			})
		}
	})

	onMounted(() => {
		// 等页面渲染完成后再获取节点
		uni.createSelectorQuery()
			.select('#canvas')
			.node((res : any) => {
				const canvas = res.node
				// 初始化 lottie
				lottie.setup(canvas)

				// 如果要加载动画，可以在这里调用
				lottie.loadAnimation({
					renderer: 'canvas',
					loop: true,
					autoplay: true,
					animationData: animationData,
					rendererSettings: {
						context: canvas.getContext('2d')
					}
				})
			})
			.exec()
	})
</script>

<style scoped>
	.swiper-item {
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eee;
	}

	.swiper {
		margin-bottom: 70rpx;
	}

	.history {
		display: flex;
	}

	.float-btn {
		position: fixed;
		bottom: 0rpx;
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

	.button1 {
		bottom: 0rpx;
	}

	.page {
		padding-bottom: 100rpx;
		/* 给 tabBar 留空间 */
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

	.uploadImg-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.noHistory {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.noHistory image {
		width: 50%;
		height: 50%;
	}

	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-mask {
		display: flex;
		flex-direction: column;
		position: fixed;
		gap: 20rpx;
		/* 固定定位 */
		top: 50%;
		/* 顶部 50% */
		left: 50%;
		/* 左侧 50% */
		transform: translate(-50%, -50%);
		/* 偏移自身宽高的一半实现居中 */
		width: 600rpx;
		/* 你想要的固定宽度 */
		max-height: 45vh;
		/* 控制最大高度，防止溢出 */
		background: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
		z-index: 999;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);
	}

	.modal-box {
		display: flex;
		align-items: center;
		justify-self: center;
		width: 100%;
		height: 60%;
	}

	.img-box {
		position: relative;
		display: flex;
		width: 40%;
		height: 40%;
	}

	.modal-button-box {
		width: 80%;
		height: 30%;
		display: flex;
		flex-direction: column-reverse;
	}

	.modal-button-box view {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		width: 100%;
		height: 60%;
	}

	.modal-btn {
		width: 40%;
		height: 40%;
		font-size: 40%;
		bottom: 10%;
		border: 0rpx;
		margin: 0rpx;
		padding: 0rpx;
	}

	.img-style {
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
	}

	.img-delete {
		position: absolute;
		top: 0;
		right: 0;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		color: #fff;
		border-radius: 50%;
		font-size: 24rpx;
		padding: 0;
	}
</style>