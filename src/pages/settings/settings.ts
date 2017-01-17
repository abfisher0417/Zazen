import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MeditatePage } from '../meditate/meditate';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  minutes = [];
  settings;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage) {
    for (let i = 1; i < 61; i++) {
      this.minutes.push(i);
    }

    this.settings = this.navParams.get('settings');
  }

  ionViewDidLoad() {
  }

  saveSettings(formData) {
    this.storage.set('timeToMeditate', String(this.settings.timeToMeditate));
    this.storage.set('breathFrequency', String(this.settings.breathFrequency));
    this.storage.set('timeToInhale', String(this.settings.timeToInhale));
    this.storage.set('playBeginEndBell', String(this.settings.playBeginEndBell));
    this.storage.set('playIntervalBell', String(this.settings.playIntervalBell));
    this.storage.set('intervalTime', String(this.settings.intervalTime));

    this.navCtrl.push(MeditatePage, {
      settings: this.settings
    });
  }

}
