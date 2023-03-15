<template>
	<view class="qrcode-index">
		<image class="qrcode" :src="qrCodeUrl" mode="aspectFill"></image>
		<view class="text">
			请关注“XXX信息技术有限公司”微信公众号进行认证”
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 替换为真实二维码
				qrCodeUrl: require("@/static/image/defaultScanImage.png"),
			}
		},
	}
</script>

<style lang="less" scoped>
	.qrcode-index{
		display: flex;
		height: 60vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		padding: 0 20px;
		box-sizing: border-box;
		text-align: center;
		.qrcode{
			width: 120px;
			height: 120px;
		}
		.text{
			margin-top: 20px;
			font-size: 16px;
		}
	}
</style>
