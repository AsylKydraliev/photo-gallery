import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './userManage/login/login.component';
import { RegisterComponent } from './userManage/register/register.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { ImagesComponent } from './images/images.component';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { LayoutComponent } from './ui/layout/layout.component';
import { AppStoreModule } from './app-store.module';
import { MatButtonModule } from '@angular/material/button';
import { MyImagesComponent } from './my-images/my-images.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { NotFoundComponent } from './not-found.component';
import { RecoveryComponent } from './userManage/password-recovery/recovery.component';
import {
  DialogExamplePasswordComponent
} from './userManage/password-recovery/dialog-password-recovery/dialog-example-password.component';
import { NewPasswordComponent } from './userManage/new-password/new-password.component';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email,public_profile'
      })
    }
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ImagesComponent,
    ValidateIdenticalDirective,
    LayoutComponent,
    MyImagesComponent,
    AddPhotoComponent,
    FileInputComponent,
    DialogExampleComponent,
    NotFoundComponent,
    RecoveryComponent,
    DialogExamplePasswordComponent,
    NewPasswordComponent,
  ],
  entryComponents: [DialogExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    FlexModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AppStoreModule,
    SocialLoginModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
