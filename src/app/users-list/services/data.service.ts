import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private readonly _http: HttpClient) { }

  public getData(): Observable<any> {
    return this._http.get<any>('../../assets/data.json');
  }
}
