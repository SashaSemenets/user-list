import { createSelector } from "@ngrx/store";
import { UsersStateInterface } from "../types/usersState.interface";
import { AppStateInterface } from "@shared/types/appState.interface";

export const usersFeatureSelector = (
  state: AppStateInterface
): UsersStateInterface => state.users;

export const usersSelector = createSelector(
  usersFeatureSelector,
  (usersState: UsersStateInterface) => usersState.data
);

export const notificationSelector = createSelector(
  usersFeatureSelector,
  (usersState: UsersStateInterface) => usersState.notification
);

export const selectedUserSelector = createSelector(
  usersFeatureSelector,
  (usersState: UsersStateInterface) => usersState.selectedUser
);
