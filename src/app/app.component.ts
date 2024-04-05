import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public showDetailInfo = false;
  public data$ = this._dataService.userList$;

  constructor(private readonly _dataService: DataService) {}

  ngOnInit(): void {
    this._getData();
  }

  private _getData(): void {
    this._dataService.getData()
      .subscribe();
  }

  public openModal(): void {
    this.showDetailInfo = true;
  }

  public handleSelectedUser(user: any): void {
    this._dataService.setSelectedUser(user);
    this.openModal();
  }

  public closeDetailView(): void {
    this.showDetailInfo = false;
  }
}
