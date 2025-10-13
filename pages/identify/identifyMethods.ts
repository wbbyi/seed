export function methods(){
	
	function comeBack(){
		uni.switchTab({
			url:"/pages/home/home"
		});
	}
	
	return { comeBack }
}