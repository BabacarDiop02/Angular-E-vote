import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Candidate} from '../../models/candidate.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getAllCandidate(): Observable<Candidate[]> {
    return  this.http.get<Candidate[]>(`${this.apiUrl}/candidates`);
  }

  getCandidateById(id: number) {
    return this.http.get<Candidate>(`${this.apiUrl}/candidate/${id}`);
  }

  getFileUrl(subDir: string, fileName: string): string {
    return `${this.apiUrl}/files/${subDir}/${fileName}`;
  }

  createCandidate(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-candidate`, formData);
  }
}
