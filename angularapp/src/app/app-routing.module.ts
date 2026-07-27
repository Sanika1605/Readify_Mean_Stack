import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserViewBooksComponent } from './components/user-view-books/user-view-books.component';
import { MyreviewComponent } from './components/myreview/myreview.component';
import { ReviewComponent } from './components/review/review.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AdminViewBooksComponent } from './components/admin-view-books/admin-view-books.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[authGuard,roleGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signUp',
    component:SignupComponent
  },
  {
    path:'books',
    component:UserViewBooksComponent
  },
  {
    path:'adminviewbooks',
    component:AdminViewBooksComponent,
    canActivate:[authGuard,roleGuard]
  },
  {
    path:'adminviewreview',
    component:AdminviewreviewsComponent,
    canActivate:[authGuard,roleGuard]
  },
  {
    path:'myreview',
    component:MyreviewComponent,
    canActivate:[authGuard]
  },
  {
    path:'addreview/:id',
    component:ReviewComponent,
    canActivate:[authGuard]
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'ordersplaced',
    component:OrderplacedComponent,
    canActivate:[authGuard,roleGuard]
  },
  {
    path:'myorder',
    component:MyorderComponent,
    canActivate:[authGuard]
  },
  {
    path:'addBook',
    component:BookFormComponent,
    canActivate:[authGuard,roleGuard]
  },
  {
    path:'forgotpassword',
    component:ForgotPasswordComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    canActivate:[authGuard]
  },
  {
    path:'**',
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
