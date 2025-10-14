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
	
	function updateUserText(userText : string) {
		uni.setStorageSync("userText", userText);
	}
	
	return { toHistory, toSeedManager, updateUserText }
}