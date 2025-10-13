export function methods(){
	
	function comeBack(){
		uni.switchTab({
			url:"/pages/home/home"
		});
	}
	const logRawData = (data: any) => {
    console.log('原始检测数据:', data);
    // 如果需要存储到本地
    try {
      uni.setStorageSync('lastRawDetectionData', data);
    } catch (e) {
      console.error('存储原始数据失败:', e);
    }
  };

  return { comeBack, logRawData };
}