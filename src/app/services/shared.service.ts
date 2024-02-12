import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  sharedCategoryName : string | undefined;
  categorySelected : boolean = false;
  constructor() { }
}
