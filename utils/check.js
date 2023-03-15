// 邮箱校验 phone：手机号
export function isvalidPhone(phone) {
	const reg_phone = /^(1[3-9])\d{9}$/;
	return reg_phone.test(phone)
}

// 邮箱校验 email：邮箱地址
export function isvalidEmail(email) {
	let reg_email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return reg_email.test(email)
}

// 文本长度校验 sourceText： 校验文本  min：最小长度  max：最大长度
lengthCheck( sourceText, min, max) {
	return (sourceText.length > min && sourceText.length <= max) ? true : false;
},