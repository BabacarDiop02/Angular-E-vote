import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard  implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }


  canActivate(): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/no-authorize']);
      return false;
    }
    return true;
  }
}
