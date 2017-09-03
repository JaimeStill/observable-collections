import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToasterService } from './toaster.service';
import { CoreApiService } from './core-api.service';
import { Theme } from '../models/theme.model';
import { Post } from '../models/post.model';

@Injectable()
export class AppService {
    redirectUrl = new BehaviorSubject<string>('');
    themes = new BehaviorSubject<Array<Theme>>([]);
    posts = new BehaviorSubject<Array<Post>>([]);

    constructor(private toaster: ToasterService, private http: Http, private coreApi: CoreApiService, private router: Router) { }

    getThemes() {
        this.coreApi.get<Array<Theme>>('/api/app/getThemes').subscribe(
            themes => {
                this.themes.next(themes);
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    getPosts() {
        this.http.get('https://jsonplaceholder.typicode.com/posts')
            .map((res: Response) => {
                return res.json().map((post: Post) => {
                    post.title = post.title.split(' ').slice(0, 3).toString().replace(',', ' ').replace(',', ' ');
                    return Object.assign(new Post(), post);
                });
            })
            .catch(this.coreApi.handleError)
            .subscribe(
                (posts: Array<Post>) => {
                    this.posts.next(posts);
                },
                error => {
                    this.toaster.sendErrorMessage(error);
                }
            );
    }
}
