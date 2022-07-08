.container {
    .main-toolbar {
      justify-content: center;
      .spacer {
        flex: 1 1 auto;
      }
      .toolbar-btn {
        font-size: 16px;
        margin-right: 5px;
        cursor: pointer;
      }
    }
  
    .content {
      .logo {
        margin: 0.5rem;
        text-align: center;
        font-size: 24px;
        color: #0471d6;
        img{
          background-color: #0471d6;
          padding: .5rem;
        }
        .mat-icon {
          height: 160px !important;
          width: 160px !important;
          font-size: 160px !important;
        }
      }
      .song-list{
        height: 200px;
        overflow: scroll;
      }
    }
  
    .media-footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      .spacer {
        width: 200%;
      }
      .time-slider {
        width: 100% !important;
        margin-left: 20px;
        margin-right: 20px;
      }
      .media-action-bar {
        width: 100%;
        padding: 2.5rem;
        justify-content: center;
        .mat-icon {
          height: 48px !important;
          width: 48px !important;
          font-size: 48px !important;
        }
      }
   }
}
