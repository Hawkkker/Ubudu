import { Injectable } from '@angular/core';
import { IParticipation } from 'src/app/interfaces/IParticipation';
import { IUser } from 'src/app/interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { unsupported } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  user: any;
  //response: any;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  authentification(username: string, password: string) {
    this.http.post('http://localhost:4000/users/authenticate', {username: username, password: password})
    .subscribe(
      res => {
        this.user = res;
        this.router.navigate(['questionnaire'])
      },
      err => {
        console.log("An error occured :", err.message)
        this.router.navigate(['register'])
      });
  }

  logout() {
    this.user = null
  }

  register(username: string, password: string) {
    this.http.post('http://localhost:4000/users/register', {username: username, password: password})
    .subscribe(
      res => {
        this.router.navigate(['questionnaire'])
      },
      err => {
        console.log("An error occured :", err.message)
        this.router.navigate(['login'])
      });
  }

  submit(participation: IParticipation) {
    this.http.put('http://localhost:4000/users/'+ this.user.id, {participation}, {headers: {
      'Content-Type': 'application/json',
      'Authorization': this.user.token
    }})
    .subscribe(
      res => {
        this.user = res;
        this.router.navigate(['questionnaire'])
      },
      err => {
        console.log("An error occured :", err.message)
        this.router.navigate(['login'])
      });
  }
}
