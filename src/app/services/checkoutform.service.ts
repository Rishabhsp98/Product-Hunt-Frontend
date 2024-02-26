import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutformService {

  private countriesUrl =  environment.productHuntBaseApiUrl + '/countries';
  private statesUrl =  environment.productHuntBaseApiUrl + '/states';

  constructor(private httpClient: HttpClient) { }


  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

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

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}