import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList : OrderHistory[] = [];
  storage : Storage = sessionStorage;
  constructor(private orderHistoryService : OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }
  handleOrderHistory() {
    
    //read user's Email address from session storage
    let userEmail = this.storage.getItem('userEmail')
 
    if(userEmail == null) 
        userEmail = '{"userEmail":"null"}';
 
    const theEmail = JSON.parse(userEmail)

    //retrieve order history from service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe((res)=>{
        this.orderHistoryList = res._embedded.orders;
    })
  }

}
