import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { AppService } from '../../services/app.service';
import { Post } from '../../models/post.model';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    filterChange = new BehaviorSubject<string>('');
    filteredData: Array<Post> = new Array<Post>();
    @ViewChild(MdPaginator) paginator: MdPaginator;
    @ViewChild('filter') filter: ElementRef;

    constructor(private app: AppService) {
        app.getPosts();
    }

    ngOnInit() {
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                this.filterChange.next(this.filter.nativeElement.value);
            });

        this.connect().subscribe(data => {
            this.filteredData = data;
        });
    }

    connect(): Observable<Array<Post>> {
        const displayChanges = [
            this.app.posts,
            this.filterChange,
            this.paginator.page
        ];

        return Observable.merge(...displayChanges).map(() => {
            this.filteredData = this.app.posts.value.slice().filter((item: Post) => {
                const searchStr = (item.title).toLowerCase();
                return searchStr.indexOf(this.filterChange.value.toLowerCase()) !== -1;
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
