import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings: {skipIntro?: boolean,
    timeToMeditate?: number,
    breathFrequency?: number,
    timeToInhale?: number,
    playBeginEndBell?: boolean,
    playIntervalBell?: boolean,
    intervalTime?: number} = {};
  loading;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private storage: Storage) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    this.loadSettings();
  }

  private loadSettings() {
    this.presentLoading();

    this.storage.get('skipIntro').then(
      skipIntro => {
          if (skipIntro == null) {
            this.settings.skipIntro = false;
          } else {
            this.settings.skipIntro = skipIntro;
          }
    });
    this.storage.get('timeToMeditate').then(
      timeToMeditate => {
          if (timeToMeditate == null) {
            this.settings.timeToMeditate = 10;
          } else {
            this.settings.timeToMeditate = timeToMeditate;
          }
    });
    this.storage.get('breathFrequency').then(
      breathFrequency => {
          if (breathFrequency == null) {
            this.settings.breathFrequency = 5;
          } else {
            this.settings.breathFrequency = breathFrequency;
          }
    });
    this.storage.get('timeToInhale').then(
      timeToInhale => {
          if (timeToInhale == null) {
            this.settings.timeToInhale = 3;
          } else {
            this.settings.timeToInhale = timeToInhale;
          }
    });
    this.storage.get('playBeginEndBell').then(
      playBeginEndBell => {
          if (playBeginEndBell == null) {
            this.settings.playBeginEndBell = true;
          } else {
            this.settings.playBeginEndBell = playBeginEndBell;
          }
    });
    this.storage.get('playIntervalBell').then(
      playIntervalBell => {
          if (playIntervalBell == null) {
            this.settings.playIntervalBell = true;
          } else {
            this.settings.playIntervalBell = playIntervalBell;
          }
    });
    this.storage.get('intervalTime').then(
      intervalTime => {
          if (intervalTime == null) {
            this.settings.intervalTime = 5;
          } else {
            this.settings.intervalTime = intervalTime;
          }
          this.dismissLoading();
    });
  }

  private presentLoading() {
    this.loading.present();
  }

  private dismissLoading() {
    this.loading.dismiss();
    //if (this.settings.skipIntro) {
    //  this.navCtrl.setRoot(SettingsPage, {settings: this.settings});
    //} else {
      this.navCtrl.setRoot(HelpPage, {settings: this.settings});
    //}
  }

}
