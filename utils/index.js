/* 表单序列化：对象形式返回地址中携带的参数 */
export const getQueryObject = function (url) {
	url = url == null ? window.location.href : url
	const search = url.substring(url.lastIndexOf('?') + 1)
	const obj = {}
	const reg = /([^?&=]+)=([^?&=]*)/g
	search.replace(reg, (rs, $1, $2) => {
		const name = decodeURIComponent($1)
		let val = decodeURIComponent($2)
		val = String(val)
		obj[name] = val
		return rs
	})
	return obj
}

// 自定义脱敏 str：文本	frontLen：前面显示的文本位数	endLen：后面显示的文本位数
export const plusXing = function (str, frontLen, endLen) {
	str = str.replace(/\s/g, "");
	if (str.length == 2) {
		return str.substring(0, frontLen) + '*'
	}
	if (str.length <= (frontLen + endLen)) {
		return str.substring(0, frontLen) + '*'
	}
	var len = str.length - frontLen - endLen;
	var xing = '';
	for (var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

//金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
export const fenToYuan = function (val) {
	var str = (val/100).toFixed(2) + '';
	var intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
	var dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
	var ret = intSum + dot;
	return ret;
}

// 千位分隔符 1234.01 => 1,234.01
export const moneyFormat = function (money) {
	const integer = money.split('.')[0];
	const decimal = money.split('.')[1];
	if(decimal){
		return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}
	return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.00'
}

// 分数格式化 5 => 5.0
export const scoreFormat = function (score) {
	const scoreValue = score.toString();
	if( scoreValue.split('.').length <= 1 ){
		return scoreValue + '.0';
	}
	return scoreValue
}

// 生成一个随机Id
export const getID = function(){
   return Number(Math.random().toString().substr(2) + Date.now()).toString(36)
}
