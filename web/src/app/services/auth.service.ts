import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedIn: boolean = false;

  constructor(private auth: Auth) {
    this.loggedIn = !!localStorage.getItem('userInfo');
  }

  sudahLogin(): boolean {
    return this.loggedIn;
  }

  getUserInfo(): any {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  }

  loginWithGoogle() {
    signInWithPopup(this.auth,
      new GoogleAuthProvider()
        .setCustomParameters(
          {
            prompt: 'select_account'
          }
        )
      )
      .then((result) => {
        localStorage.setItem('userInfo', JSON.stringify(result.user));
        this.loggedIn = true;
        console.log(JSON.stringify(result.user));
        console.log('You have been successfully logged in!')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.loggedIn = false;
    return signOut(this.auth);
  }
}
