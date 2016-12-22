import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { SETTINGS } from '../app-settings';

@Injectable()
export class Oauth {

    constructor() { }

    parseUrl(url) {
        let urlParts = url.split('?');
        let baseUrl = urlParts[0];
        let params = {};

        if (urlParts.length > 1) {    
            let pairs = urlParts[1].split('&');
            for (let i=0; i<pairs.length; i++) {
                let pair = pairs[i].split('=');
                params[pair[0]] = pair[1] ? pair[1] : '';
            }
        }
        return { baseUrl: baseUrl, params: params };
    }

    combineHash(origHash, newHash): Object {
        let hashString = JSON.stringify(origHash);
        let hash = JSON.parse(hashString);
        
        for (let key in newHash) {
            hash[key] = newHash[key];
        }
        return hash;
    }

    generateOauthSignature(httpMethod, url, params):string {

        let baseString = '';
        baseString += httpMethod.toUpperCase();
        baseString += '&' + this.Rfc3986(url);
        baseString += '&' + this.Rfc3986(this.normalize(params));

        let signingKey = SETTINGS.OAUTH.CONSUMER.SECRET + '&';    //no need for TOKEN_SECRET

        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(baseString, signingKey));
    }

    normalize(params) {

        //sort the keys
        let sortedKeys = [];
        for (let key in params) {
	        if (params.hasOwnProperty(key)) {
			    let encodedKey = this.Rfc3986(key);
				sortedKeys.push(encodedKey);
			}
			sortedKeys.sort();
        }

        //concatenate
        let normalizedParameters = [];
        for (let i=0; i<sortedKeys.length; i++) {
            let key = decodeURIComponent(sortedKeys[i]);
		    normalizedParameters.push( key + '=' + params[key] );
		}
        return normalizedParameters.join('&'); 
    }

    Rfc3986(decoded) {
        if (!decoded) {
            return '';
        }
        return encodeURIComponent(decoded)
            .replace( /!/g,'%21' )
            .replace( /\*/g,'%2A' )
            .replace( /\(/g,'%28' )
            .replace( /\)/g,'%29' )
            .replace( /\'/g,'%27' );
	}

    addOauthParameters(): Object {
        let params = {};
        params['oauth_consumer_key'] = SETTINGS.OAUTH.CONSUMER.KEY;
        params['oauth_token'] = '';
        params['oauth_nonce'] = this.createNonce(32);
        params['oauth_signature_method'] = SETTINGS.OAUTH.SIGNATURE_METHOD;
        params['oauth_timestamp'] = Math.round((new Date()).getTime()  / 1000);
        params['oauth_version'] = SETTINGS.OAUTH.VERSION;
        return params;
    }

    createNonce (howMany): string {
        howMany = howMany || 32;
        let res = [];
        let chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    
        for (let i = 0; i < howMany; i++) {
            res.push(chars[Math.round((Math.random()*chars.length))]);
        };
    
        return res.join('');
    }
}