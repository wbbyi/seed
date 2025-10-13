export function methods(){
	
	function toHistory(){
		uni.navigateTo({
			url:"/pages/history/history"
		});
	}
	
	function toSeedManager(){
		uni.navigateTo({
			url:"/pages/history/history"
		});
	}
	
	function updateUserText(userText : string) : string{
		uni.setStorageSync("userText", userText);
		return uni.getStorageSync("userText");
	}
	
	return { toHistory, toSeedManager, updateUserText }
}