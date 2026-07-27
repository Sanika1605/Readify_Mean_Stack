import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  addTocart(book:Book,quantity:number):Observable<Book>{
    return this.http.post<Book>(`/`,{book,quantity})
  }
  removeFromCart(bookId:string):Observable<Book>{
    return this.http.get<Book>(`/${bookId}`)
  }
  getCartItems():Observable<Book[]>{
    return this.http.get<Book[]>(`/`)
  }
  clearCart(id:number):Observable<Book>{
    return this.http.delete<Book>(`/${id}`)
  }
  getTotalPrice():Observable<Book>{
    return this.http.get<Book>(`/`)
  }
}
