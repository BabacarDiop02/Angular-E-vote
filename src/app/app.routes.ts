import { Routes } from '@angular/router';
import {HomePageComponent} from './pages/public/home-page/home-page.component';
import {ConnectionComponent} from './pages/public/connection/connection.component';
import {InscriptionComponent} from './pages/public/inscription/inscription.component';
import {ContactComponent} from './pages/public/contact/contact.component';
import {ResultatComponent} from './pages/public/resultat/resultat.component';
import {CandidatComponent} from './pages/public/candidat/candidat.component';
import {CandidatListComponent} from './pages/public/candidat-list/candidat-list.component';
import {TemplateComponent} from './pages/template/template.component';
import {VoterComponent} from './pages/connecter/voter/voter.component';
import {ScrutinComponent} from './pages/connecter/scrutin/scrutin.component';
import {GestionCandidatComponent} from './pages/connecter/gestion-candidat/gestion-candidat.component';
import {GestionElecteurComponent} from './pages/connecter/gestion-electeur/gestion-electeur.component';
import {ProfileComponent} from './pages/connecter/profile/profile.component';
import {ChatbotComponent} from './pages/connecter/chatbot/chatbot.component';
import {GestionResultatComponent} from './pages/connecter/gestion-resultat/gestion-resultat.component';
import {AutheticationGuard} from './services/guards/authetication.guard';

export const routes: Routes = [
  {path : '', component : HomePageComponent},
  {path : 'home', component : HomePageComponent},
  {path : 'connection', component : ConnectionComponent},
  {path : 'inscription', component : InscriptionComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'resultat', component : ResultatComponent},
  {path : 'candidat', component : CandidatComponent},
  {path : 'list-candidats', component : CandidatListComponent},
  {path : 'connecter', component : TemplateComponent, canActivate: [AutheticationGuard], children : [
      {path : 'voter', component : VoterComponent,  canActivate: [AutheticationGuard]},
      {path : 'scrutin', component : ScrutinComponent, canActivate: [AutheticationGuard]},
      {path : 'gestion-candidat', component : GestionCandidatComponent, canActivate: [AutheticationGuard]},
      {path : 'gestion-electeur', component : GestionElecteurComponent, canActivate: [AutheticationGuard]},
      {path : 'profile', component : ProfileComponent, canActivate: [AutheticationGuard]},
      {path : 'gesttion-resultat', component : GestionResultatComponent, canActivate: [AutheticationGuard]},
      {path : 'chatbot', component : ChatbotComponent, canActivate: [AutheticationGuard]},
    ]}
];
