import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(environment.baseUrl + `dashboard.json`);
  }
}
