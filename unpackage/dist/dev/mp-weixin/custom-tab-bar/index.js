Component({
	data: {
		selected: 0,
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
		}

	},
	onShow() {
		// 确保selected状态与当前页面一致
		this.setData({
			selected: this.data.selected
		})
	}
})