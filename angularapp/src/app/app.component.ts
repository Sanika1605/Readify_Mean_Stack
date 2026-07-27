import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularapp';
  isAdmin:boolean=false;
  showNavbar:boolean=true;
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isAdmin=this.authService.isAdmin();
    
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const hiddenRoutes=['/login','/signUp'];
      this.showNavbar=!hiddenRoutes.includes(event.urlAfterRedirects);
    })
  }
  
}
