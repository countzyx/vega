import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(protected authService: AuthService) { }

  canActivate() {
    if (this.authService.authenticated())
      return true;

    if (window)
      window.location.href = "https://vega-prj.auth0.com/login?client=0nQ3hhqaibNtvPXGIvaaDZLJC5p5Du00";

    return false;
  }
}
