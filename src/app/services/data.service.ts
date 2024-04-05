import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly _userList$ = new BehaviorSubject<any[]>([]);
  public readonly userList$ = this._userList$.asObservable();
  private readonly _selectUser$ = new BehaviorSubject<any>(null);
  public readonly selectUser$ = this._selectUser$.asObservable();

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get<any>('../../assets/data.json')
      .pipe(
        filter((result: any) => !!result.length),
        tap((result: any) => this._setData(result)),
      );
  }

  private _setData(data: any): void {
    this._userList$.next(data);
  }

  public setSelectedUser(user: any): void {
    this._selectUser$.next(user);
  }
}
