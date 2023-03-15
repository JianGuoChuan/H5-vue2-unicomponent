/* 判断是否是微信环境 */
 export function getIsWxClient() {
 	var ua = navigator.userAgent.toLowerCase();
 	if (ua.match(/MicroMessenger/i) == "micromessenger") {
 		return true;
 	}
 	return false;
 };

