import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Elector} from '../../models/elector.model';

@Injectable({
  providedIn: 'root'
})
export class ElectorService {
  private apiUrl = environment.apiUrl;
  selectedRow = signal<any>(null);
  public electorDeleted!: Elector;

  constructor(private http: HttpClient,
              private router: Router) { }

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
    this.http.delete<string>(`${this.apiUrl}/delete-elector/${id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/connecter/gestion-electeur'])
      },
      error: (err) => {
        console.log("Eureur lor de la suppretion ", err);
      }
    });
  }
}
