import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RootObject } from '../Components/Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( public http : HttpClient) { 

  }

  FnFetchApi(){

        return this.http.get<RootObject>("https://randomuser.me/api/");
     
  }
}
