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
		const start : Date = timeRange[0];
		const end : Date = timeRange[1];
		let current : Date = new Date(start);
		const dateList : Date[] = [];
		const userMessage : UserHistory[] = [];
		const dates : string[] = [];


		if (current instanceof Date) {
			while (current.getDate() <= new Date(end).getDate()) {
				let tempTime : number = current.setTime(current.getTime() - 8 * 60 * 60 * 1000);
				const date = new Date(tempTime);
				dateList.push(date);
				current.setDate(current.getDate() + 1);
			}
		}

		for (let i = 0; i < dateList.length; i++) {
			let str = dateList[i].getFullYear().toString() + "-" + (dateList[i].getMonth() + 1).toString() + "-"
				+ (dateList[i].getDate() < 10 ? ("0" + dateList[i].getDate().toString()) : dateList[i].getDate().toString());
			dates.push(str);
		}

		console.log("timeRange[0]:", timeRange[0]);
		console.log("dateList:", dateList);
		console.log("start:", start);
		console.log("current:", current)
		console.log("current type:", current instanceof Date)
		console.log("current-type", typeof current)
		console.log("dateList[0].getDate()", dateList[0].getDate())
		console.log("dates", dates)

		for (let i = 0; i < userMessages.length; i++) {
			for (let j = 0; j < dateList.length; j++) {
				if (dates[j] === userMessages[i].name) {
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