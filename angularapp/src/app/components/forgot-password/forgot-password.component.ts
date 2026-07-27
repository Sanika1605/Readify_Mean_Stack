// import { Component } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/services/auth.service';

// interface Forgot{
//   email:string;
//   password:string;
//   confirm_password:string;
// }
// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent {
//   forgotPasswordForm!:FormGroup;
//   user:Forgot={
//     email:'',
//     password:'',
//     confirm_password:''
//   }
//   constructor(private fb:FormBuilder,private toastr:ToastrService,private auth:AuthService,private router:Router){}
//   ngOnInit(): void {
//     this.forgotPasswordForm=this.fb.group({
//       email:['',[Validators.required]],
//       password:['',[Validators.required,Validators.minLength(6)]],
//       confirm_password:['',[Validators.required,Validators.minLength(6)]],
//     },
//     {validators:this.passwordMatchValidator})
//   }

//   onReset(){
//     if(this.forgotPasswordForm.valid){
//       this.user=this.forgotPasswordForm.value;
//       this.auth.forgotPassword({confirm_password:this.user.password,email:this.user.email}).subscribe({
//         next:(value)=>{
//           this.toastr.success('Password reset successfully.')
//           this.router.navigate(['/login'])
//         },
//         error:()=>{
//           this.toastr.error('User not found.')
//         }
//       })
//       this.forgotPasswordForm.reset();
//     }
//   }

//   passwordMatchValidator:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
//     const password=control.get('password');
//     const confirm_password=control.get('confirm_password');

//     return password && confirm_password && password.value !==confirm_password.value ? {passwordMismatch:true} : null;
//   };
// }


import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

interface Forgot {
  email: string;
  password: string;
  confirm_password: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  user: Forgot = {
    email: '',
    password: '',
    confirm_password: ''
  };
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showConfirmPassword=false;
    this.showPassword=false;
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    }

    // verifyEmail() {
    //   const email = this.forgotPasswordForm.get('email')?.value;
    //   if (email) {
    //     this.auth.checkEmailExists(email).subscribe({
    //       next: () => this.toastr.success('Email verified'),
    //       error: () => this.toastr.error('Email not found')
    //     });
    //   }
    // }

    onReset() {
      this.user = this.forgotPasswordForm.value;
      this.auth.forgotPassword({
        email: this.user.email,
        confirm_password: this.user.password
      }).subscribe({
        next: () => {
          this.toastr.success('Password reset successfully.');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toastr.error('User not found.');
        }
      });
      this.forgotPasswordForm.reset();
    }
    
    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirm_password = control.get('confirm_password');
    return password && confirm_password && password.value !== confirm_password.value
      ? { passwordMismatch: true }
      : null;
    };


}