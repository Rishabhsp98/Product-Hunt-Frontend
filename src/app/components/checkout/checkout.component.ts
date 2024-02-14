import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CheckoutformService } from 'src/app/services/checkoutform.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths : number[] = [];
  creditCardYears : number[] = [];

  checkoutFormGroup :FormGroup;
  constructor(private formBuilder : FormBuilder,private checkoutformService: CheckoutformService) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
    
    
   }

  ngOnInit(): void {


    //populate credit card months
    const startMonth : number = new Date().getMonth() + 1;
    console.log("startMonth", startMonth);
    this.checkoutformService.getCreditCardMonths(startMonth).subscribe((res)=>{
      console.log("creditCardMonths", JSON.stringify(res));
      this.creditCardMonths = res;
    })

    //populate credit card years
    this.checkoutformService.getCreditCardYears().subscribe((res)=>{
      console.log("creditCardYears", JSON.stringify(res));
      this.creditCardYears = res;
    })

    // populate countries

    this.checkoutformService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );
  }

  onSubmit() {
  
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')?.value.email);
  
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);
  }

  copyShippingAddressToBillingAddress(event : Event) {

    // console.log(event);

    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // bug fix for states
      this.billingAddressStates = [];
    }
    
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.controls['creditCard'];

    const currentYear: number = new Date().getFullYear();

    const selectedYear : number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth : number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth()+1;
    }else{
      startMonth = 1;
    }
    this.checkoutformService.getCreditCardMonths(startMonth).subscribe((res)=>{
      console.log("Retirieved credit Card Months",JSON.stringify(res));
      this.creditCardMonths = res;
    })
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.checkoutformService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup!.get('state')?.setValue(data[0]);
      }
    );
  }

}
