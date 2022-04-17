import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './userManage/login/login.component';
import { RegisterComponent } from './userManage/register/register.component';
import { ImagesComponent } from './images/images.component';
import { NotFoundComponent } from './not-found.component';
import { MyImagesComponent } from './my-images/my-images.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { RecoveryComponent } from './userManage/password-recovery/recovery.component';
import { NewPasswordComponent } from './userManage/new-password/new-password.component';

const routes: Routes = [
  {path: '', component: ImagesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: 'newPassword', component: NewPasswordComponent},
  {path: 'images/:id', component: MyImagesComponent},
  {path: 'addPhoto', component: AddPhotoComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
