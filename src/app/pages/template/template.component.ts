import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarMenuComponent} from '../connecter/sidebar-menu/sidebar-menu.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {TemplateService} from '../../services/template/template.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-template',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    SidebarMenuComponent,
    MatCardModule
  ],
  templateUrl: './template.component.html',
  standalone: true,
  styleUrl: './template.component.css'
})
export class TemplateComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(private templateService: TemplateService,
              public authenticationService: AuthenticationService) {}

  ngAfterViewInit(): void {
    this.templateService.setDrawer(this.drawer);
  }
}
