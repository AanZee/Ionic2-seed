import { Injectable } from '@angular/core';

@Injectable()
export class AuthToken {
	private key: string = 'auth-token';

	constructor() {}

	/**
	 * Get token for Authorization
	 * @return string [description]
	 */
	public getToken(): string {
		return localStorage.getItem(this.key);
	}

	/**
	 * Set or remove token for Authorization
	 * @param {string} token [description]
	 */
	public setToken(token?: string): void {
		if (token) {
			localStorage.setItem(this.key, token);
		} else {
			localStorage.removeItem(this.key);
		}
	}
}
