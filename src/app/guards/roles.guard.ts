import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: string[] = route.data['expectedRole'];
    const userRole = this.authenticationService.getRoles();

    const hasRole = userRole.some(role => expectedRole.includes(role));

    if (!this.authenticationService.isAuthenticated() || !hasRole) {
      this.router.navigate(['/no-authorize']);
      return false;
    }
    return true;
  }
}
