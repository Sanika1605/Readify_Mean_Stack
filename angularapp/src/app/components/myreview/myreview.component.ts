import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book.model';
import { Review } from 'src/app/models/review.model';
import { BookService } from 'src/app/services/book.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyreviewComponent implements OnInit{
    reviews:Review[]=[];
    book:Book | null = null;
    constructor(private bookService:BookService,private reviewService:ReviewService,private toastr:ToastrService){}
    ngOnInit(): void {
      this.fetchReviews()
    }

    fetchReviews(){
      const userId=localStorage.getItem('user');
      if (!userId) {
        return;
      }
      this.reviewService.getReviewsByUserId(userId).subscribe((data)=>{
        this.reviews=data;
        console.log(this.reviews)
      })
    }

    deleteReviews(id?: string){
      if (!id) {
        return;
      }
      this.reviewService.deleteReview(id).subscribe(()=>{
        this.toastr.success('Review deleted successfully')
        this.ngOnInit()
      })
    }

    viewProduct(bookOrId?: Book | string){
      if (!bookOrId) {
        return;
      }

      if (typeof bookOrId === 'string') {
        this.bookService.getBookById(bookOrId).subscribe((value)=>{
          this.book = value;
        });
        return;
      }

      this.book = bookOrId;
    }
}
