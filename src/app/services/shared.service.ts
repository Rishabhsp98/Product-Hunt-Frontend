import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  sharedCategoryName : string | any;
  categorySelected : boolean = false;
  constructor() { }
}
