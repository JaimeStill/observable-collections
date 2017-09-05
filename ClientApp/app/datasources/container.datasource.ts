import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { IFilter } from '../interfaces/ifilter';
import { IService } from '../interfaces/iservice';

export class ContainerDataSource<T extends IFilter> {
    filterChange = new BehaviorSubject<string>('');
    filteredData: Array<T> = new Array<T>();
    get filter(): string { return this.filterChange.value; }
    set filter(filter: string) { this.filterChange.next(filter); }

    constructor(private service: IService<T>, private paginator: MdPaginator) {}

    connect(): Observable<T[]> {
        const displayDataChanges = [
            this.service.data,
            this.filterChange,
            this.paginator.page
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            this.filteredData = this.service.data.value.slice().filter((item: T) => {
                const searchStr = item.filter.toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });

            let startIndex = this.paginator.pageIndex * this.paginator.pageSize;

            if (startIndex > this.filteredData.length) {
                startIndex = 0;
                this.paginator.pageIndex = 0;
            }

            return this.filteredData.slice().splice(startIndex, this.paginator.pageSize);
        });
    }
}
