<template>
	<view class="user-box">
		<view class="user-image-box">
			<image class="user-image" src="/static/logo.png" mode="widthFix"></image>
		</view>
		<view class="user-message-box">
			<view class="user-message">
				<view class="user-name">
					userName
				</view>
				<view class="user-uid">
					userUID
				</view>
				<view class="user-nums">
					识别次数：
				</view>
			</view>
		</view>
	</view>
<!-- 	<view class="black-part-box">
		<view class="black-part">
		</view>
	</view> -->
	<view class="function-box">
		<view class="function">
			<view class="func-text-box">
				<text>常用功能</text>
			</view>
			<view class="func-box">
				<view class="func-image-box1">
					<image class="func-image1" src="/static/select.png" mode="widthFix"></image>
					<text class="image-text">探索植物</text>
				</view>
				<view class="func-image-box2">
					<image class="func-image2" src="/static/angleBracket.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="func-box" @click="onHistory">
				<view class="func-image-box1">
					<image class="func-image1" src="/static/identify.png" mode="widthFix"></image>
					<text class="image-text">识别记录</text>
				</view>
				<view class="func-image-box2">
					<image class="func-image2" src="/static/angleBracket.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="func-box">
				<view class="func-image-box1">
					<image class="func-image1" src="/static/program.png" mode="widthFix"></image>
					<text class="image-text">常见问题</text>
				</view>
				<view class="func-image-box2">
					<image class="func-image2" src="/static/angleBracket.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="func-box">
				<view class="func-image-box1">
					<image class="func-image1" src="/static/getPhone.png" mode="widthFix"></image>
					<text class="image-text">联系客服</text>
				</view>
				<view class="func-image-box2">
					<image class="func-image2" src="/static/angleBracket.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="func-box">
				<view class="func-image-box1">
					<image class="func-image1" src="/static/join.png" mode="widthFix"></image>
					<text class="image-text">加入我们</text>
				</view>
				<view class="func-image-box2">
					<image class="func-image2" src="/static/angleBracket.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { methods } from "./myMethods"

    let { toHistory } = methods();
	let userName = ref('');
	let userUID = ref('');
	
	const onHistory = () => {
		toHistory();
	};
</script>

<style scoped>
	. {
		margin: 0;
	}

	.user-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.user-image-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200rpx;
		height: 200rpx;
	}

	.user-message-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 550rpx;
		height: 200rpx;
	}

	.user-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.user-message {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		width: 500rpx;
		height: 130rpx;
	}

	.user-name {
		display: flex;
		justify-content: left;
		align-items: center;
		height: 60rpx;
	}

	.user-uid {
		display: flex;
		justify-content: left;
		align-items: center;
		font-size: 30rpx;
		color: #bfbfbf;
		height: 60rpx;
	}

	.user-nums {
		display: flex;
		justify-content: left;
		align-items: center;
		height: 60rpx;
	}

	.function {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 700rpx;
		height: 710rpx;
		background-color: #fff;
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.3);
		border-radius: 20rpx;
	}

	.black-part {
		width: 700rpx;
		height: 180rpx;
		background-color: #3d3e55;
		border-radius: 10rpx;
		margin: 20rpx;
	}

	.black-part-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.function-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.func-text-box {
		font-size: 30rpx;
		color: #000000;
		margin-top: 30rpx;
		margin-left: 35rpx;
	}

	.func-box {
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		width: 700rpx;
		height: 100rpx;
		border-bottom: black;
	}

	.func-image-box1 {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200rpx;
		height: 100rpx;
	}

	.func-image-box2 {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 350rpx;
		height: 100rpx
	}

	.func-image1 {
		width: 30rpx;
		height: 30rpx;
	}

	.func-image2 {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
	}

	.image-text {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		width: 160rpx;
		height: 100rpx;
	}
</style>