import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectedUserSelector } from '../../store/selectors';
import { Observable, Subject } from 'rxjs';
import { UserInterface } from '@shared/types/user.interface';
import { createUserAction, deleteUserAction, removeSelectedUserAction, updateUserAction } from '../../store/actions/getUsers.action';
import { passwordValidator } from '@utils/passwordValidator';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit, OnDestroy {
  user$: Observable<UserInterface | null>;
  public readonly destroy$ = new Subject<void>();

  @Output('closeDetail') closeDetailEvent = new EventEmitter<void>();

  selectedUser: any;
  public userForm = this._fb.group({
    username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    type: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8), passwordValidator()])],
    repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), passwordValidator()])],
  }, {
    validators: this._passwordMatchValidator
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store
  ) {
    this.user$ = this._store.pipe(select(selectedUserSelector as any));
  }

  ngOnInit(): void {
    this._subscribeOnUserSelect();
  }

  private _subscribeOnUserSelect(): void {
    this.user$
      .pipe(
        filter((user: any) => !!user),
        takeUntil(this.destroy$)
      )
      .subscribe((user: any) => {
        this._setForm(user);
        this.selectedUser = user;
      });
  }

  private _setForm(user: any): void {
    this.userForm.patchValue(user);
  }

  public submit(): void {
    const { repeatPassword, ...user } = this.userForm.value;
    let updateUser;

    if (this.isUserSelected()) updateUser = { id: this.selectedUser.id, ...user };

    this.isUserSelected()
      ? this._store.dispatch(updateUserAction({ user: updateUser }))
      : this._store.dispatch(createUserAction({ user }));

    this.closeDetailView();
  }

  public isUserSelected(): boolean {
    return !!this.selectedUser;
  }

  public getFullName(): string {
    const { firstname, lastname } = this.selectedUser;
    return `${firstname} ${lastname}`;
  }

  public deleteUser(): void {
    this._removeSelectedUser();
    this._store.dispatch(deleteUserAction({ userId: this.selectedUser.id }));
    this._closeDetail();
  }

  public closeDetailView(): void {
    if (this.isUserSelected()) this._removeSelectedUser();
    this._closeDetail();
  }

  private _removeSelectedUser(): void {
    this._store.dispatch(removeSelectedUserAction())
  }

  private _closeDetail(): void {
    this.closeDetailEvent.emit();
  }

  private _passwordMatchValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      repeatPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      repeatPassword?.setErrors(null);
      return null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
