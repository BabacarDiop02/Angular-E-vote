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
import {AuthenticationGuard} from './guards/authetication.guard';
import {RolesGuard} from './guards/roles.guard';
import {ValidationCompteComponent} from './pages/public/validation-compte/validation-compte.component';
import {SupervisorComponent} from './pages/connecter/supervisor/supervisor.component';
import {NonAuthoriserComponent, RegisterSuccessComponent} from './pages/public/non-authoriser/non-authoriser.component';

export const routes: Routes = [
  {path : '', component : HomePageComponent},
  {path : 'home', component : HomePageComponent},
  {path : 'no-authorize', component : NonAuthoriserComponent},
  {path : 'connection', component : ConnectionComponent},
  {path : 'inscription', component : InscriptionComponent},
  {path : 'valid-code', component : ValidationCompteComponent},
  {path : 'register-success', component : RegisterSuccessComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'resultat', component : ResultatComponent},
  {path : 'candidat', component : CandidatComponent},
  {path : 'list-candidats', component : CandidatListComponent},
  {
    path: 'connecter',
    component: TemplateComponent,
    canActivate: [AuthenticationGuard], children : [
      {
        path: 'voter',
        component: VoterComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_ELECTOR']}
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_ELECTOR']}
      },
      {
        path: 'chatbot',
        component: ChatbotComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_ELECTOR']}
      },
      {
        path: 'scrutin',
        component: ScrutinComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_ADMINISTRATOR']}
      },
      {
        path: 'gestion-candidat',
        component: GestionCandidatComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_ADMINISTRATOR']}
      },
      {
        path: 'gestion-electeur',
        component: GestionElecteurComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_ADMINISTRATOR']}
      },
      {
        path: 'gesttion-resultat',
        component: GestionResultatComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_ADMINISTRATOR', 'ROLE_SUPERVISOR']}
      },
      {
        path: 'supervisor',
        component: SupervisorComponent,
        canActivate: [AuthenticationGuard, RolesGuard],
        data: {expectedRole: ['ROLE_SUPERVISOR']}
      }
    ]
  }
];
