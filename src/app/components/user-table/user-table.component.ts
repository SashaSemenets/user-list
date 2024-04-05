import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input('userList') userListProps: any[] | null = [];

  @Output('selectUser') selectUserEvent = new EventEmitter<void>();

  onRowClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.parentElement?.tagName === 'TR') {
      const userId = target.parentElement?.id;
      const user = this.userListProps?.find(user => user.id === userId);
      this.selectUserEvent.emit(user)
    }
  }
}
