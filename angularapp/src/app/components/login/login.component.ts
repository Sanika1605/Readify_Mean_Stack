//working login without token and with username

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Login } from 'src/app/models/login.model';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit{
//   loginForm!:FormGroup;
//   user:Login={
//     username:'',
//     password:''
//   }
//   constructor(private fb:FormBuilder,private toastr:ToastrService,private auth:AuthService,private router:Router){}
//   ngOnInit(): void {
//     this.loginForm=this.fb.group({
//       username:['',[Validators.required]],
//       password:['',[Validators.required,Validators.minLength(6)]]
//     })
//   }
  
//   onSignin(){
//     if(this.loginForm.valid){
//       this.user=this.loginForm.value;
//       this.auth.login(this.user).subscribe({
//         next:(value)=>{
//           localStorage.setItem('user',value.user._id);
//           this.toastr.success('Logged in successfully.')
//           this.router.navigate(['/'])
//         },
//         error:()=>{
//           this.toastr.error('User not found.')
//         }
//       })
//       this.loginForm.reset();
//     }
//   }
// }

//for login with token and email
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

interface DecodedToken{
  userRole:string;
  email:string;
  username:string;
  name:string;
  id:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  user:Login={
    username:'',
    password:''
  }
  showPassword = false;

  constructor(private fb:FormBuilder,private toastr:ToastrService,private auth:AuthService,private router:Router){}
  ngOnInit(): void {
    this.showPassword=false;
    this.loginForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  onSignin(){
    if(this.loginForm.valid){
      this.user=this.loginForm.value;
      this.auth.login(this.user).subscribe({
        next:(data)=>{
          console.log(data.token);
          
          const decoded = jwtDecode<DecodedToken>(data.token);
          console.log(decoded)
          localStorage.setItem('role',decoded.userRole);
          localStorage.setItem('email',decoded.email);
          localStorage.setItem('username',decoded.username);
          localStorage.setItem('authToken',data.token);
          localStorage.setItem('user',data.user._id);

          this.toastr.success('Logged in successfully','Welcome to Readify!')
          this.router.navigate(['/'])
          this.loginForm.reset();
        },
        error:(error)=>{
          if(error.status===404){
            this.router.navigate(['/error'])
          }else{
            this.toastr.error('User not found.')
          }
        }
      })
      this.loginForm.reset();
    }
  }
}
