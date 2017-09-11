import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {
  profile: any;
  private roles: string[] = []; 

  // Configure Auth0
  lock = new Auth0Lock('0nQ3hhqaibNtvPXGIvaaDZLJC5p5Du00', 'vega-prj.auth0.com', {});

  constructor() {    
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'token'
    return tokenNotExpired('token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
  }
}