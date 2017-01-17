import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { HelpPage } from '../pages/help/help';
import { MeditatePage } from '../pages/meditate/meditate';
import { Storage } from '@ionic/storage';
import { CircleCanvasComponent } from '../components/circle-canvas/circle-canvas';
import { CountDownTimerComponent } from '../components/count-down-timer/count-down-timer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    HelpPage,
    MeditatePage,
    CircleCanvasComponent,
    CountDownTimerComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    HelpPage,
    MeditatePage
  ],
  providers: [
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
