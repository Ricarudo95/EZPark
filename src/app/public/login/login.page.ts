import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthenticationService],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,public auth: AuthenticationService) { }

  ngOnInit() {
  }



  emailLogin(){
    console.log("The user has signed in")
    this.router.navigate(['park-list'])
  }
  register(){
    this.router.navigate(['register'])
  }

  googleLogin(){
    
  }

  recovery(){
    console.log("well this is still not done")
  }

}
