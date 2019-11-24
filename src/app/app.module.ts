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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingModuleComponent,
    PasswordComponent,
    DdlComponent,
    RefreshComponentComponent,
    UppercaseDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
