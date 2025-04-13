import {Injectable, signal} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private drawer!: MatDrawer;
  public connection  = signal<boolean>(false);
  deleteSuccess = signal<boolean>(false);

  constructor() { }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  toggle(): void {
    this.drawer?.toggle();
  }

  setDeleteSuccess(value: boolean) {
    this.deleteSuccess.set(value);
  }
}
