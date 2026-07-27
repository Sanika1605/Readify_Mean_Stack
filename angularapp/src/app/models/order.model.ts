import { OrderItem } from "./order-item.model";

export class Order {
    _id?:string;
    orderStatus!:string;
    orderDate!:string;
    totalAmount!:number;
    user!:string;
    orderItems!:OrderItem[];
    shippingAddress!:string;
    billingAddress!:string;
}
// import { OrderItem } from "./order-item.model";

// export class Order {
//     _id?:string;
//     orderStatus:string;
//     orderDate:string;
//     totalAmount:number;
//     user:string;
//     orderItems:OrderItem[];
//     shippingAddress:string;
//     billingAddress:string;
// }
