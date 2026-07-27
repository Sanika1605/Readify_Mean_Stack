import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-adminviewreviews',
  templateUrl: './adminviewreviews.component.html',
  styleUrls: ['./adminviewreviews.component.css']
})
export class AdminviewreviewsComponent implements OnInit{
  reviews:Review[]=[];
  filteredReviews:Review[]=[];
  book:Book | null = null;
  searchText:string='';
  username:string='';
  email:string='';
  mobileNumber:string='';

  constructor(private reviewService:ReviewService){}

  ngOnInit(): void {
    this.loadReviews();
    // console.log(this.reviews);
  }

  loadReviews(){
    this.reviewService.getAllReviews().subscribe((data)=>{
      this.reviews=data;
      this.filteredReviews=data;
    })
  }

  getStars(rating:number):string[]{
    return Array(rating).fill('⭐');
  }

  searchReviews(){
    const text=this.searchText.toLowerCase();
    this.filteredReviews=this.reviews.filter(review=>
      review.reviewText.toLowerCase().includes(text)  || review.rating.toString().toLowerCase().includes(text) || (review.user as any)?.username?.toLowerCase().includes(text))
  }

  sortByRating(event:any){
    const order=event.target.value;
    this.filteredReviews.sort((a,b)=>{
      return order==='Ascending' ?
      a.rating - b.rating
      : b.rating - a.rating;
    });
  }

  viewUserProfile(user:User){
    this.username=user.username ?? '';
    this.email=user.email ?? '';
    this.mobileNumber=user.mobileNumber ?? '';
  }

  viewProduct(book:Book){
    this.book=book;
  }
}
