import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutformService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data : number[] = [];


    for(let themonth = startMonth; themonth <=12;themonth++) {
      data.push(themonth);
    }

    return of(data);
  }

  getCreditCardYears( ): Observable<number[]>{

    let data : number[] = [];

    let startyear : number = new Date().getFullYear();
    let endYear : number =  startyear + 10;
    for(let theYear = startyear; theYear <=endYear;theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
