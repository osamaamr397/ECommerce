import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { State } from "@popperjs/core";
import { Country } from "src/app/common/country";
import { CartService } from "src/app/services/cart.service";
import { Luv2ShopFormService } from "src/app/services/luv2-shop-form.service";
import { Luv2ShopeValidators } from "src/app/validators/luv2-shope-validators";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup; //should be declared in app.module.ts in imports
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creaditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {

      //this to show totalprice and quantity in checkout.html
    this.reviewCartDetails()


    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),

        lastName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),

        email: new FormControl("", [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),

        city: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),
        state: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),
      }),
      billingAdress: this.formBuilder.group({
        street: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),

        city: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),
        state: new FormControl("", [Validators.required,Validators.minLength(2)]),
        country: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopeValidators.notOnlyWhitespace,
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        NameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopeValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        experationMonth: [""],
        experationYear: [""],
      }),
    });
    ///
    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth:" + startMonth);
    this.luv2ShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creaditCardMonths = data;
      });

    //populate credit card Years
    this.luv2ShopFormService.getCreditCardYears().subscribe((data) => {
      console.log("Retrieved credit card Years: " + JSON.stringify(data));
      this.creditCardYears = data;
    });

    //populate the countries
    this.luv2ShopFormService.getCountries().subscribe((data) => {
      console.log("Retrieved countries: " + JSON.stringify(data));
      this.countries = data;
    });
  }

  get firstName() {
    return this.checkoutFormGroup.get("customer.firstName");
  }
  get lastName() {
    return this.checkoutFormGroup.get("customer.lastName");
  }
  get email() {
    return this.checkoutFormGroup.get("customer.email");
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get("shippingAddress.city");
  }
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get("shippingAddress.street");
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get("shippingAddress.state");
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get("shippingAddress.zipCode");
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get("shippingAddress.country");
  }

  /////billing Addreess 
  
  get billingAdressCity() {
    return this.checkoutFormGroup.get("billingAdress.city");
  }
  get billingAdressStreet() {
    return this.checkoutFormGroup.get("billingAdress.street");
  }
  get billingAdressState() {
    return this.checkoutFormGroup.get("billingAdress.state");
  }
  get billingAdressZipCode() {
    return this.checkoutFormGroup.get("billingAdress.zipCode");
  }
  get billingAdressCountry() {
    return this.checkoutFormGroup.get("billingAdress.country");
  }

  get creditCardType(){
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard(){
    return this.checkoutFormGroup.get('creditCard.NameOnCard');
  }

  get creditCardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode(){
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get("customer")?.value);
    console.log(this.checkoutFormGroup.get("customer")?.value.email);
    console.log(
      "the shipping address country is " +
        this.checkoutFormGroup.get("shippingAddress")?.value.country.name
    );
    console.log(
      "the shipping address states is " +
        this.checkoutFormGroup.get("shippingAddress")?.value.state.name
    );
  }
  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls["billingAdress"].setValue(
        this.checkoutFormGroup.controls["shippingAddress"].value
      );

      //bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls["billingAdress"].reset();

      //bug fix for states
      this.billingAddressStates = [];
    }
  }
  handleMonthAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.experationYear
    );

    //if the current year equals the selected year,then start with the current month
    let startMonth: number;
    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.luv2ShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creaditCardMonths = data;
      });
  }
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code; //formGroup.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === "shippingAddress") {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // select first item by default
      formGroup?.get("state")?.setValue(data[0]);
    });
  }

  reviewCartDetails(){
    //subscribe  to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity=>this.totalQuantity=totalQuantity
    );
    //subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice=>this.totalPrice=totalPrice
    );
  }

}
