import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { apiConfig } from 'src/apiconfig';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  placeOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(`${apiConfig.apiUrl}/order/addOrder`,order)
  }
  getAllOrders():Observable<{orders: Order[]; count: number}>{
    return this.http.get<{orders: Order[]; count: number}>(`${apiConfig.apiUrl}/order/getAllOrders`)
  }
  getOrdersByUserId(id:string):Observable<{order:Order[]}>{
    return this.http.get<{order:Order[]}>(`${apiConfig.apiUrl}/order/getOrderByUserId/${id}`)
  }
  updateOrder(order:Order):Observable<Order>{
    return this.http.put<Order>(`${apiConfig.apiUrl}/order/updateOrder/${order?.['_id']}`,order)
  }
  deleteOrder(id:string):Observable<void>{
    return this.http.delete<void>(`${apiConfig.apiUrl}/order/deleteOrder/${id}`)
  }
}
