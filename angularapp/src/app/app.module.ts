import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminViewBooksComponent } from './components/admin-view-books/admin-view-books.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { ReviewComponent } from './components/review/review.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserViewBooksComponent } from './components/user-view-books/user-view-books.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { MyreviewComponent } from './components/myreview/myreview.component';
import { HighlightStockDirective } from './directives/highlight-stock.directive';
import { FormatCategoryPipe } from './pipes/format-category.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    AdminViewBooksComponent,
    AdminnavComponent,
    AdminviewreviewsComponent,
    BookFormComponent,
    CheckoutComponent,
    DashboardComponent,
    ErrorComponent,
    ForgotPasswordComponent,
    HomePageComponent,
    LoginComponent,
    MyorderComponent,
    OrderplacedComponent,
    ReviewComponent,
    SignupComponent,
    UserViewBooksComponent,
    UsernavComponent,
    MyreviewComponent,
    HighlightStockDirective,
    FormatCategoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    BrowserAnimationsModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
