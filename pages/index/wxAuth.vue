<template>
	<view>
		
	</view>
</template>

<script>
	import { getQueryObject } from "@/utils/auth.js"
	import { getIsWxClient } from "@/utils/auth.js"
	import { getJson, postForm } from "@/utils/reuqest.js"
	export default {
		data() {
			return {
				code: ''
			}
		},
		onLoad(options) {
			console.log(options, location.href);
			let obj = getQueryObject(location.href);
			console.log(obj);
			uni.showLoading({title: '正在授权中...'});
			// 检查是否是微信环境
			if ( getIsWxClient() ) {
				if (!uni.getStorageSync('authInfo') || obj.code) {
					if (obj.code) {
						this.code = obj.code;
						// 通过code获取授权信息
						getJson( "/wx/getUserInfo", {
							code: obj.code
						}, data => {
							if( !data.result.openid ){
								return uni.showModal({
									title: 'openid接收异常'
								});
							}
							let authData = data.result;
							uni.setStorageSync("authInfo", JSON.stringify(authData));
							// 用openId获取用户信息
							getJson('/user/getUserByUid', {
								uid: authData.openid,
								unionid: authData.openid
							}, user => {
								if (user.result) { // 如果返回正常信息，回退上一级
									uni.navigateBack();
								} else { // 新用户创建后返回
									let query = {
										uid: authData.openid,
										unionid: authData.unionid || authData.openid
									}
									postForm('/user/insertUser', query, data => {
										uni.navigateBack();
									});
								}
							})
						});
					}else{
						let href = location.href
						// let href = 'https://xxxxxxxx.com';
						let url = href.split("#")[0] + "#/"
						let appid = "wx2c1526e9156667ef"; // 公众号的appid
						// 微信官方的授权链接
						let local = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
							appid + ///你APP申请的APPId，每个app都有个ID是识别你app的方式
							"&redirect_uri=" +
							encodeURIComponent(href) +
							"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"; //获取当前页面地址
						// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
						window.location.href = local
					}
				}else{
					//已完成授权成功
					uni.navigateBack();
				}
			} else {
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
