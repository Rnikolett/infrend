import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { ReadComponent } from './read/read.component';
import { ReadPartnerComponent } from './read-partner/read-partner.component';
import { CreatePartnerComponent } from './create-partner/create-partner.component';
import { LoanComponent } from './loan/loan.component';
import { ReturnComponent } from './return/return.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'create', component:CreateComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:'create/:id', component:CreateComponent, canActivate:[AuthGuard]},
  {path:'read', component:ReadComponent, canActivate:[AuthGuard]},
  {path:'readPartner', component:ReadPartnerComponent, canActivate:[AuthGuard]},
  {path:'createPartner/:id', component:CreatePartnerComponent, canActivate:[AuthGuard]},
  {path:'createMachine/:id', component:CreateComponent, canActivate:[AuthGuard]},
  {path:'createPartner', component:CreatePartnerComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:'loan', component:LoanComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:'return', component:ReturnComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:'newUser', component:NewUserComponent, canActivate:[AuthGuard, RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
