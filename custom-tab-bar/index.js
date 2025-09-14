Component({
	data: {
		selected: 0,
		userName: '',
		userImage: ''
	},
	lifetimes: {
		attached() {
			// 初始化时同步全局选中状态
			this.setData({
				selected: wx.$tabbarSelected || 0
			})
		},
		pageLifetimes: {
			show() {
				// 页面显示时再同步一次
				this.setData({
					selected: wx.$tabbarSelected || 0
				})
			}
		}
	},
	methods: {

		// judgeUserMessage() {
		// 	if (this.data.userImage === '' || this.data.userName === '') {
		// 		wx.navigateTo({
		// 			url: '/pages/login/login',
		// 			success: () => {
		// 				console.log('跳转成功')
		// 				wx.getUserProfile({
		// 					desc: '用于完善会员资料', // 必填，说明用途
		// 					success: (res) => {
		// 						console.log('用户信息：', res.userInfo)
		// 						// res.userInfo 包含：
		// 						// nickName：昵称
		// 						// avatarUrl：头像
		// 						// gender：性别
		// 						// province：省
		// 						// city：市
		// 						// country：国家
		// 						this.setData({
		// 							userName: res.userInfo.nickName,
		// 							userImage: res.userInfo.avatarUrl
		// 						})

		// 					},
		// 					fail: (err) => {
		// 						console.log('用户拒绝授权', err)
		// 					}
		// 				})
		// 			},
		// 			fail: () => {
		// 				console.log('跳转失败')
		// 			}
		// 		})

		// 	}
		// },

		switchTab(e) {
			const index = Number(e.currentTarget.dataset.index)
			// this.setData({
			// 	selected: index
			// })
			// 注意 path 与 pages.json 一致，去掉前置 /
			const path = index === 0 ? '/pages/home/home' : '/pages/my/my'
			console.log(path)
			wx.switchTab({
				url: path
			})
		},
		handleCenterTap() {

			console.log('中间按钮点击了')

			const pages = getCurrentPages()
			if (!pages || pages.length === 0) return

			const page = pages[pages.length - 1]

			// 调用页面注册的 openPopup 方法
			page.openPopup?.()
		},

	},
	onShow() {
		// 确保selected状态与当前页面一致
		this.setData({
			selected: this.data.selected,
			userImage: this.data.userImage,
			userName: this.data.userName
		})
	}
})