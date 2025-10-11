<template>
	<view>
		<uni-search-bar @confirm="onConfirm"></uni-search-bar>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'process';
	import { methods } from './seedManagerMethods';

	let { search }  = methods();
	
	
	const onConfirm = (res: string) =>{
		search(res);
	}
</script>

<style scoped>

</style>