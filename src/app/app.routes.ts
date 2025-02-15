import { Routes } from '@angular/router';
import {InscriptionComponent} from './pages/inscription/inscription.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ConnectionComponent} from './connection/connection.component';

export const routes: Routes = [
  {path : 'connection', component : ConnectionComponent},
  {path : '', component : HomePageComponent},
  {path : 'home', component : HomePageComponent},
  {path : 'inscription', component : InscriptionComponent},
];
