import { UserHistory } from './historyClass'
import {
	addData,
	getData,
	updateData,
	deleteData,
	getOpenId,
	uploadImageToCloud
}
	from "../../utils/db.js"


export function methods() {

	async function getHistory() : Promise<UserHistory[]> {
		let seedData = <UserHistory[]>[];
		let openID = getOpenId('seedHistory');
		let res = await getData('seedHistory', { _id: openID });
		seedData = res.data;
		console.log("res.data", res.data);
		console.log("seedData", seedData);
		return seedData
	}

	function selectUserHistoryByTime(timeRange : Date[], userMessages : UserHistory[]) : UserHistory[] {
		let start = new Date(timeRange[0]);
		let end = new Date(timeRange[1]);
		let current : Date = start
		const dateList : Date[] = []
		const userMessage : UserHistory[] = []

		while (current <= end) {
			dateList.push(current);
			current.setDate(current.getDate() + 1);
		}

		for (let i = 0; i < userMessages.length; i++) {
			for (let j = 0; j < dateList.length; j++) {
				if (dateList[j].toString() == userMessages[i].name) {
					userMessage.push(userMessages[i]);
				}
			}
		}

		return userMessage;
	}


	function toDetail(seedHistory : UserHistory) {
		uni.navigateTo({
			url: '/pages/identify/identify?data=' + encodeURIComponent(JSON.stringify(seedHistory))
		});
	}

	return { getHistory, selectUserHistoryByTime, toDetail }
}