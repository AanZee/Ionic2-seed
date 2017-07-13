import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { Settings } from '../app-settings';

@Injectable()
export class Oauth {

	constructor(
		private settings: Settings,
	) {}

	parseUrl(url: string): any {
		let urlParts: string[] = url.split('?');
		let baseUrl: string = urlParts[0];
		let params: any = {};

		if (urlParts.length > 1) {
			let pairs: string[] = urlParts[1].split('&');
			for (let i: number = 0; i < pairs.length; i++) {
				let pair: string[] = pairs[i].split('=');
				params[pair[0]] = pair[1] ? pair[1] : '';
			}
		}
		return { baseUrl: baseUrl, params: params };
	}

	combineHash(origHash: Object, newHash: Object): Object {
		return {
			...origHash,
			...newHash
		};
	}

	generateOauthSignature(httpMethod: string, url: string, params: any): string {
		let baseString: string = '';
		baseString += httpMethod.toUpperCase();
		baseString += '&' + this.Rfc3986(url);
		baseString += '&' + this.Rfc3986(this.normalize(params));

		let signingKey: string = this.settings.oAuth.consumer.secret + '&'; // No need for TOKEN_SECRET

		return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(baseString, signingKey));
	}

	normalize(params: any): string {
		//sort the keys
		let sortedKeys: any[] = [];
		for (let key in params) {
			if (params.hasOwnProperty(key)) {
				let encodedKey: string = this.Rfc3986(key);
				sortedKeys.push(encodedKey);
			}
			sortedKeys.sort();
		}

		// Concatenate
		let normalizedParameters: string[] = [];
		for (let i: number = 0; i < sortedKeys.length; i++) {
			let key: string = decodeURIComponent(sortedKeys[i]);
			normalizedParameters.push( key + '=' + params[key] );
		}
		return normalizedParameters.join('&');
	}

	Rfc3986(decoded: string): string {
		if (!decoded) {
			return '';
		}
		return encodeURIComponent(decoded)
		.replace(/!/g, '%21')
		.replace(/\*/g, '%2A')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\'/g, '%27');
	}

	addOauthParameters(): Object {
		let params: any = {};
		params['oauth_consumer_key'] = this.settings.oAuth.consumer.key;
		params['oauth_token'] = '';
		params['oauth_nonce'] = this.createNonce(32);
		params['oauth_signature_method'] = this.settings.oAuth.signatureMethod;
		params['oauth_timestamp'] = Math.round((new Date()).getTime() / 1000);
		params['oauth_version'] = this.settings.oAuth.version;
		return params;
	}

	createNonce(howMany: number): string {
		howMany = howMany || 32;
		let res: string[] = [];
		let chars: string = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';

		for (let iterator: number = 0; iterator < howMany; iterator++) {
			res.push(chars[Math.round((Math.random() * chars.length))]);
		}
		return res.join('');
	}
}
