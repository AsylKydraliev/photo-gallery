import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './userManage/login/login.component';
import { RegisterComponent } from './userManage/register/register.component';
import { ImagesComponent } from './images/images.component';
import { NotFoundComponent } from './not-found.component';
import { MyImagesComponent } from './my-images/my-images.component';

const routes: Routes = [
  {path: '', component: ImagesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'images/:id', component: MyImagesComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
