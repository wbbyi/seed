<template>
	<view class="logo-box">
		<view class="logo-image">
			<image class="logo" src="/static/logo.png" mode="widthFix"></image>
		</view>
		<view class="user-button-box">
			<button class="user-button1" @click="onLogin()">微信登录</button>
			<button class="user-button2" @click="onPhoneLogin">手机号登录</button>
		</view>
	</view>
	<view class="checkbox-wrapper" @tap="toggleCheck">
		<view class="checkbox-box" :class="{ checked: isChecked }"></view>
		<view class="checkbox-text">
			我已阅读并同意用户须知
			<view>
				<text class="tip" v-if="judge">请先勾选同意</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { methods } from '@/pages/login/loginMethods'
	import { baseUrl } from '@/url/url'

	let { login, phoneLogin } = methods()
	const isChecked = ref(false)
	const judge = ref(false)
	let check = <boolean[]>[]
	let url = ''
	let method = 'post'



	const toggleCheck = () => {
		isChecked.value = !isChecked.value
	}
	
	const onLogin = () => {
		check = login(isChecked.value, judge.value, baseUrl, method)
		isChecked.value = check[0]
		judge.value = check[1]
	}
	
	const onPhoneLogin = () => {
		let check = phoneLogin(isChecked.value, judge.value)
		isChecked.value = check[0]
		judge.value = check[1]
	}
	
	console.log(judge.value)
</script>

<style scoped>
	.logo-box {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 750rpx;
		height: 650rpx;
	}

	.logo-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 60%;
	}

	.logo {
		width: 20%;
		height: 20%;
	}

	.user-button-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		width: 750rpx;
		height: 40%;
	}

	.user-button1 {
		background-color: #00aa7f;
		color: white;
		width: 700rpx;
		height: 90rpx;
		margin: 0;
		padding: 0;
	}

	.user-button2 {
		width: 700rpx;
		height: 90rpx;
		margin: 0;
		padding: 0;
	}

	.checkbox-wrapper {
		display: flex;
		align-items: flex-start;
		/* 让多行文字顶部对齐方框 */
		cursor: pointer;
	}

	.checkbox-box {
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid #ccc;
		border-radius: 50%;
		/* 圆形方框 */
		margin-right: 10rpx;
		/* 方框与文字间距 */
		position: relative;
		flex-shrink: 0;
		/* 保持方框不缩小 */
	}

	/* 选中状态 */
	.checkbox-box.checked {
		background-color: #07c160;
		border-color: #07c160;
	}

	.checkbox-box.checked::after {
		content: '✔';
		color: #fff;
		position: absolute;
		top: 0;
		left: 6rpx;
		font-size: 24rpx;
	}

	.checkbox-text {
		flex: 1;
		/* 文字占满剩余空间 */
		line-height: 30rpx;
		/* 可调整文字行高 */
		word-break: break-word;
		/* 自动换行 */
		font-size: 60%;
		color: dimgrey;
	}

	.tip {
		color: red;
		font-size: 60%;
	}
</style>