import { Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { usersSelector } from '../../store/selectors';
import { Observable } from 'rxjs';
import { UserInterface } from '@shared/types/user.interface';
import { setUserAction } from '../../store/actions/getUsers.action';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  users$: Observable<UserInterface[] | null>;

  @Output('openDetailView') openDetailViewEvent = new EventEmitter<void>();

  constructor(private readonly _store: Store) {
    this.users$ = this._store.pipe(select(usersSelector as any));
  }

  onRowClick(user: UserInterface) {
    this._store.dispatch(setUserAction({ user }));
    this.openDetailViewEvent.emit();
  }
}
