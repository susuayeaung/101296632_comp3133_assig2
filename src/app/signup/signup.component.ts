import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  u?: User

  private ADD_NEW_USER = gql`
  mutation addNewUser($unm: String!, $fnm: String!, $lnm: String!, $pw: String!, $eml: String!, $tp: String!) {
    addUser(
      username: $unm,
      firstname: $fnm,
      lastname: $lnm,
      password: $pw,
      email: $eml,
      type: $tp
    ){
      id
      username
      firstname
      lastname
      password
      email
      type
    }
  }`

  constructor(private apollo: Apollo) {
    
   }

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

  onAddUserButtonClick(){
    this.addNewUser()
  }

  addNewUser(){
    this.apollo.mutate({
      mutation: this.ADD_NEW_USER,
      variables: {
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        type: "" 
      }
    }).subscribe(res => {
      console.log(res)
    })
  }

  onSubmitData(data: any){
    console.log(data)
  }
}
