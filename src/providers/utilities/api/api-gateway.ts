import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { LoadingController, Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Oauth } from './oauth';
import { AuthToken } from './auth-token';

export class ApiGatewayOptions {
	method: RequestMethod;
	url: string;
	headers: any;
	params: any = {};
	data: any = {};
}

@Injectable()
export class ApiGateway {
	// Define the internal Subject we'll use to push errors
	private errorsSubject: Subject<any> = new Subject<any>();

	// Define the internal Subject we'll use to push the command count
	private pendingCommandsSubject: Subject<number> = new Subject<number>();
	private pendingCommandCount: number = 0;

	private pendingRequestsCount: number = 0;
	private loader: Loading;

	// Provide the *public* Observable that clients can subscribe to
	public errorsObservable: Observable<any>;

	// Provide the *public* Observable that clients can subscribe to
	public pendingCommandsObservable: Observable<number>;

	constructor(
		private http: Http,
		private loadingCtrl: LoadingController,
		private oauth: Oauth,
		private authToken: AuthToken,
	) {
		// Create our observables from the subjects
		this.errorsObservable = this.errorsSubject.asObservable();
		this.pendingCommandsObservable = this.pendingCommandsSubject.asObservable();
	}

	// I perform a GET request to the API, appending the given params
	// as URL search parameters. Returns a stream.
	public get(url: string, params: any, hideLoader?: boolean): Observable<any> {
		let options: ApiGatewayOptions = new ApiGatewayOptions();
		options.method = RequestMethod.Get;
		options.url = url;
		options.params = params;

		return this.request(options, hideLoader);
	}


	// I perform a POST request to the API. If both the params and data
	// are present, the params will be appended as URL search parameters
	// and the data will be serialized as a JSON payload. If only the
	// data is present, it will be serialized as a JSON payload. Returns
	// a stream.
	public post(url: string, params: any, data: any, hideLoader?: boolean): Observable<any> {
		if (!data) {
			data = params;
			params = {};
		}
		let options: ApiGatewayOptions = new ApiGatewayOptions();
		options.method = RequestMethod.Post;
		options.url = url;
		options.params = params;
		options.data = data;

		return this.request(options, hideLoader);
	}


	// I perform a PUT request to the API. If both the params and data
	// are present, the params will be appended as URL search parameters
	// and the data will be serialized as a JSON payload. If only the
	// data is present, it will be serialized as a JSON payload. Returns
	// a stream.
	public put(url: string, params: any, data: any, hideLoader?: boolean): Observable<any> {
		if (!data) {
			data = params;
			params = {};
		}
		let options: ApiGatewayOptions = new ApiGatewayOptions();
		options.method = RequestMethod.Put;
		options.url = url;
		options.params = params;
		options.data = data;
		return this.request(options, hideLoader);
	}


	// I perform a DELETE request to the API. If both the params and data
	// are present, the params will be appended as URL search parameters
	// and the data will be serialized as a JSON payload. If only the
	// data is present, it will be serialized as a JSON payload. Returns
	// a stream.
	public delete(url: string, params: any, data: any, hideLoader?: boolean): Observable<any> {
		if (!data) {
			data = params;
			params = {};
		}
		let options: ApiGatewayOptions = new ApiGatewayOptions();
		options.method = RequestMethod.Delete;
		options.url = url;
		options.params = params;
		options.data = data;

		return this.request(options, hideLoader);
	}


	private request(options: ApiGatewayOptions, hideLoader?: boolean): Observable<any> {
		options.method = (options.method || RequestMethod.Get);
		options.url = (options.url || '');
		options.headers = (options.headers || {});
		options.params = (options.params || {});
		options.data = (options.data || {});

		//add required Oauth parameters
		let oauthParams: any = this.oauth.addOauthParameters();
		for (let key in oauthParams) {
			if (oauthParams.hasOwnProperty(key)) {
				options.params[key] = oauthParams[key];
			}
		}

		//calculate signature and add to params
		let parsedUrl: any = this.oauth.parseUrl(options.url);
		options.params['oauth_signature'] = this.oauth.generateOauthSignature(
			RequestMethod[options.method],
			parsedUrl.baseUrl,
			this.oauth.combineHash(options.params, parsedUrl.params),
		);

		this.interpolateUrl(options);
		//this.addXsrfToken(options);
		this.addContentType(options);

		let requestOptions: RequestOptions = new RequestOptions();
		requestOptions.method = options.method;
		requestOptions.url = options.url;
		requestOptions.headers = options.headers;
		requestOptions.search = this.buildUrlSearchParams(options.params);
		requestOptions.body = JSON.stringify(options.data);

		let token: string = this.authToken.getToken();
		if (token) {
			requestOptions.headers['Authorization'] = 'Bearer ' + token;
		}

		let isCommand: boolean = (options.method !== RequestMethod.Get);

		if (isCommand) {
			this.pendingCommandsSubject.next(++this.pendingCommandCount);
		}

		if (this.pendingRequestsCount === 0) {
			if (!hideLoader && !this.loader) {
				this.loader = this.loadingCtrl.create({
					showBackdrop: false,
					spinner: 'circles',
					duration: 15000,
				});
				this.loader.present();
			}
		}
		this.pendingRequestsCount++;

		let stream: Observable<any> = this.http.request(options.url, requestOptions)
		.catch((error: any) => {
			this.errorsSubject.next(error);
			return Observable.throw(this.unwrapHttpError(error));
		})
		.map(this.unwrapHttpValue)
		.catch((error: any) => {
			return Observable.throw(error);
		})
		.finally(() => {
			this.pendingRequestsCount--;
			if (this.pendingRequestsCount === 0) {
				if (!hideLoader) {
					this.loader.dismiss().then(() => {
						this.loader = null;
					});
				}
			}
			if (isCommand) {
				this.pendingCommandsSubject.next(--this.pendingCommandCount);
			}
		});

		return stream;
	}

	private addContentType(options: ApiGatewayOptions): ApiGatewayOptions {
		if (options.method !== RequestMethod.Get) {
			options.headers['Content-Type'] = 'application/json; charset=UTF-8';
		}
		return options;
	}

	private extractValue(collection: any, key: string): any {
		let value: any = collection[key];
		delete (collection[key]);
		return value;
	}

	/*
	private addXsrfToken(options: ApiGatewayOptions): ApiGatewayOptions {
		let xsrfToken = this.getXsrfCookie();
		if (xsrfToken) {
			options.headers["X-XSRF-TOKEN"] = xsrfToken;
		}
		return options;
	}
	*/

	/*
	private getXsrfCookie(): string {
		let matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
		try {
			return (matches && decodeURIComponent(matches[1]));
		} catch (decodeError) {
			return ("");
		}
	}
	*/

	private buildUrlSearchParams(params: any): URLSearchParams {
		let searchParams: URLSearchParams = new URLSearchParams();
		for (let key in params) {
			searchParams.append(key, params[key]);
		}
		return searchParams;
	}

	private interpolateUrl(options: ApiGatewayOptions): ApiGatewayOptions {
		options.url = options.url.replace(
			/:([a-zA-Z]+[\w-]*)/g,
			($0: string, token: string) => {
				// Try to move matching token from the params collection.
				if (options.params.hasOwnProperty(token)) {
					return (this.extractValue(options.params, token));
				}
				// Try to move matching token from the data collection.
				if (options.data.hasOwnProperty(token)) {
					return (this.extractValue(options.data, token));
				}
				// If a matching value couldn't be found, just replace
				// the token with the empty string.
				return ('');
			},
		);
		// Clean up any repeating slashes.
		//options.url = options.url.replace(/\/{2,}/g, "/");
		// Clean up any trailing slashes.
		options.url = options.url.replace(/\/+$/g, '');

		return options;
	}

	private unwrapHttpError(error: any): any {
		try {
			let original: any = {};
			if (error._body) {
				original = JSON.parse(error._body);
			}
			return ({
				status: error.status,
				statusText: error.statusText,
				url: error.url,
				message: original,
			});
		} catch (jsonError) {
			return ({
				code: -1,
				message: 'An unexpected error occurred.',
			});
		}
	}

	private unwrapHttpValue(value: Response): any {
		return (value.json());
	}
}
