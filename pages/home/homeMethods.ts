export default function methods() {
	function chooseImage(type : number, num : number) : string[]{
		const types : string[] = ['camera', 'album']
		let imageSrc : string[] = []
		if (type === 0) {
			uni.chooseImage({
				count: num,
				sourceType: [types[type]],
				success: (res) => {
					imageSrc[0] = res.tempFilePaths[0]
				},
				fail: (err) => {
					console.log('选择图片失败', err)
				}
			})
		}
		else {
			uni.chooseImage({
				count: num,
				sourceType: [types[type]],
				success: (res) => {
					imageSrc = res.tempFilePaths as string[];
				},
				fail: (err) => {
					console.log('选择图片失败', err)
				}
			})
		}
		return imageSrc
	}
	return { chooseImage }
}