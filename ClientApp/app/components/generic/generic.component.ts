import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Post } from '../../models/post.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'generic',
    templateUrl: 'generic.component.html',
    styleUrls: ['generic.component.css']
})
export class GenericComponent implements OnInit {
    posts = new BehaviorSubject<Array<Post>>([]);

    constructor(private app: AppService) {
        app.getPosts();
    }

    ngOnInit() {
        this.app.hasDataSource.subscribe(bool => {
            if (bool) {
                this.app.dataSource.subscribe(source => {
                    source.connect().subscribe(data => {
                        this.posts.next(data);
                    });
                });
            }
        });
    }
}
