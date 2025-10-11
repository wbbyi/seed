<template id="box">
	<view class="user-card">
		<view class="user-message">
			<view class="message-img">
				<image class="message-img" src="/static/logo.png" mode="widthFix"></image>
			</view>
			<view class="user-detail-message">
				<view class="detail">
					<text class="detail-text">农作物</text>
					<text class="num">{{ cropNum }}</text>
				</view>
				<view class="detail">
					<text class="detail-text">其它</text>
					<text class="num">{{ otherNum }}</text>
				</view>
				<view class="detail">
					<text class="detail-text">识别次数</text>
					<text class="num">{{ allSelectNum }}</text>
				</view>
			</view>
		</view>
		<view class="toUser">
			<text class="message-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ userName }}</text>
			<text
				class="system-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ systemText }}</text>
		</view>
	</view>
	<view class="select-time">
		<view class="example-body">
			<uni-datetime-picker v-model="range" type="daterange" @change="selectByTime" @maskClick="maskClick"/>
		</view>
	</view>
	<view class="no-history" v-if="selectNum === 0">
		<image src="/static/history.png" mode="aspectFit"></image>
		<text> 暂时没有识别记录，快去拍照上传试试吧</text>
	</view>
	<view v-else>
		<view class="history-box" v-for="(item, index) in seedHistorys" :key="index" @click="detail(item.resultName)">
			<uni-card class="seed-history-card" :title="item.resultName + '(' + item.seedClass + ')'" :extra="item.name">
				<view class="card-content">
					{{ item.resultDes }}
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { UserHistory } from "./historyClass";
	import { methods } from "./historyMethods";



	let { getHistory, selectUserHistoryByTime, toDetail } = methods();
	let allSeedHistorys : UserHistory[] = [];
	const seedHistorys = ref(<UserHistory[]>[]);
	// _id : string
	// image : File
	// name : string
	// resultName : string
	// resultRate : number
	// resultDes : string
	const cropNum = ref(2);
	const otherNum = ref(3);
	const selectNum = ref();
	const range = ref<Date[]>([]);
	const allSelectNum = ref()
	const app = getApp();
	const userUID = app.globalData.userUID;
	const userName = "hello";
	const systemText = ref('我们为您记录近一年种子日记，珍藏绿意时光！');


	const history = async () => {
		allSeedHistorys = await getHistory();
		seedHistorys.value = allSeedHistorys;
		selectNum.value = seedHistorys.value.length;
		allSelectNum.value = seedHistorys.value.length;
	}
	
	const selectByTime = (res: any) => {
		if (res.length == 0){
			history();
		}
		console.log(res);
		seedHistorys.value = selectUserHistoryByTime(res, allSeedHistorys);
		selectNum.value = seedHistorys.value.length;
	}
	
	const detail = (name : string) => {
		for (let i = 0; i < allSeedHistorys.length; i++){
			if (allSeedHistorys[i].resultName == name){
				toDetail(allSeedHistorys[i]);
				break;
			}
		}
	}
	
	const maskClick = () => {
		history();
	}

	onMounted(() => {
		history()
	})
</script>

<style scoped>
	#box {
		display: flex;
	}

	.user-card {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		height: 350rpx;
	}

	.user-message {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 750rpx;
		height: 60%;
	}

	.message-img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30%;
		height: 100%;
	}

	.user-detail-message {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 70%;
		height: 100%;
	}

	.detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30%;
		height: 100%;
	}

	.toUser {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
		height: 40%;
	}

	.system-text {
		font-size: 0.7rem;
		color: dimgrey;
	}

	.no-history {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 750rpx;
		height: 700rpx;
	}

	.no-history image {
		size: 80%;
	}

	.no-history text {
		color: dimgrey;
		font-size: 0.8rem;
	}

	.history-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.seed-history-card {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 700rpx;
		min-height: 400rpx;
	}

	.card-content {
		height: auto;
		font-size: 12px;
		/* 缩小字体 */
		padding: 4px 8px;
		/* 减少内边距 */
		line-height: 1.2;
		/* 调整行高 */
		color: #666;
		/* 可选：改变颜色让它不那么显眼 */
	}
	
	.example-body{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 650rpx;
		height: 100rpx;
	}
	
	.select-time{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 100rpx;
	}
</style>