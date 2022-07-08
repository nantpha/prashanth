<div class="container">
  <mat-toolbar color="primary" class="main-toolbar">
      <span>Personal Radio</span>
  </mat-toolbar>
  <div class="content">
      <div class="logo">
        <img src="assets/image1.jpg" alt="Shibaji Debnath" width="260px">
    </div>
    <mat-list color="primary">
      <h3 mat-subheader="">Playlist</h3>
      <div class="song-list">
        <mat-list-item *ngfor="let file of files; let i = index" (click)="openFile(file, i)">
          <mat-icon color="primary" mat-list-icon="">music_note</mat-icon>
          <h4 mat-line="">{{ file.name }}</h4>
          <h5 mat-line="">by {{ file.artist }}</h5>
          <mat-icon color="primary" *ngif="currentFile.index === i &amp;&amp; !state?.error">volume_up</mat-icon>
          <h6 *ngif="currentFile.index === i &amp;&amp; state?.error">ERROR</h6>
          <mat-divider></mat-divider>
        </mat-list-item>
      </div>
    </mat-list>
  </div>
  <div class="spacer"></div>
  <div class="media-footer">
    <mat-toolbar color="primary">
      <mat-toolbar-row>
         {{ state?.readableCurrentTime }}
         <mat-slider class="time-slider" min="0" [max]="state?.duration" step="1" [value]="state?.currentTime" (input)="onSliderChangeEnd($event)" [disabled]="state?.error || currentFile.index === undefined"></mat-slider>
         {{ state?.readableDuration }}
      </mat-toolbar-row>
      <mat-toolbar-row cols="2" class="media-action-bar">

          <button mat-button="" [disabled]="isFirstPlaying()" (click)="previous()">
            <mat-icon mat-list-icon="">skip_previous</mat-icon>
          </button>
          <button mat-button="" (click)="play()" [disabled]="state?.error" *ngif="!state?.playing">
            <mat-icon mat-list-icon="">play_circle_filled</mat-icon>
          </button>
          <button mat-button="" (click)="pause()" *ngif="state?.playing">
            <mat-icon mat-list-icon="">pause</mat-icon>
          </button>
          <button mat-button="" [disabled]="isLastPlaying()" (click)="next()">
            <mat-icon mat-list-icon="">skip_next</mat-icon>
          </button>

        <span class="spacer"></span>
        <mat-icon>volume_up</mat-icon>
        <mat-slider class="time-slider" min="0" max="1" step="0.01" [value]="state?.volume" (input)="onVolumeChange($event)"></mat-slider>
       
      </mat-toolbar-row>
    </mat-toolbar>
  </div>
</div>
