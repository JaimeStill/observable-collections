import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Post } from '../../models/post.model';

@Component({
    selector: 'walkthrough',
    templateUrl: 'walkthrough.component.html',
    styleUrls: ['walkthrough.component.css']
})
export class WalkthroughComponent implements OnInit {
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

    setIsRaised(post: Post) {
        post.isRaised = true;
    }

    removeIsRaised(post: Post) {
        post.isRaised = false;
    }
}
