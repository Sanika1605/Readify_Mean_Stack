import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { apiConfig } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  register(user:User):Observable<any>{
    return this.http.post<any>(`${apiConfig.apiUrl}/users/register`,user);
  }
  login(login:Login):Observable<any>{
    return this.http.post<any>(`${apiConfig.apiUrl}/users/login`,login);
  }
  logout():void{
    localStorage.clear()
  }
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${apiConfig.apiUrl}/users/`);
  }
  getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${apiConfig.apiUrl}/users/${id}`);
  }

  isAuthenticated():boolean{//loggedin
    let user = localStorage.getItem('user')
    return user?true:false
  }
  isAdmin(){
    let role=localStorage.getItem('role');
    if(role && role.toLowerCase() === 'admin'){
      return true;
    }else{
      return false;
    }
  }
  forgotPassword(user:any):Observable<any>{
    return this.http.put<any>(`${apiConfig.apiUrl}/users/forgot-password`,user);
  }

  checkEmailExists(email:string):Observable<any>{
    return this.http.post(`${apiConfig.apiUrl}/users/verify-email`,{email});
  }
}
