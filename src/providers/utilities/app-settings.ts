/***************************************************
 * App settings for API, S3, GoogleAnalytics, etc. *
 ***************************************************/


import { Injectable } from '@angular/core';

@Injectable()
export class Settings {
	private static readonly baseUrl: string = '';

	public static readonly apiEndpoint: string = Settings.baseUrl + '/mobile/index.cfm?act=';
	public static readonly imgBaseEndpoint: string = '';
	public static readonly imgBasePath: string = '';
	public static readonly oAuth: any = {
		consumer: {
			key: '',
			secret: ''
		},
		signatureMethod: 'HMAC-SHA1',
		version: '1.0'
	};
	public static readonly imgEndpoint: string = '';
	public static readonly videoEndpoint: string = '';
	public static readonly fileEndpoint: string = '';
	public static readonly s3: any = {
		endpoint: '',
		accesskey: ''
	};
	public static readonly gaId: string = '';
}
