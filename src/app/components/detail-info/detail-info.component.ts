import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { filter } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {
  @Output('closeDetail') closeDetailEvent = new EventEmitter<void>();

  selectedUser: any;
  public userForm = this._fb.group({
    username: [],
    firstname: [],
    lastname: [],
    email: [],
    type: [],
    password: [],
    repeatPassword: [],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dataService: DataService,
  ) { }

  ngOnInit(): void {
    this._subscribeOnUserSelect();
  }

  private _subscribeOnUserSelect(): void {
    this._dataService.selectUser$
      .pipe(
        filter((user: any) => !!user)
      )
      .subscribe((user: any) => {
        this._setForm(user);
        this.selectedUser = user;
      });
  }

  private _setForm(user: any): void {
    console.log('_setForm', user)
    this.userForm.patchValue(user);
  }

  public submit(): void {

  }

  public isUserSelected(): boolean {
    return !!this.selectedUser;
  }

  public getFullName(): string {
    const { firstname, lastname } = this.selectedUser;
    return `${firstname} ${lastname}`;
  }

  public deleteUser(): void {}

  public closeDetailView(): void {
    this.closeDetailEvent.emit();
  }
}
