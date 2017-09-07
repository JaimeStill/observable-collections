import { Component, Input, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

declare var Prism: any;

@Component({
    selector: 'github-code',
    templateUrl: 'github-code.component.html',
    styleUrls: ['github-code.component.css'],
    providers: [ApiService]
})
export class GithubCodeComponent implements AfterViewInit {
    @Input() url = '';
    @Input() language = '';
    source: string;

    constructor(public api: ApiService) {}

    ngAfterViewInit() {
        this.api.getSource(this.url);

        this.api.source.subscribe(source => {
            this.source = Prism.highlight(source.trim(), Prism.languages[this.language]);
        });
    }
}
