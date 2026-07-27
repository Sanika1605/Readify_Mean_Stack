// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent {

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: any[] = [];
  shippingAddress: string = '';
  billingAddress: string = '';
  totalAmount: number = 0;

  constructor(private orderService: OrderService, private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.loadCart();
    // console.log(this.totalAmount)
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  }

  increaseQuantity(bookId: string): void {
    this.cart = this.cart.map(item => {
      if (item.book._id === bookId) item.quantity += 1;
      return item;
    });
    this.updateCart();
  }

  decreaseQuantity(bookId: string): void {
    this.cart = this.cart.map(item => {
      if (item.book._id === bookId && item.quantity > 1) item.quantity -= 1;
      return item;
    });
    this.updateCart();
  }

  updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotal();
  }

  placeOrder(): void {
    const userId = localStorage.getItem('user');
    const orderItems = this.cart.map(item => ({
      quantity: item.quantity,
      price: item.book.price,
      book: item.book._id
    }));
    const order: Order = {
      orderStatus: 'Pending',
      orderDate: new Date().toISOString(),
      totalAmount: this.totalAmount,
      user: userId!,
      orderItems,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress
    };
    
    this.orderService.placeOrder(order).subscribe({
      next:()=>{
        this.toastr.success('Order placed successfully');
        localStorage.removeItem('cart');
        this.router.navigate(['/myorder']);
      },
      error:()=>{
        this.toastr.error('Login to place order')
      }
      
    });
    // this.orderService.placeOrder(order).subscribe(() => {
    //   this.toastr.success('Order placed successfully');
    //   localStorage.removeItem('cart');
    //   this.router.navigate(['/myorder']);
    // });
  }
}
