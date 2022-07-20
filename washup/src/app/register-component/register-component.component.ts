import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { registerFace } from '../interfaces/registerFace';
import { MainServiceService } from '../services/main-service.service';

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { loginFace } from '../interfaces/loginFace';

const host = environment.apiURL

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  registerForm: any
  errorMessage: any
  warningMessage: any = ''
  dataUsers: any

  constructor(
    private fb: FormBuilder,
    // private afs: AngularFirestore,
    private ServiceComponent: MainServiceService,
    private route: Router,
    private httpClient: HttpClient,
  ) {

    //  this.dataUsers = afs.collection<registerFace>('users')
    //   .valueChanges()
    //   .subscribe((data) => {
    //     console.log(data)
    //   })

    // user.add({ username: 'item', password: 10 });
    // console.log(user)


  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rePass: ['', Validators.required],
    })


  }

  registerUser() {

    const data = this.registerForm.value

    let reduceDate: registerFace = {
      email: data.email,
      password: data.password
    }


    this.ServiceComponent.createUser(reduceDate).subscribe({
      next: () => {
        this.route.navigate(['/'])
      },
      error: (err: any) => {
        
        this.errorMessage = err.error.message
        this.ServiceComponent.clearSession()
        this.route.navigate(['/register'])
      }
    })



    // this.route.navigate(['/home'])

  }


}
