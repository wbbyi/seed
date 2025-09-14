<template>
	<view class="login-container">
		<view class="input-group">
			<input v-model="phone" type="number" placeholder="请输入手机号" />
		</view>

		<view class="input-group verify-group">
			<input v-model="code" type="number" placeholder="请输入验证码" />
			<button :disabled="countdown>0" @tap="getCode">
				{{ countdown > 0 ? countdown + 's' : '获取验证码' }}
			</button>
		</view>

		<button class="login-btn" @tap="login">
			登录
		</button>
	</view>
</template>


<script setup lang="ts">
	import { ref } from 'vue'

	const phone = ref('')
	const code = ref('')
	const countdown = ref(0)
	let timer : any = null

	// 获取验证码
	const getCode = () => {
		if (!/^1\d{10}$/.test(phone.value)) {
			uni.showToast({ title: '请输入正确手机号', icon: 'none' })
			return
		}

		// 向后台发送验证码请求
		uni.request({
			url: 'https://你的后台地址/sendCode',
			method: 'POST',
			data: { phone: phone.value },
			success: (res) => {
				uni.showToast({ title: '验证码已发送', icon: 'success' })
				startCountdown()
			}
		})
	}

	// 倒计时
	const startCountdown = () => {
		countdown.value = 60
		timer = setInterval(() => {
			countdown.value -= 1
			if (countdown.value <= 0) clearInterval(timer)
		}, 1000)
	}

	// 登录
	const login = () => {
		if (!/^1\d{10}$/.test(phone.value)) {
			uni.showToast({ title: '请输入正确手机号', icon: 'none' })
			return
		}
		if (!code.value) {
			uni.showToast({ title: '请输入验证码', icon: 'none' })
			return
		}

		// 向后台验证验证码并登录
		uni.request({
			url: 'https://你的后台地址/loginByPhone',
			method: 'POST',
			data: {
				phone: phone.value,
				code: code.value
			},
			success: (res) => {
				const data = res.data as { success: boolean; token?: string; message?: string }
				if (data.success) {
					uni.showToast({ title: '登录成功', icon: 'success' })
					uni.setStorageSync('token', data.token)
					uni.switchTab({ url: '/pages/index/index' })
				} else {
					uni.showToast({ title: data.message || '登录失败', icon: 'none' })
				}
			}
		})
	}
</script>


<style scoped>
	.login-container {
		padding: 40rpx;
	}

	.input-group {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		font-size: 60%;
	}

	.input-group input {
		flex: 1;
		height: 60rpx;
		padding: 0 20rpx;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
	}

	.verify-group button {
		margin-left: 10rpx;
		padding: 0 20rpx;
		height: 60rpx;
		background-color: #07c160;
		color: #fff;
		border-radius: 10rpx;
		font-size: 60%;
	}

	.login-btn {
		width: 100%;
		height: 60rpx;
		background-color: #07c160;
		color: #fff;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}
</style>