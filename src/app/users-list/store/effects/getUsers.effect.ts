import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { getUsersAction, getUsersFailureAction, getUsersSuccessAction } from "../actions/getUsers.action";
import { DataService } from "../../services/data.service";
import { UserInterface } from "@shared/types/user.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationType } from "@shared/types/types.enum";

@Injectable()
export class GetUsersEffect {
  constructor(
    private actions$: Actions,
    private readonly _dataService: DataService
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersAction),
      switchMap(() => {
        return this._dataService.getData().pipe(
          map((users: UserInterface[]) => {
            return getUsersSuccessAction({ users });
          }),
          catchError((err: HttpErrorResponse ) => {
            return of(getUsersFailureAction({ notification: {
              type: NotificationType.Error,
              message: err.message
            }}))
          })
        )
      })
    )
  );
}
