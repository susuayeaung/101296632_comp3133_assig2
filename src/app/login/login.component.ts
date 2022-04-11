import { Component, OnInit } from '@angular/core';
import { BookingComponent } from '../booking/booking.component';
import { ListingComponent } from '../listing/listing.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    // <select ngModel name="cities">
    //   <option [ngValue]="city" *ngFor="let city of cities">
    //     {{ city }}
    //   </option>
    // </select>
    {{ BookingComponent }}
    {{ ListingComponent }}
  }
}
