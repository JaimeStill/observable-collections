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

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        SidepanelComponent
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
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
