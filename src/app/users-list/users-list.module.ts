import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/user-table/user-table.component';
import { DetailInfoComponent } from './components/detail-info/detail-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { GetUsersEffect } from './store/effects/getUsers.effect';
import { reducers } from './store/reducers';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
]

@NgModule({
  declarations: [
    UsersListComponent,
    UserTableComponent,
    DetailInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('users', reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forFeature([GetUsersEffect]),
  ]
})
export class UsersListModule { }
