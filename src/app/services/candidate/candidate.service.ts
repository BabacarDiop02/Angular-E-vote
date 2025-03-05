import {Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Candidate} from '../../models/candidate.model';
import {Observable} from 'rxjs';
import {TemplateService} from '../template/template.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = environment.apiUrl;
  selectedRow = signal<any>(null);
  public candidateDeleted!: Candidate;
  public candidateVoted!: Candidate

  constructor(private http: HttpClient,
              private router: Router,
              public templateService: TemplateService) {
  }

  getAllCandidate(): Observable<Candidate[]> {
    return  this.http.get<Candidate[]>(`${this.apiUrl}/candidates`);
  }

  getCandidateById(id: number) {
    return this.http.get<Candidate>(`${this.apiUrl}/candidate/${id}`).subscribe({
      next: (data) => {
        this.candidateDeleted = data;
        this.candidateVoted = data;
      },
      error: (error) => {
        console.log("Eurreur lors de la récupération de l'electeur", error);
      }
    });
  }

  getFileUrl(subDir: string, fileName: string): string {
    return `${this.apiUrl}/files/${subDir}/${fileName}`;
  }

  createCandidate(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-candidate`, formData);
  }

  selectRow(row: Candidate) {
    this.selectedRow.set(row);
  }

  updatedCandidate(formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-candidate`, formData);
  }

  deleteCandidate(id: number) {
    this.http.delete(`${this.apiUrl}/delete-candidate/${id}`, { responseType: 'text' }).subscribe({
      next: (data) => {
        console.log(data);
        this.templateService.setDeleteSuccess(true);
        console.log(this.templateService.deleteSuccess());
        this.router.navigate(['/connecter/gestion-candidat']).then(() => {
          setTimeout(() => {
            this.templateService.setDeleteSuccess(false);
            window.location.reload();
          }, 3000);
        });
      },
      error: (err) => {
        console.log("Eureur lor de la suppretion ", err);
      }
    });
  }
}
