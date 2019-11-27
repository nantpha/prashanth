import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive';

import { AppRoutingModule,routingModuleComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { PasswordComponent } from './password/password.component';
import { DdlComponent } from './ddl/ddl.component';
import { RefreshComponentComponent } from './refresh-component/refresh-component.component';
import { TrackService } from './track/track.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { UploadfilesService } from './uploadfiles/uploadfiles.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingModuleComponent,
    PasswordComponent,
    DdlComponent,
    RefreshComponentComponent,
    UppercaseDirective,
    UploadfilesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot() 
  ],
  providers: [
    TrackService,
    UploadfilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
