import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})

export class MyorderComponent implements OnInit{

  @ViewChild('cancelOrderModal') cancelModal!: ElementRef;

  userId: string | null = null;
  orders:Order[]=[];
  orderToCancel:string | null=null;
  orderStatus:string='';
  statusSteps: string[] = ['Pending', 'Cancelled', 'Dispatched', 'OutForDelivery', 'Delivered'];
  
  openTrackModal(status: string) {
     this.orderStatus = status;
    }
    
    constructor(private orderService:OrderService,private toastr:ToastrService){}
    ngOnInit(): void {
      this.userId=localStorage.getItem('user')
      this.fetchOrders(this.userId);

    }
    fetchOrders(userId:string | null){
      if (!userId) {
        return;
      }
      this.orderService.getOrdersByUserId(userId).subscribe((data)=>{
        this.orders=data.order;
      })
    } 

    setOrderToCancel(orderId?:string){
      this.orderToCancel=orderId ?? null;
    }
    confirmCancel(){
      if(this.orderToCancel){
        this.cancelOrder(this.orderToCancel);
        this.orderToCancel=null;
      }
    }
   
    cancelOrder(orderId:string){
      this.orderService.deleteOrder(orderId).subscribe({
        next:()=>{
          this.toastr.success('Order cancelled successfully')
          this.cancelModal.nativeElement.click();
          this.fetchOrders(this.userId)
        },
        error:()=>{
          this.toastr.error('Something went wrong')
        }
      })
    }
}
