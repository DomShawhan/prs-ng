import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserLogin } from '../model/userLogin';
import { UserSummary } from '../model/user-summary';

const URL: string = 'http://localhost:8080/api/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get(URL + '/') as Observable<User[]>;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get(URL + '/' + id) as Observable<User>;
  }

  createUser(user: User): Observable<User> {
    return this.http.post(URL, user) as Observable<User>;
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(URL + '/' + user.id, user) as Observable<User>;
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete(URL + '/' + id) as Observable<boolean>;
  }

  loginUser(loginDetails: UserLogin): Observable<User> {
    return this.http.post(URL + "/login", loginDetails) as Observable<User>;
  }

  getUserSummary(id: number): Observable<UserSummary> {
    return this.http.get(URL + '/usersummary/' + id) as Observable<UserSummary>;
  }
}
