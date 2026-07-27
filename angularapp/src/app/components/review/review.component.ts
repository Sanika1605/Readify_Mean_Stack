// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Review } from 'src/app/models/review.model';
// import { ReviewService } from 'src/app/services/review.service';

// @Component({
//   selector: 'app-review',
//   templateUrl: './review.component.html',
//   styleUrls: ['./review.component.css']
// })

// export class ReviewComponent implements OnInit{
//   bookId:string;
//   review:Review={
//     reviewText:'',
//     rating:0,
//     user:'',
//     book:''
//   }

//   constructor(private route:ActivatedRoute, private reviewService:ReviewService,private toastr:ToastrService,private router:Router){}

//   onSubmit(reviewForm:NgForm){
//     if(reviewForm.valid){
//       this.reviewService.addReview(this.review).subscribe(()=>{
//         reviewForm.reset()
//         this.toastr.success('Review Added Successfully')
//         this.router.navigate(['/books'])
//       })
//     }
//   }

//   ngOnInit():void{
//     this.review.book=this.route.snapshot.params['id'];
//     this.review.user=localStorage.getItem('user');
//   }

// }

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})


export class ReviewComponent implements OnInit {
    bookId: string = '';
    review: Review = {
    reviewText: '',
    date:'',
    rating: 0,
    user: '',
    book: ''
  };

  stars: number[] = [1, 2, 3, 4, 5];
  hoveredRating: number = 0;

  constructor(
      private route: ActivatedRoute,
      private reviewService: ReviewService,
      private toastr: ToastrService,
      private router: Router
    ) {}

  ngOnInit(): void {
      this.review.book = this.route.snapshot.params['id'];
    this.review.user = localStorage.getItem('user');
  }

  setRating(rating: number): void {
      this.review.rating = rating;
  }

  hoverRating(rating: number): void {
      this.hoveredRating = rating;
  }

  onSubmit(reviewForm: NgForm): void {
      if (reviewForm.valid) {
        this.reviewService.addReview(this.review).subscribe(() => {
          reviewForm.reset();
          this.toastr.success('Review Added Successfully');
        this.router.navigate(['/books']);
      });
    }
  }
}
