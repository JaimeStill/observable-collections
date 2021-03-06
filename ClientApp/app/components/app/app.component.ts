import { Component } from '@angular/core';
import { SidepanelService } from '../../services/sidepanel.service';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private sidepanel: SidepanelService, private theme: ThemeService) {}
}
