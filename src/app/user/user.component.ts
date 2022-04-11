import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { LoginComponent } from '../login/login.component';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users = [];

  types = ["user", "admin"]

  u?: User

  private GET_USERS = gql`{
    getUsers {
      id
      username
      firstname
      lastname
      password
      email
      type
    }
  }`

  private GET_USER_BY_TYPE = gql`
    query GetUserByType($type: String!){
      getUserByType{
        username
      }
    }`


  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.u = {
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      type: ""
    }
  }

  getUsers(){
    this.apollo.watchQuery<any>({
      query: this.GET_USERS,
      errorPolicy: 'all'
    }).valueChanges.subscribe(response => {
      console.log(response)
      console.log(response.data)
      this.users = response.data?.getUsers
      console.log(this.users)
    })
  }

  getUserByType(){
    this.apollo.watchQuery<any>({
      query: this.GET_USERS,
      errorPolicy: 'all'
    }).valueChanges.subscribe(response => {
      console.log(response)
      console.log(response.data)
      this.users = response.data?.getUsers
      console.log(this.users)
    })
  }

  onSubmitData(){
    this.getUserByType()
  }
}
