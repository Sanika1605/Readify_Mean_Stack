import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-view-books',
  templateUrl: './user-view-books.component.html',
  styleUrls: ['./user-view-books.component.css']
})

export class UserViewBooksComponent {
    books:Book[]=[];
    reviews:Review[]=[];
    searchTerm: string = '';
    selectedCategory: string = '';
    filteredBooks: Book[] = [];
    username:string = '';
    constructor(private bookService:BookService,private router:Router,private reviewService:ReviewService,private userService:AuthService,private toastr:ToastrService){
      this.loadBooks();
    }

    loadBooks(){
      this.bookService.getAllBooks().subscribe((value)=>{
        this.books=value;
        this.applyFilters();
      })
    }

    applyFilters(): void {
      this.filteredBooks = this.books.filter(book => {
        const matchesName = book.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        const matchesCategory = this.selectedCategory ? book.category === this.selectedCategory : true;
        return matchesName && matchesCategory;
      })
    }

    onSearchChange(value: string): void {
      this.searchTerm = value;
      this.applyFilters();
    }

    addReview(id?: string){
      if (!id) {
        return;
      }
      this.router.navigate(['/addreview', id])
    }
    
    getReview(id?: string){
      if (!id) {
        return;
      }
      this.reviewService.getReviewsByBookId(id).subscribe((value)=>{
        this.reviews=value;
        const userId = localStorage.getItem('user');
        this.getUser(userId);
      })
    }

    getUser(id: string | null){
      this.username = localStorage.getItem('username') ?? '';
      // this.userService.getUserById(id).subscribe((value)=>{
      //   this.username=value.username
      // })
    }

    getStars(rating:number):string[]{
      return Array(rating).fill('⭐');
    }
  
    addToCart(book: Book) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((item: any) => item.book._id === book?.['_id']);
      if (existing) {
          existing.quantity += 1;
      } else {
          cart.push({ book, quantity: 1 });
    }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.toastr.success('Book added to cart');
  }

  }
  