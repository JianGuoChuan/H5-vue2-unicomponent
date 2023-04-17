<template>
	<view>
		
	</view>
</template>

<script>
	// getIsWxClient: 判断是否是微信环境
	import { getIsWxClient } from "@/utils/auth.js"
	import { fenToYuan } from "@/utils/index.js"
	import { getJson } from "@/utils/reuqest.js"
	export default {
		data() {
			return {
				isWxMustEnvironment: false, // 是否必须微信中打开
			}
		},
		onLoad() {
			if(!this.isWxMustEnvironment){
				console.log('非微信环境');
				return
			}
			// 检查是否是微信环境
			if(getIsWxClient()){
				// 检查本地是否存在授权内容
				if ( !uni.getStorageSync('authInfo') ) {
					console.log('---没有授权---')
					return uni.redirectTo({
						url: "/pages/index/wxAuth"
					});
				}
				// 已授权过用户直接获取用户信息
				const authInfo = JSON.parse(uni.getStorageSync('authInfo'))
				getJson('/user/getUserByUid', {
					uid: authInfo.openid,
					unionid: authInfo.openid
				}, data => {});
			}else{
				// 非微信环境跳转授权页
				return uni.redirectTo({
					url: "/pages/index/wxtips"
				});
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
