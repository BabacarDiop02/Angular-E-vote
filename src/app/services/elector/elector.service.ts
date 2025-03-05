import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Elector} from '../../models/elector.model';
import {TemplateService} from '../template/template.service';

@Injectable({
  providedIn: 'root'
})
export class ElectorService {
  private apiUrl = environment.apiUrl;
  selectedRow = signal<any>(null);
  public electorDeleted!: Elector;

  constructor(private http: HttpClient,
              private router: Router,
              private templateService: TemplateService) {}

  selectRow(row: Elector) {
    this.selectedRow.set(row);
  }

  getAllElectors(): Observable<Set<Elector>> {
    return this.http.get<Set<Elector>>(`${this.apiUrl}/electors`);
  }

  getElector(id: number) {
    this.http.get<Elector>(`${this.apiUrl}/elector/${id}`).subscribe({
      next: (data) => {
        this.electorDeleted = data;
      },
      error: (error) => {
        console.log("Eurreur lors de la récupération de l'electeur", error);
      }
    });
  }

  importElectors(formData: FormData): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/import-electors`, formData);
  }

  createElector(elector: Elector): Observable<Elector> {
    return this.http.post<Elector>(`${this.apiUrl}/create-elector`, elector);
  }

  updatedElector(elector: Elector): Observable<Elector> {
    return this.http.put<Elector>(`${this.apiUrl}/update-elector`, elector);
  }

  deleteElector(id: number) {
    this.http.delete(`${this.apiUrl}/delete-elector/${id}`, { responseType: 'text' }).subscribe({
      next: (data) => {
        console.log(data);
        this.templateService.setDeleteSuccess(true);
        console.log(this.templateService.deleteSuccess());
        this.router.navigate(['/connecter/gestion-electeur']).then(() => {
          setTimeout(() => {
            this.templateService.setDeleteSuccess(false);
            window.location.reload(); // Recharge la page après 5 secondes
          }, 3000);
        });
      },
      error: (err) => {
        console.log("Eureur lor de la suppretion ", err);
      }
    });
  }
}
