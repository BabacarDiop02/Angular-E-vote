import {ChangeDetectionStrategy, Component, HostListener, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TemplateService} from '../../../services/template/template.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLinkActive,
    MatDialogModule
  ],
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isSmallScreen: boolean = window.innerWidth < 992;

  constructor(private templateService: TemplateService,
              public authenticationService: AuthenticationService) {}

  toggleSideBar(): void {
    this.templateService.toggle()
  }

  readonly dialog = inject(MatDialog);

  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Vérifier la taille de l'ecran
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSmallScreen = window.innerWidth < 992;
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DialogAnimationsExampleDialog {
  constructor(public authenticationService: AuthenticationService) {
  }
}
