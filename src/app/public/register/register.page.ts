import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [AngularFireAuth],
})
export class RegisterPage implements OnInit {

  
  password: string;
  email: string;
 
  constructor(private fire: AngularFireAuth) {
  }

  ngOnInit() {
  }

  createAccount(){
   
    
    console.log(this.email)
    this.fire.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then(data =>{
      console.log('got data', data);

    })
    .catch(error => {
      console.log('Error Handled: ', error);
    });

    console.log('Would register user with ',this.email, this.password)
  }
}
