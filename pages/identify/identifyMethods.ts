export function methods(){
	
	function comeBack(){
		uni.switchTab({
			url:"/pages/my/my"
		});
	}
	
	return { comeBack }
}