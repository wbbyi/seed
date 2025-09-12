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
	<view v-if="showPopup" class="mask" @click="closePopup"></view>

	<!-- 半屏弹窗 -->
	<view v-if="showPopup" class="bottom-popup">
		<view class="camera-text">
			<text>半屏弹窗内容</text>
		</view>
		<view class="btn-camera">
			<button class="camera" fileMediatype="image" :image-styles="imageStyles">
				<image src="/static/takePhoto.png" mode="widthFix"></image>
			</button>
			<button class="camera" :image-styles="imageStyles">
				<image src="/static/album.png" mode="widthFix"></image>
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import methods from '@/pages/home/homeMethods'
	import { onShow } from '@dcloudio/uni-app'
	import { CardMessage } from "@/pages/home/homeClass"

	// 响应式数据定义
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
	let seedList = ref<CardMessage[]>([])
	const date = new Date()
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

	let imageStyles = {
		width: 50,
		height: 50,
	};
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
	
	.noHistory{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.noHistory image{
		width: 50%;
		height: 50%;
	}
</style>