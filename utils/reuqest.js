let baseURL = 'https://team-api.yanhengzj.com';
if(process.env.NODE_ENV === 'development'){// 开发环境
	baseURL = 'http://192.168.1.76:7021';
}else{ // 生产环境
	baseURL = 'https://team-api.yanhengzj.com';
}
export const BaseUrl = baseURL;

export const fileUploadUrl = baseURL;

const defaultErrorCallback = (error) => {
	console.error(error)
}

export const getJson = (url, params, callback = () => {}, errcallback = defaultErrorCallback) => {
	if (url.indexOf('http') < 0) {
		url = baseURL + url
	}
	uni.request({
		url,
		method: 'GET',
		data: params,
		header: {},
		success: (res) => {
			callback && callback(res.data)
		},
		fail: (res) => {
			errcallback && errcallback(res.data)
		}
	});
}

export const postJson = (url, params, callback = () => {}, errcallback = defaultErrorCallback) => {
	if (url.indexOf('http') < 0) {
		url = baseURL + url
	}
	uni.request({
		url,
		method: 'POST',
		data: params,
		header: {},
		success: (res) => {
			console.log(url, params,res.data)
			callback && callback(res.data)
		},
		fail: (res) => {
			errcallback && errcallback(res.data)
		}
	});
}

export const postForm = (url, params, callback = () => {}, errcallback = defaultErrorCallback) => {
	if (url.indexOf('http') < 0) {
		url = baseURL + url
	}
	uni.request({
		url,
		method: 'POST',
		data: params,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		success: (res) => {
			console.log(url, params,res.data)
			callback && callback(res.data)
		},
		fail: (res) => {
			errcallback && errcallback(res.data)
		}
	});
}


export const putForm = (url, params, callback = () => {}, errcallback = defaultErrorCallback) => {
	if (url.indexOf('http') < 0) {
		url = baseURL + url
	}
	uni.request({
		url,
		method: 'PUT',
		data: params,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		success: (res) => {
			console.log(url, params,res.data)
			callback && callback(res.data)
		},
		fail: (res) => {
			errcallback && errcallback(res.data)
		}
	});
}

export const deleteForm = (url, params, callback = () => {}, errcallback = defaultErrorCallback) => {
	if (url.indexOf('http') < 0) {
		url = baseURL + url
	}
	uni.request({
		url,
		method: 'DELETE',
		data: params,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		success: (res) => {
			console.log(url, params, res.data)
			callback && callback(res.data)
		},
		fail: (res) => {
			errcallback && errcallback(res.data)
		}
	});
}
// 获取手机号
export const getPhoneNum = (e,callback)=>{
	const {
		iv,
		encryptedData,
		code
	} = e.detail
	getJson('/wx/getPhone', {
		code: code,
		type: 1
	}, (data) => {
		console.log(data)
		if(data.errcode==0){
			callback&&callback({
				code: 200,
				data:data.phone_info
			})
		}else{
			uni.showToast({
				title: '请求失败',
				duration: 2000,
				icon: 'none'
			})
		}
		
	},err=>{
		uni.showToast({
			title: '请求失败',
			duration: 2000,
			icon: 'none'
		})
	})
}