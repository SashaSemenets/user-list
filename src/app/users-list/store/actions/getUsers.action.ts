import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { UserInterface } from "@shared/types/user.interface";
import { NotificationInterface } from "@shared/types/notification.interface";

export const getUsersAction = createAction(
  ActionTypes.GET_USERS,
);

export const getUsersSuccessAction = createAction(
  ActionTypes.GET_USERS_SUCCESS,
  props<{ users: UserInterface[] }>()
);

export const getUsersFailureAction = createAction(
  ActionTypes.GET_USERS_FAILURE,
  props<{ notification: NotificationInterface }>()
);

export const setUserAction = createAction(
  ActionTypes.SET_USER,
  props<{ user: UserInterface }>()
);

export const removeSelectedUserAction = createAction(
  ActionTypes.REMOVE_USER,
);

export const deleteUserAction = createAction(
  ActionTypes.DELETE_USER,
  props<{ userId: string }>()
);

export const createUserAction = createAction(
  ActionTypes.CREATE_USER,
  props<{ user: UserInterface }>()
);

export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{ user: UserInterface }>()
);

export const removeNotification = createAction(
  ActionTypes.REMOVE_NOTIFICATION,
);
