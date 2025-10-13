<template>
	<view>
<!-- 		<uni-search-bar @confirm="onConfirm"></uni-search-bar>
		<view class="select-history-box" v-if="historyNum != 0">
			<text>历史搜索:</text>
			<view class="guess-box" v-for="(item, index) in seedMessages">
				<view class="guess-card">
					<text class="guess-text">
						{{ item }}
					</text>
				</view>
			</view>
			</view> -->
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'process';
	import { methods } from './seedManagerMethods';

	let { search }  = methods();
	let seedMessages = [];
	let historyNum = ref('0')
	
	
	
	const onConfirm = (res: string) =>{
		search(res);
	}
</script>

<style scoped>
/* 	.guess-card{
		width: 300rpx;
		height: 100rpx;
		background: white;
		border-radius: 50rpx;
		box-shadow: inset 0 -10rpx 20rpx rgba(255, 255, 255, 0.3),
			inset 0 10rpx 20rpx rgba(0, 0, 0, 0.3),
			0 8rpx 15rpx rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
	} */
</style>