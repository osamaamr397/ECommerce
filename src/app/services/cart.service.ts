import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartItems: CartItem[] = []; //our shopping cart an array of cartItem objects
  totalPrice: Subject<number> = new Subject<number>(); /*
  subject is a subclass of observable,
   we can use subject to publish events in our code.
   the event will be sent to all of the subscribers
  */
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() {}

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;
    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id
      /*
      for (let tempCartItem of this.cartItems) {
        
        if (tempCartItem.id == theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
       }
       */
      
      existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);
      //check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
      
    }
    if (alreadyExistsInCart) {
      //increment the quantiy
      existingCartItem!.quantity++;
    } else {
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }
    //compute the card total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
      console.log(`totalPriceAmr:${totalPriceValue},totalQuantity:${totalQuantityValue}`);
    }
    //publish  the new values .... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    /*
  this will publish events to all subscribers one event for totalPrice
  one event fot totalQuantity
  (next )->publish / send the event

  */
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("contents of the cart");
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name:${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`
      );
    }
    console.log(
      `totalPrice:${totalPriceValue.toFixed(
        2
      )},totalQuantity:${totalQuantityValue}`
    );
    console.log(`----------`);
  }

  decrementQuantity(theCartItem:CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }

  }
  remove(theCartItem:CartItem){
    //get index of the item in the array
    const itemIndex=this.cartItems.findIndex(tempCartItem=>tempCartItem.id===theCartItem.id);

    //if found , remove the item from the array at the given index
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}
