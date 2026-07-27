import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  cartItemCount: number = 0;
  showCartSlider: boolean = false;
  cart: any[] = [];
  loginToggler?: boolean
  // loginToggler: boolean
  isUser: boolean = true;
  isShow: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private renderer: Renderer2
  ) { }

  @ViewChild('navbar') navbar!: ElementRef;

  ngOnInit() {
    this.loginToggler = this.authService.isAuthenticated()
    this.isUser = !this.authService.isAdmin();
    this.loadCart();
    this.updateCartCount();
  }

  logout() {
    localStorage.clear();
  }

  toggleCart() {
    this.showCartSlider = !this.showCartSlider;
    if (this.showCartSlider) {
      this.loadCart();
    }
  }

  loadCart() {
    const rawCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = [];

    rawCart.forEach((item: any) => {
      this.bookService.getBookById(item.book._id).subscribe((book: any) => {
        if (book.stockQuantity > 0) {
          this.cart.push({
            book,
            quantity: item.quantity
          });
          this.updateCartCount();
        } else {
          // this.toastr.warning(`${book.name} is out of stock`);
        }
      });
    });
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

  updateCartCount() {
    this.cartItemCount = this.cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  }

  increaseQuantity(bookId: string): void {
    const item = this.cart.find((i: any) => i.book._id === bookId);
    if (item && item.quantity < item.book.stockQuantity) {
      item.quantity += 1;
      this.saveCart();
      this.updateCartCount();
    } else {
      this.toastr.warning('Not enough stock available');
    }
  }

  decreaseQuantity(bookId: string): void {
    const item = this.cart.find((i: any) => i.book._id === bookId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveCart();
      this.updateCartCount();
    }
  }

  removeItem(bookId: string): void {
    this.cart = this.cart.filter((item: any) => item.book._id !== bookId);
    this.saveCart();
    this.updateCartCount();
  }

  saveCart() {
    const cartToSave = this.cart.map(item => ({
      book: item.book,
      quantity: item.quantity
    }));
    localStorage.setItem('cart', JSON.stringify(cartToSave));
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
    this.showCartSlider = false;
  }

  toggleNav(): void {
    this.isShow = !this.isShow;
    if(this.isShow) {
      console.log('Inside if:', this.isShow);
      this.renderer.setAttribute(this.navbar.nativeElement, 'class', 'collapse navbar-collapse justify-content-end show');
      // this.renderer.addClass(this.navbar.nativeElement, 'show');
    } else {
      console.log('Inside else:', this.isShow);
      this.renderer.setAttribute(this.navbar.nativeElement, 'class', 'collapse navbar-collapse justify-content-end');
      // this.renderer.removeClass(this.navbar.nativeElement, 'show');
    }
  }
}