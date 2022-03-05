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
  localStorageItem: string = 'userInfoWebSyukron';

  constructor(private auth: Auth) {
    this.loggedIn = !!localStorage.getItem(this.localStorageItem);
  }

  sudahLogin(): boolean {
    return this.loggedIn;
  }

  getUserInfo(): any {
    return JSON.parse(localStorage.getItem(this.localStorageItem) || '{}');
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
        localStorage.setItem(this.localStorageItem, JSON.stringify(result.user));
        this.loggedIn = true;
        console.log(JSON.stringify(result.user));
        console.log('You have been successfully logged in!')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  logout() {
    localStorage.removeItem(this.localStorageItem);
    this.loggedIn = false;
    return signOut(this.auth);
  }
}
