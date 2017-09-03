import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OverlayContainer } from '@angular/material';
import { Theme } from '../models/theme.model';
import { AppService } from './app.service';

@Injectable()
export class ThemeService {
    activeTheme = new BehaviorSubject<Theme>(new Theme());

    constructor (private overlayContainer: OverlayContainer, private app: AppService) {
        let theme = new Theme();
        theme.name = 'green-light';
        theme.display = 'Green - Light';
        this.activeTheme.next(theme);
    }

    setTheme(theme: Theme) {
        this.activeTheme.next(theme);
        this.overlayContainer.themeClass = theme.name;
    }
}
