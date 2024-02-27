import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  
  constructor( private toaster : ToastrService) { }

  ngOnInit(): void {
    this.toaster.success(`Hi ,Welcome to the Members Page!`);
  }

}
