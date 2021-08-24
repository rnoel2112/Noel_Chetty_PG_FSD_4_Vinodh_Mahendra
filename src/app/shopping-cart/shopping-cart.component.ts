import { Component, OnInit } from '@angular/core';
import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartFormData= new CartItem();
  cartitems : CartItem[];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.readCartItem().subscribe ((item)=>{
      this.cartitems = item.map((doc)=>{
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data() as {}
        } as CartItem
      })
      console.log("Cart Item Received:" + item);
    })

  }

  saveData(){
    console.log("Saving data: " + this.cartFormData);
    console.log( this.cartFormData.title);
    console.log( this.cartFormData.price);
    this.cartFormData.total = this.cartFormData.price * this.cartFormData.quantity;
    if (this.cartFormData.id==null){
      this.cartService.saveCartItem(this.cartFormData)

    }
    else {
      console.log ("In Save for Update")
      console.log("Id:"+this.cartFormData.id);
      console.log("Price:"+this.cartFormData.price);
      this.cartService.updateCartItem(this.cartFormData)
    }

    this.cartFormData= new CartItem();
    //foodForm.resetForm()

  }

  editData(cartItem:CartItem){
    this.cartFormData = cartItem;
    this.cartFormData.total = cartItem.price * cartItem.quantity;
  }

  deleteData(cartItem:CartItem){
    this.cartService.deleteCartItems(cartItem);
  }

  clear(){
    this.cartFormData= new CartItem();
  }


}
