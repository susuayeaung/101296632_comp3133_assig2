import { Component, OnInit } from '@angular/core';
import { ApolloClient } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings = []
  
  private GET_BOOKINGS = gql`{ 
    getBookings {
      listing_id
      booking_id
      booking_date
      booking_start
      booking_end
      username
    }
  }`

  private UPDATE_BOOKING = gql`
  mutation UpdateBooking {
    updateBooking(
      id: "621936b4749c4e248831ef30"
      listing_id: "L001",
      booking_id: "B004",
      booking_date: "01-26-2022",
      booking_start: "01-27-2022",
      booking_end: "01-30-2022",
      username: "kamren"
    ){
      id
      listing_id
      booking_id
      booking_date
      booking_start
      booking_end
      username
    }
  }`

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  getBookings(){
    this.apollo.watchQuery<any>({
      query: this.GET_BOOKINGS,
      errorPolicy: 'all'
    }).valueChanges.subscribe(response => {
      console.log(response)
      console.log(response.data)
      this.bookings = response.data?.getBookings
      console.log(this.bookings)
    })
  }
}
