import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient,
              private router: Router) { }

  // Connection
  public login(credentials: {username: string; password: string}): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/connection`, credentials, { responseType: 'text' as 'json' }).pipe(
      tap(response => {
        localStorage.setItem('token', response);
        const decodedToken = this.jwtHelper.decodeToken(response);
        localStorage.setItem('roles', decodedToken.roles);
      })
    );
  }

  // Inscription
  public register(credentials: {firstName: string, lastName: string, nationalIdentificationNumber: string, email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration`, credentials);
  }

  public activation(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/activation`, {code});
  }

  // Deconnexion
  public logout(): void {

    this.http.get(`${this.apiUrl}/disconnection`).subscribe({
      next: () => {
        this.router.navigateByUrl("/home");
      }
    });

    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigateByUrl("/home");
  }

  public getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles != null ? roles.split(',') : []
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMINISTRATOR');
  }

  public isElector(): boolean {
    return this.getRoles().includes('ROLE_ELECTOR');
  }

  public isSupervisor(): boolean {
    return this.getRoles().includes('ROLE_SUPERVISOR');
  }
}
