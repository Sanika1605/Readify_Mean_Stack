import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { apiConfig } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  constructor(private http:HttpClient) { }
  addReview(review:Review):Observable<Review>{
    return this.http.post<Review>(`${apiConfig.apiUrl}/review/addReview`,review)
  }
  getReviewById(id:number):Observable<Review>{
    return this.http.get<Review>(`${apiConfig.apiUrl}/review/getReviewById/${id}`)
  }
  getAllReviews():Observable<Review[]>{
    return this.http.get<Review[]>(`${apiConfig.apiUrl}/review/getAllReviews`)
  }
  getReviewsByUserId(userId:string):Observable<Review[]>{
    return this.http.get<Review[]>(`${apiConfig.apiUrl}/review/getReviewsByUserId/${userId}`)
  }
  getReviewsByBookId(bookId:string):Observable<Review[]>{
    return this.http.get<Review[]>(`${apiConfig.apiUrl}/review/getReviewsByBookId/${bookId}`)
  }
  updateReview(id:number,review:Review):Observable<Review>{
    return this.http.put<Review>(`${apiConfig.apiUrl}/review/updateReview/${id}`,review)
  }
  deleteReview(id:string):Observable<void>{
    return this.http.delete<void>(`${apiConfig.apiUrl}/review/deleteReview/${id}`)
  }
}
