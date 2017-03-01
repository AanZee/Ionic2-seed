/***************************************************
 * App settings for API, S3, GoogleAnalytics, etc. *
 ***************************************************/


var BASE_URL = "";

export let SETTINGS = {
	API_ENDPOINT : BASE_URL + '/mobile/index.cfm?act=',
	IMG_BASE_ENDPOINT   : '',
	IMG_BASE_PATH   	: '',
	OAUTH : {
		CONSUMER : {
			KEY : '',
			SECRET : ''
		},
		SIGNATURE_METHOD : 'HMAC-SHA1',
		VERSION : '1.0'
	},
	IMG_ENDPOINT : '',
	VIDEO_ENDPOINT : '',
	FILE_ENDPOINT : '',
	S3 : {
		ENDPOINT: '',
		ACCESSKEY: ''
	},
	GA_ID: '',
};
