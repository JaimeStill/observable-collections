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
import { IService } from '../interfaces/iservice';
import { ContainerDataSource } from '../datasources/container.datasource';

@Injectable()
export class AppService implements IService<Post> {
    hasDataSource = new BehaviorSubject<boolean>(false);
    dataSource = new BehaviorSubject<ContainerDataSource<Post>>(new ContainerDataSource<Post>(null, null));
    loading = new BehaviorSubject<boolean>(false);
    redirectUrl = new BehaviorSubject<string>('');
    themes = new BehaviorSubject<Array<Theme>>([]);
    posts = new BehaviorSubject<Array<Post>>([]);
    get data(): BehaviorSubject<Array<Post>> { return this.posts }

    constructor(private toaster: ToasterService, private http: Http, private coreApi: CoreApiService, private router: Router) { }

    setContainerSource(dataSource: ContainerDataSource<Post>) {
        this.dataSource.next(dataSource);
        this.hasDataSource.next(true);
    }

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
        this.loading.next(true);
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
                    this.loading.next(false);
                },
                error => {
                    this.toaster.sendErrorMessage(error);
                    this.loading.next(false);
                }
            );
    }
}
