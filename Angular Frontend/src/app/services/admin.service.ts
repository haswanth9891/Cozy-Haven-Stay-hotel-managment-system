import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  postAdmin(user: Admin): Observable<Admin> {
    console.log(user);

    return this.http.post<Admin>('http://localhost:8081/api/admin/add-admin', user)


  }

  getHotelowners(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8081/api/admin/getall-hotelowners", { headers: this.getHeaders() });
  }

  deleteHotelowner(hotelownerId: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8081/api/admin/delete-hotelowner-account" + `/${hotelownerId}`, { headers: this.getHeaders(), responseType: 'text' as 'json' });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8081/api/admin/getall-users", { headers: this.getHeaders() });
  }

  deleteUser(userId: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8081/api/admin/delete-user-account" + `/${userId}`, { headers: this.getHeaders(), responseType: 'text' as 'json' });
  }


}
