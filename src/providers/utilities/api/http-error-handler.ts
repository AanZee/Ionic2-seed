import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {ApiGateway} from "./api-gateway";

@Injectable()
export class HttpErrorHandler {

    constructor(
        private events: Events,
        private apiGateway: ApiGateway
    ) {
        this.apiGateway.errors$.subscribe(
            (value: any) => {
                console.group("HttpErrorHandler");
                console.log(value.status, "status code detected.");
                console.dir(value);
                console.groupEnd();

                if (value.status === 400) {
                    console.log('Invalid Authorization Code');
                }
                if (value.status === 401) {
                    console.log('Not Authorized');
                }
            });
    }
}
