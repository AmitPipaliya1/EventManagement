import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/Environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {


  id: any
  image: any
  vieweventflag:string;
  constructor(private http: HttpClient) { }


  // This is Api call Service For ALL Time 
  public ApiCall(Endpoint: any, databody: any): Observable<any> {
    const url = environment.localHostUrl + Endpoint;
    return this.http.post<any>(url, databody);
  }
}
