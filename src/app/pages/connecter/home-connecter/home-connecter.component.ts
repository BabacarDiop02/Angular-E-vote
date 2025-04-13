import {Component, Input} from '@angular/core';
import {ProgressChartComponent} from '../../../component/progress-chart/progress-chart.component';
import {MatCardModule} from '@angular/material/card';
import {RouterOutlet} from '@angular/router';
import {ElectorService} from '../../../services/elector/elector.service';
import {VoteService} from '../../../services/vote/vote.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {forkJoin} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home-connecter',
  imports: [
    ProgressChartComponent,
    MatCardModule,
    RouterOutlet,
    NgIf,
  ],
  templateUrl: './home-connecter.component.html',
  standalone: true,
  styleUrl: './home-connecter.component.css'
})
export class HomeConnecterComponent {
  @Input() percentageElectors = 0;
  @Input() percentageVote = 0;
  @Input() electeurs = 0;
  @Input() electeurInscrit = 0;
  @Input() allVotes = 0;
  childActivated = false;

  constructor(private electorService: ElectorService,
              private voteService: VoteService,
              private authenticationService: AuthenticationService) {
    forkJoin({
      electors: this.electorService.allElectorsCount(),
      registered: this.authenticationService.allUsersCount(),
      votes: this.voteService.allVotesCount()
    }).subscribe(({ electors, registered, votes }) => {
      this.electeurs = electors;
      this.electeurInscrit = registered;
      this.allVotes = votes;
      this.calculerPourcentage();
    });
  }

  calculerPourcentage() {
    if (this.electeurs > 0) {
      this.percentageElectors = (this.electeurInscrit / this.electeurs) * 100;
    } else {
      this.percentageElectors = 0;
    }

    if (this.electeurInscrit > 0) {
      this.percentageVote = (this.allVotes / this.electeurInscrit) * 100;
    } else {
      this.percentageVote = 0;
    }
  }

  onActivate(event: any) {
    console.log('Composant enfant ACTIVÉ:', event);
    this.childActivated = true;
  }

  onDeactivate() {
    console.log('Composant enfant DÉSACTIVÉ');
    this.childActivated = false;
  }

  //*************************************************************************

  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  handleChoice(choice: string) {
    switch (choice) {
      case 'electeurs':
        alert("Voici comment vous inscrire ou vérifier votre statut d’électeur.");
        break;
      case 'votes':
        alert("Les votes se déroulent de 08h à 18h. Avez-vous d'autres questions ?");
        break;
      case 'connexion':
        alert("Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié'.");
        break;
      case 'autre':
        alert("Merci de nous décrire votre problème.");
        break;
    }
  }

}
