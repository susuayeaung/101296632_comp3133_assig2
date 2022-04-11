import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  listings = []
  
  private listingInfo:any;

  private GET_LISTINGS = gql`{ 
    getListings {
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }`

  private GET_LISTING_BY_NAME = gql`
    query GetListing($username: String!){
      getListingByName(username: $username) {
        listing_id
        listing_title
        description
        street
        city
        postal_code
        price
        email
        username
      }
    }`

  private ADD_NEW_LISTING = gql`
  mutation addNewListing($lId: String!, $lTitle: String!, #lDescription: String!, $lStreet: String!,
    $lCity: String!, $pCode: String!, $lPrice: String!, $lEmail: String!, $lUsername: String!) {
    addListing(
      listing_id: $lId,
      listing_title: $lTitle,
      description: $lDescription,
      street: $lStreet,
      city: $lCity,
      postal_code: $pCode,
      price: $lPrice,
      email: $lEmail,
      username: $lUsername
    ){
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }`

  constructor(private apollo: Apollo, private route:ActivatedRoute) {
    this.route.params.subscribe(values => {
      console.log(values['username'])
      this.getListingByName(values['username'])
    })
   }

  ngOnInit(): void {
  }

  getListings(){
    this.apollo.watchQuery<any>({
      query: this.GET_LISTINGS,
      errorPolicy: 'all'
    }).valueChanges.subscribe(response => {
      console.log(response)
      console.log(response.data)
      this.listings = response.data?.getListings
      console.log(this.listings)
    })
  }

  getListingByName(usernm: String){
    //const user = usernm
    this.apollo.watchQuery<any>({
      query: this.GET_LISTING_BY_NAME,
      variables: {
        username: usernm
      }
    }).valueChanges.subscribe(listing => {
      console.log(listing)
      this.listingInfo = listing
    })
  }

  onAddListingButtonClick(){
    this.addNewListing()
  }

  addNewListing(){
    this.apollo.mutate({
      mutation: this.ADD_NEW_LISTING,
      variables: {
        lId: "L002",
        lTitle: "City View Condo for rent",
 		    lDescription: "max 1000-character description",
        lStreet: "3200 Bloor Street",
	      lCity: "Toronto",
	      pCode: "M4H8Z0",
	      lPrice: "2000.00",
	      lEmail: "CONTACT@RANEE.COM",
	      lUsername: "btothee" 
      }
    }).subscribe(res => {
      console.log(res)
    })
  }
}
