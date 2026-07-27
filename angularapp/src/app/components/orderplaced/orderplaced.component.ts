// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Order } from 'src/app/models/order.model';
// import { OrderService } from 'src/app/services/order.service';

// @Component({
//   selector: 'app-orderplaced',
//   templateUrl: './orderplaced.component.html',
//   styleUrls: ['./orderplaced.component.css']
// })
// export class OrderplacedComponent implements OnInit{
//   orders:Order[]=[];
//   constructor(private route:ActivatedRoute, private orderService:OrderService,private toastr:ToastrService,private router:Router){}

//   ngOnInit(): void {
//     this.fetchOrders()
//   }

//   fetchOrders(){
//     this.orderService.getAllOrders().subscribe((data)=>{
//       console.log(data);
//       this.orders=data?.['orders']
//     })
//   }

//   updateStatus(id:string,event:Event){
//     let status=(event.target as HTMLSelectElement).value
//     // this.orderService.updateOrder(id,{orderStatus:status}).subscribe((data)=>{
//     //   console.log(data);
//     //   this.toastr.success('status updated')
//     //   this.fetchOrders()
//     // })
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm: string = '';
  sortOption: string = 'Ascending';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedOrderItems: any[] = [];
  selectedUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data?.['orders'] || [];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredOrders = this.orders.filter(order =>
      order.shippingAddress.toLowerCase().includes(term) ||
      order.billingAddress.toLowerCase().includes(term) ||
      order.orderStatus.toLowerCase().includes(term)
    );

    if (this.sortOption === 'Ascending') {
      this.filteredOrders.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
    } else if (this.sortOption === 'Descending') {
      this.filteredOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    } else if (this.sortOption === 'AmountAsc') {
      this.filteredOrders.sort((a, b) => a.totalAmount - b.totalAmount);
    } else if (this.sortOption === 'AmountDesc') {
      this.filteredOrders.sort((a, b) => b.totalAmount - a.totalAmount);
    }
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }

  onSortChange(value: string): void {
    this.sortOption = value;
    this.applyFilters();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }

  updateStatus(id: string | undefined, status: string): void {
    const order = this.orders.find(o => o?._id === id);

    if (order?.orderStatus === 'Delivered') {
      this.toastr.warning('Delivered orders cannot be updated.');
      return;
    }

    if (!order) {
      return;
    }

    const updatedOrder: Order = { ...order, orderStatus: status, orderDate: order.orderDate ?? '', totalAmount: order.totalAmount ?? 0, user: order.user ?? '', orderItems: order.orderItems ?? [], shippingAddress: order.shippingAddress ?? '', billingAddress: order.billingAddress ?? '' };
    this.orderService.updateOrder(updatedOrder).subscribe({
      next: () => {
        this.toastr.success('Order status updated');
        this.fetchOrders();
      },
      error: () => {
        this.toastr.error('Failed to update status');
      }
    });
  }

  get paginatedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredOrders.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPage(): number {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage)
  }

  viewOrderItems(order: Order): void {
    this.selectedOrderItems = order.orderItems || [];
  }

  viewUserProfile(order: Order): void {
    this.selectedUser = order.user || null;
  }
  
}



