import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { DetailInfoComponent } from './components/detail-info/detail-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    DetailInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
