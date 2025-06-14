import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 


import { Home } from './pages/home/home';
import { Bugs } from './pages/bugs/bugs';
import { AdminGuard } from './guards/admin-guard';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './pages/login/login';

export const routes: Routes =  [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'bugs', component: Bugs, canActivate: [AuthGuard, AdminGuard] },
  // wildcard
  { path: '**', redirectTo: 'login' },
];
