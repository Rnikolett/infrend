import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReadComponent } from './read/read.component';
import { ReadPartnerComponent } from './read-partner/read-partner.component';
import { CreateComponent } from './create/create.component';
import { CreatePartnerComponent } from './create-partner/create-partner.component';
import { LoanComponent } from './loan/loan.component';
import { ReturnComponent } from './return/return.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ReadComponent,
    ReadPartnerComponent,
    CreateComponent,
    CreatePartnerComponent,
    LoanComponent,
    ReturnComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
