import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Order } from 'src/app/models/order.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  users:User[]=[];
  filtered:User[]=[];
  books:Book[]=[]
  orders:Order[]=[]
  reviews:Review[]=[]
  userCount = 0;
  bookCount = 0;
  orderCount = 0;
  reviewCount = 0;
  
  constructor(private authService:AuthService,private bookService:BookService,private orderService:OrderService,private reviewService:ReviewService){}
  ngOnInit(): void {
    this.totalUsers()
    this.totalBooks()
    this.totalOrders()
    this.totalReviews()
  }
  totalUsers(){
    this.authService.getAllUsers().subscribe((data)=>{
      this.users=data;
      this.filtered=data;
      // console.log(this.filtered)
      // this.userCount=data.length
      this.filtered=this.users.filter(user=>user.userRole==='User' || user.userRole==='user'  || user.userRole==='USER')
      // console.log(this.filtered)
      this.userCount=this.filtered.length
    })
  }

  totalBooks(){
    this.bookService.getAllBooks().subscribe((data)=>{
      this.books=data;
      // console.log(data)
      this.bookCount=data.length
    })
  }

  totalOrders(){
    this.orderService.getAllOrders().subscribe((data)=>{
      this.orders=data.orders;
      this.orderCount=data.count;
    })
  }

  totalReviews(){
    this.reviewService.getAllReviews().subscribe((data)=>{
      this.reviews=data;
      // console.log(data)
      // console.log(data.length)
      this.reviewCount=data.length
    })
  }

}
