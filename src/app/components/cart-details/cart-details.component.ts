import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private route:ActivatedRoute, private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails(){
    //get handle to the cart items
    this.cartItems=this.cartService.cartItems;
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );
    //subscribe to the cart totalQuantity
      this.cartService.totalQuantity.subscribe(
        data=>this.totalQuantity=data
      );
    //compute the cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem:CartItem){
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem:CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }
  remove(theCartItem:CartItem){
    this.cartService.remove(theCartItem);
  }

}
