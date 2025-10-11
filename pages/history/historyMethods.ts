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
		const start : Date = new Date(timeRange[0]);
		const end : Date = new Date(timeRange[1]);
		const dateList : Date[] = [];
		const userMessage : UserHistory[] = [];
		const dates : string[] = [];
		const tempDates : Date[] = [];
		let currentDate : Date = start;


		if (currentDate instanceof Date && end instanceof Date) {
			while (currentDate.getTime() <= end.getTime()) {
				tempDates.push(new Date (currentDate));
				currentDate.setDate(currentDate.getDate() + 1);
				console.log("currentDate---while", currentDate);
			}
		}

		for (let msg of tempDates) {
			let msgNum : number = msg.setTime(msg.getTime() - 8 * 60 * 60 * 1000);
			dateList.push(new Date(msgNum));
		}

		for (let i = 0; i < dateList.length; i++) {
			let str = dateList[i].getFullYear().toString() + "-" + (dateList[i].getMonth() + 1).toString() + "-"
				+ (dateList[i].getDate() < 10 ? ("0" + dateList[i].getDate().toString()) : dateList[i].getDate().toString());
			dates.push(str);
		}

		for (let i = 0; i < dates.length; i++) {
			for (let j = 0; j < userMessages.length; j++) {
				if (dates[i] === userMessages[j].name) {
					userMessage.push(userMessages[j]);
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