import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!:FormGroup; //should be declared in app.module.ts in imports
  totalPrice:number=0;
  totalQuantity:number=0;
  
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firtName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAdress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        NameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        experationMonth:[''],
        experationYear:['']
      })
    });
  }
  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value)
    console.log(this.checkoutFormGroup.get('customer')?.value.email)

  }
  copyShippingAddressToBillingAddress(event: any){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAdress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    }
    else{
      this.checkoutFormGroup.controls['billingAdress'].reset();
    }
  }

}
