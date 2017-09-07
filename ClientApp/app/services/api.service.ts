import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoreApiService } from './core-api.service';
import { ToasterService } from './toaster.service';

@Injectable()
export class ApiService {
    source = new BehaviorSubject<string>('');

    constructor(public coreApi: CoreApiService, public toaster: ToasterService, public http: Http) {}

    getSource(url: string) {
        const options = this.coreApi.getRequestOptions();
        options.headers.delete('Pragma');
        options.headers.delete('Content-Type');
        this.http.get(url, options)
            .map(res => {
                return res.text();
            })
            .catch(this.coreApi.handleError)
            .subscribe(source => {
                this.source.next(source);
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }
}
