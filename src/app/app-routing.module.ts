import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';  
import { AccountComponent } from './account/account.component';  
import { LoginComponent } from './login/login.component';  


const routes: Routes = [
  { path: '', component: LoginComponent },           
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountComponent }           
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }