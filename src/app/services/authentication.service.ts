import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Router } from '@angular/router';


interface User {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  secondName?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
  private afs: AngularFirestore,
  private router: Router) {
    this.user = this.afAuth.authState
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>('users/${user.uid}').valueChanges();
        } else{
          return of(null);
        }

      });

  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credentials) => {
        this.updateUserData(credentials.user)
      })
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');
    
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      firstName: user.firstName,
      secondName: user.secondName, 
    }

    return userRef.set(data)

  }
}
