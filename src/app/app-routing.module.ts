import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTrackComponent } from 'src/app/new-track/new-track.component';
import { TrackComponent } from 'src/app/track/track.component';
import { PasswordComponent } from 'src/app/password/password.component';
import { RefreshComponentComponent } from 'src/app/refresh-component/refresh-component.component';
import { DdlComponent } from 'src/app/ddl/ddl.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';

const routes: Routes = [
  {
    path: 'newtrack', component: NewTrackComponent, children: [
      { path: 'password', component: PasswordComponent },
      { path: 'refresh', component: RefreshComponentComponent },
      { path: 'ddl', component: DdlComponent },
    ]
  },
  { path: 'track', component: TrackComponent },
  { path: 'uploadfiles', component: UploadfilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingModuleComponent = [NewTrackComponent, TrackComponent];



