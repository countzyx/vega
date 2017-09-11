import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuardService extends AuthGuardService {

  constructor(authService: AuthService) { 
    super(authService);
  }

  canActivate() {
    var isAuthenticated = super.canActivate();
    return isAuthenticated ? this.authService.isInRole('Admin') : false;
  }  
}
