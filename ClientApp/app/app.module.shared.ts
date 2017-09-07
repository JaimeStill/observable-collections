import { NgModule } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from './app.module.material';

import { ThemeService } from './services/theme.service';
import { ToasterService } from './services/toaster.service';
import { CoreApiService } from './services/core-api.service';
import { NoCacheRequestOptions } from './services/no-cache-request-options';
import { SidepanelService } from './services/sidepanel.service';
import { AppService } from './services/app.service';

import { PrismComponent } from './components/prism/prism.component';
import { GithubCodeComponent } from './components/github-code/github-code.component';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { GenericComponent } from './components/generic/generic.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { WalkthroughComponent } from './components/walkthrough/walkthrough.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        PrismComponent,
        AppComponent,
        HomeComponent,
        SidepanelComponent,
        GenericComponent,
        SearchContainerComponent,
        WalkthroughComponent,
        GithubCodeComponent
    ],
    providers: [
        ThemeService,
        ToasterService,
        CoreApiService,
        SidepanelService,
        AppService,
        { provide: RequestOptions, useClass: NoCacheRequestOptions }
    ],
    imports: [
        AppMaterialModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'generic', component: GenericComponent },
            { path: 'walkthrough', component: WalkthroughComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
