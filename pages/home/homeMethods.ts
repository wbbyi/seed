export default function methods() {
	function chooseImage(type : number, num : number) : Promise<string[]> {
		const types = ['camera', 'album']
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: num,
				sourceType: [types[type]],
				success: (res) => resolve(res.tempFilePaths as string[]),
				fail: (err) => reject(err)
			})
		})
	}
	return { chooseImage }
}