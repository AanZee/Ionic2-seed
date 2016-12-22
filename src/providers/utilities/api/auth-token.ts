import {Injectable} from '@angular/core';


@Injectable()
export class AuthToken {
  private store: any  = localStorage;
  private key: String = 'auth-token';
  

  constructor() {}

  getToken() {
    return this.store.getItem(this.key);
  }
  
  setToken(token?) {
    if (token) {
        this.store.setItem(this.key, token);
    } else {
        this.store.removeItem(this.key);
    }
  }
  
}