import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authenticationService.getRoles();

    if (!this.authenticationService.isAuthenticated() || !userRole.includes(expectedRole)) {
      this.router.navigate(['/connection']);
      return false;
    }
    return true;
  }
}
