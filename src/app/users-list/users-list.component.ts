import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUsersAction, removeNotification } from './store/actions/getUsers.action';
import { notificationSelector } from './store/selectors';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationInterface } from '@shared/types/notification.interface';
import { NotificationType } from '@shared/types/types.enum';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public showDetailInfo = false;
  notification$: Observable<NotificationInterface | null> | undefined;
  public readonly eNotificationType = NotificationType;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this._getData();
    this._subscribeOnErrorUpate();
  }

  private _getData(): void {
    this._store.dispatch(getUsersAction());
  }

  private _subscribeOnErrorUpate(): void {
    this.notification$ = this._store.pipe(select(notificationSelector as any));
    this.notification$
      .pipe(filter((err: NotificationInterface | null) => !!err))
      .subscribe(() => {
        setTimeout(() => {
          this._store.dispatch(removeNotification());
        }, 3000);
      });
  }

  public openModal(): void {
    this.showDetailInfo = true;
  }

  public closeDetailView(): void {
    this.showDetailInfo = false;
  }
}
