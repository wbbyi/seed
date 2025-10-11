<template>
	<view class="seed-box">
		<view class="seed-image-box">
			<image class="seed-image" :src="imageSrc || '/static/紫罗兰.jpg'" mode="widthFix"></image>
		</view>
		<view class="seed-name-box">
			<view class="seed-name">
				<view class="seed-img-box">
					<image class="seed-img" src="/static/logo.png" mode="widthFix"></image>
				</view>
				<view id="seed-name-box">
					<view class="seed-names">
						<text>{{ seedMessage?.resultName }}</text>
					</view>
					<view class="seed-english">
						<text>{{ seedMessage?.englishName }}</text>
					</view>
					<view class="seed-class">
						<text>{{ seedMessage?.seedClass }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="seed-message-box">
		<view class="seed-message">
			<view class="seed-other-name">
				<view id="seed-image-box">
					<image class="seed-other-name-image" src="/static/otherName.png" mode="aspectFit"></image>
				</view>
				<text>别名名称</text>
			</view>
			<view class="seed-other-name-text">
				<text>{{ seedMessage?.otherName }}</text>
			</view>
			<view class="seed-introduction-box">
				<image class="seed-introduction-image" src="/static/introduction.png" mode="widthFix"></image>
				<text>简介概述</text>
			</view>
			<view class="seed-introduction">
				<text>{{ seedMessage?.resultDes }}</text>
			</view>
		</view>
	</view>
	<view class="back">
		<view class="toSelect">
			<image src="/static/toSelect.png" mode="widthFix"></image>
			<text>继续识别</text>
		</view>
		<view class="toBack" @click="onBack">
			<image src="/static/back.png" mode="widthFix"></image>
			<text>返回首页</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { getCurrentInstance, ref } from 'vue';
	import { UserHistory } from '../history/historyClass';
	import { methods } from './identifyMethods'
	import { onLoad } from '@dcloudio/uni-app'


	let { comeBack } = methods();
	let seedMessage = ref<UserHistory>();


	const onBack = () => {
		comeBack();
	}
	
	
	onLoad((options) => {
		if (options.data) {
			seedMessage.value = JSON.parse(decodeURIComponent(options.data))
		}
	})
</script>

<style scoped>
	. {
		margin: 0;
	}

	.seed-box {
		position: relative;
		width: 750rpx;
		height: 550rpx;
	}

	.seed-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 500rpx;
	}

	.seed-name {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 650rpx;
		height: 200rpx;
		background-color: #fff;
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.3);
		border-radius: 20rpx;
	}

	.seed-name-box {
		position: relative;
		top: -100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

	.seed-message {
		width: 650rpx;
		min-height: 500rpx;
		background-color: #fff;
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.3);
		border-radius: 20rpx;
	}

	.seed-message-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.seed-img {
		width: 140rpx;
		height: 140rpx;
		border-radius: 20rpx;
	}

	#seed-name-box {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		width: 400rpx;
		height: 130rpx;
		margin: 30rpx;
	}

	.seed-english {
		font-size: 30rpx;
		height: 50rpx;
		color: #7a7a7a;
	}

	.seed-class {
		height: 50rpx;
	}

	.seed-other-name-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}

	.seed-other-name {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 40rpx;
		margin-left: 30rpx;
	}

	.seed-other-name>text {
		width: 540rpx;
	}

	#seed-image-box {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}

	.seed-other-name-text {
		font-size: 30rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
	}

	.seed-introduction-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}

	.seed-introduction-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 40rpx;
		margin-left: 30rpx;
	}

	.seed-introduction-box>text {
		width: 540rpx;
	}

	.seed-introduction {
		font-size: 30rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 40rpx;
	}

	.seed-introduction>text {
		line-height: 55rpx;
	}

	.toSelect {
		width: 300rpx;
		height: 100rpx;
		background: #ccc;
		border-radius: 50rpx;
		box-shadow: inset 0 -10rpx 20rpx rgba(255, 255, 255, 0.3),
			inset 0 10rpx 20rpx rgba(0, 0, 0, 0.3),
			0 8rpx 15rpx rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.toSelect>image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.toSelect>text {
		font-size: 30rpx;
		color: #8a8a8a;
	}

	.back {
		position: relative;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 750rpx;
		height: 200rpx;
		z-index: 11;
	}

	.toBack {
		width: 300rpx;
		height: 100rpx;
		background: linear-gradient(to right, #4caf50, #2e7d32);
		border-radius: 50rpx;
		box-shadow: inset 0 -10rpx 20rpx rgba(255, 255, 255, 0.3),
			inset 0 10rpx 20rpx rgba(0, 0, 0, 0.3),
			0 8rpx 15rpx rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.toBack>image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.toBack>text {
		font-size: 30rpx;
		color: #ffffff;
	}

	.goBack {
		position: fixed;
		top: 20rpx;
		left: 15rpx;
		width: 70rpx;
		height: 70rpx;
		z-index: 999;
	}
</style>