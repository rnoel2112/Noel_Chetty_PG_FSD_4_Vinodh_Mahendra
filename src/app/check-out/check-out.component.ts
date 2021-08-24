import { Component, OnInit } from '@angular/core';
import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cartitems  : CartItem[];
  totalAmount: number = 0;
  count:number =0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.readCartItem().subscribe ((item)=>{
      this.cartitems = item.map((doc)=>{
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data() as {}
        } as CartItem
      })
    })
  }


// Not nice code - need to fix it later
 locationsSum(total:number, loc:number ) {
   if (loc == 0){
    this.totalAmount=0;
   }
  console.log ("total :" + total);
  console.log ("loc :" + loc);
  this.totalAmount += total;
  console.log ("Total Amount purchased :" + this.totalAmount);

  }
}
