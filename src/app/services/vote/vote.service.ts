import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = environment.apiUrl;
  voteMessage = signal<string>("");

  constructor(private http: HttpClient,
              private router: Router) {}

  voter(id: number) {
    const params = new URLSearchParams();
    params.set('candidateId', id.toString());
    this.http.post<{ message: string }>(`${this.apiUrl}/voter?${params.toString()}`, {}).subscribe({
      next: (data) => {
        console.log(data);
        this.voteMessage.set(data.message);
        this.router.navigate(['/connecter/voter']).then(() => {
          setTimeout(() => {
            window.location.reload(); // Recharge la page après 5 secondes
          }, 3000);
        });
      },
      error: (err) => {
        console.log("Erreur lors du vote ", err)
      }
    });
  }

  hasVoted(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/has-voted`);
  }

  allVotesCount():Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/all-votes`);
  }

  voteByCandidate(candidatId: number){
    this.http.get<{
      numberOfVote: number,
      firstName: string,
      lastName: string,
      age: number,
      occupation: string
    }>(`${this.apiUrl}/votes-candidate?candidateId=${candidatId}`).subscribe({
      next: (data) => {
        return data.numberOfVote;
    },
      error: (err) => {
        return 0;
      }
    });
  }
}
