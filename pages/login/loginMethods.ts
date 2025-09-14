export function methods() {
	function login(isChecked : boolean, judge : boolean, url : string, method : any) {
		let check = <boolean[]>[]
		if (!isChecked) {
			judge = true
		}
		uni.login({
			provider: 'weixin',
			success: (res) => {
				console.log('登录成功，code:', res.code)

				// 发送 code 到后台服务器
				uni.request({
					url: url,
					method: method,
					data: { code: res.code },
					success: (res2) => {
						uni.getUserProfile({
							desc: "用于完善会员资料",
							success: (res) => {
								console.log('用户信息', res.userInfo)
								// res.userInfo.avatarUrl → 用户头像
								// res.userInfo.nickName → 昵称
								// 可以保存到页面数据或全局
								uni.setStorageSync('userInfo', res.userInfo)
							},
							fail: (err) => {
								console.log('用户拒绝授权', err)
							}
						})
						console.log('后台返回：', res2.data)
						// 保存返回的 token / openid 等信息
						uni.setStorageSync('userInfo', res2.data)

						uni.showToast({ title: '登录成功', icon: 'success' })

						// 跳转首页
						uni.switchTab({ url: '/pages/home/home' })
					},
					fail: (err2) => {
						console.log('请求失败', err2)
					}
				})
			},
			fail: (err) => {
				console.log('微信登录失败', err)
			}
		})
		check.push(isChecked, judge)
		return check
	}

	function phoneLogin(isChecked : boolean, judge : boolean){
		let check = <boolean[]>[]
		if (!isChecked) {
			judge = true
		}
		else {
			uni.navigateTo({
				url: '/pages/phoneLogin/phoneLogin'
			})
		}
		check.push(isChecked, judge)
		return check
	}

	return { login, phoneLogin }
}