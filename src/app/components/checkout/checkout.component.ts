import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutformService } from 'src/app/services/checkoutform.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


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
  }

  onSubmit() {
  
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  copyShippingAddressToBillingAddress(event : Event) {

    // console.log(event);

    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
    
  }

}
