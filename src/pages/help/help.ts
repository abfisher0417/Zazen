import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  settings;
  slides = [
    {
      title: "Namaste",
      description: "<b>Zazen</b> helps you with your meditation practice by guiding your breath to a programmed frequency.",
      image: "assets/img/logo.png",
    },
    {
      title: "Getting Started",
      description: "Set the <b>Number of Minutes to Meditate</b> and the <b>Number of Full Breaths per Minute</b>. Complete the remaining settings then press <b>Start Meditating</b>.",
      image: "assets/img/settings.png",
    },
    {
      title: "Guided Meditation",
      description: "As the small dot moves over the top half of the sun, <b>inhale</b>. <b>Exhale</b> as the dot moves over the bottom half of the sun.",
      image: "assets/img/meditate.png",
    }
  ];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage) {
    this.settings = this.navParams.get('settings');
  }

  ionViewDidLoad() {
  }

  private skipIntroPage() {
    this.settings.skipIntro = true;
    this.storage.set('skipIntro', String(this.settings.skipIntro));
    this.goToSettingsPage();
  }

  private goToSettingsPage() {
    this.navCtrl.setRoot(SettingsPage, {settings: this.settings});
  }

}
