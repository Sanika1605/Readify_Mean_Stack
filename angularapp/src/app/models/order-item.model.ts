export class OrderItem {
    quantity!:number;
    price!:number;
    book!:string;
    orderItem?: {
        book?: { name?: string };
        quantity?: number;
    };
}



// export class OrderItem {
//     quantity:number;
//     price:number;
//     book:string;
// }