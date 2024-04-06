import { createReducer, on, Action } from '@ngrx/store'
import { UsersStateInterface } from '../types/usersState.interface'
import { createUserAction, deleteUserAction, getUsersAction, getUsersFailureAction, getUsersSuccessAction, removeNotification, removeSelectedUserAction, setUserAction, updateUserAction } from './actions/getUsers.action'
import { NotificationType } from '@shared/types/types.enum'

const initialState: UsersStateInterface = {
  notification: null,
  data: [],
  selectedUser: null
}

const articleReducer = createReducer(
  initialState,
  on(
    getUsersAction,
    (state): UsersStateInterface => ({
      ...state,
    })
  ),
  on(
    getUsersSuccessAction,
    (state, action): UsersStateInterface => ({
      ...state,
      data: action.users,
      notification: null,
    })
  ),
  on(
    getUsersFailureAction,
    (state, action): UsersStateInterface => ({
      ...state,
      notification: action.notification,
    })
  ),
  on(
    setUserAction,
    (state, action): UsersStateInterface => ({
      ...state,
      selectedUser: action.user,
    })
  ),
  on(
    removeSelectedUserAction,
    (state): UsersStateInterface => ({
      ...state,
      selectedUser: null
    })
  ),
  on(
    deleteUserAction,
    (state, action): UsersStateInterface => ({
      ...state,
      data: state.data.filter(user => user.id !== action.userId),
      notification: {
        type: NotificationType.Success,
        message: `User was deleted`
      }
    })
  ),
  on(
    createUserAction,
    (state, action): UsersStateInterface => ({
      ...state,
      data: [...state.data, { ...action.user, id: (Number(state.data[state.data.length - 1].id) + 1).toString()}],
      notification: {
        type: NotificationType.Success,
        message: `User was created`
      }
    })
  ),
  on(
    updateUserAction,
    (state, action): UsersStateInterface => ({
      ...state,
      data: state.data.map(user => {
        if (user.id === action.user.id) {
          return { ...action.user };
        }
        return user;
      }),
      notification: {
        type: NotificationType.Success,
        message: `User was updated`
      }
    })
  ),
  on(
    removeNotification,
    (state): UsersStateInterface => ({
      ...state,
      notification: null,
    })
  )
)

export function reducers(state: UsersStateInterface, action: Action) {
  return articleReducer(state, action)
}
