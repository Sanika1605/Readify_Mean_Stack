import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  signUpForm!:FormGroup;
  user:User={
    username:'',
    email:'',
    mobileNumber:'',
    confirm_password:'',
    password:'',
    userRole:''
  }
  showPassword:boolean = false;
  showConfirmPassword:boolean = false;
  constructor(private fb:FormBuilder,private toastr:ToastrService,private auth:AuthService,private router:Router){}
  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required]],
      mobileNumber:['',[Validators.required]],
      confirm_password:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]],
      userRole:['User',[Validators.required]]
    },
    {validators:this.passwordMatchValidator}
    )
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSignUp(){
    if(this.signUpForm.valid){
      this.user=this.signUpForm.value;
      this.auth.register(this.user).subscribe({
        next:(value)=>{
          this.toastr.success('Registered successfully.')
          console.log('From backend',value);
          this.router.navigate(['/login'])
        },
        error:()=>{
          this.toastr.error('Something went wrong.')
        }
      })
      this.signUpForm.reset();
    }
  }
  
  passwordMatchValidator:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
    const password=control.get('password');
    const confirm_password=control.get('confirm_password');
    
    return password && confirm_password && password.value !==confirm_password.value ? {passwordMismatch:true} : null;
  };
}

