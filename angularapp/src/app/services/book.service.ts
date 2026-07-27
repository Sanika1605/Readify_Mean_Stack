import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { apiConfig } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }
  
  getAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(`${apiConfig.apiUrl}/books`)
  }
  getBookById(id:string):Observable<Book>{
    return this.http.get<Book>(`${apiConfig.apiUrl}/books/getBookById/${id}`)
  }
  addBook(book:Book):Observable<Book>{
    return this.http.post<Book>(`${apiConfig.apiUrl}/books/addBook`,book)
  }
  updateBook(book:Book):Observable<Book>{
    return this.http.put<Book>(`${apiConfig.apiUrl}/books/update-book/${book?.['_id']}`,book);
  }
  deleteBook(id:string):Observable<Book>{
    return this.http.delete<Book>(`${apiConfig.apiUrl}/books/deleteBook/${id}`)
  }
}
