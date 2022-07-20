import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators'

import { registerFace } from '../interfaces/registerFace';
import { MainServiceService } from '../services/main-service.service';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {


  loginForm: any
  warningMessage: any

  constructor(
    private fb: FormBuilder,
    private ServiceComponent: MainServiceService,
    private route: Router,
    private httClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }


  loginUser() {

    const user = this.loginForm.value
    this.ServiceComponent.loginUser(user).subscribe(
      {
        next: () => {
          this.route.navigate(['/'])
        },
        error: (err: any) => {
          console.log(err)
          this.warningMessage = err.error.message
          this.ServiceComponent.clearSession()
        }
      }
    )


    // console.log(this.afs)

    // this.ServiceComponent.getAllUsersId().subscribe((data) => {
    //   data.map((a) => {
    //     // console.log(a)
    //     let userID = a.payload.doc.id

    //   })
    // })

    // const auth = getAuth();
    // debugger;
    // signInWithEmailAndPassword(auth, user.email, user.password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log('im in')
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });






    //   this.afs.collection<registerFace>('users')
    //     .valueChanges()
    //     .subscribe((data) => {
    //       debugger;
    //       for (let i = 0; i < data.length; i++) {
    //         if (data[i].email === user.email && user.password === data[i].password) {
    //           this.ServiceComponent.setLocalStorage(data[i])
    //           this.route.navigate(['/home'])

    //           break;
    //         }
    //         this.warningMessage = 'Wrong username or password'

    //       }
    //     })
  }

}
