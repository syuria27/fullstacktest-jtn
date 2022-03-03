import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginWithGoogle();
  }

  get isLoggedIn(){
    return this.auth.sudahLogin();
  }


  get getUser(): any {
    return this.auth.getUserInfo();
  }

  logout(){
    this.auth.logout();
  }

}
