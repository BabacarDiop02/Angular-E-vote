import {Injectable, signal} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private drawer!: MatDrawer;
  public connection  = signal<boolean>(false)

  constructor() { }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  toggle(): void {
    this.drawer?.toggle();
  }
}
