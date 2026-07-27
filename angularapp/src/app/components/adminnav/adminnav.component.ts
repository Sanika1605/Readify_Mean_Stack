import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit{
  loginToggler = false;
  constructor(private authService:AuthService,private toastr:ToastrService,private router:Router){}
  ngOnInit() {
    this.loginToggler = this.authService.isAuthenticated()
  }
  logout(){
    localStorage.clear();
  }
  loginLogout() {
    if (this.loginToggler) {
      this.toastr.success('Logout out successfully')
      this.authService.logout();
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/login'])
    }
  }
}
