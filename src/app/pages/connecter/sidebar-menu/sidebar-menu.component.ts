import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './sidebar-menu.component.html',
  standalone: true,
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
