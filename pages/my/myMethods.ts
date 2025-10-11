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
	
	return { toHistory, toSeedManager }
}