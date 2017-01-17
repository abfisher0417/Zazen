import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';
import { CountDownTimerComponent } from '../../components/count-down-timer/count-down-timer';
import { CircleCanvasComponent } from '../../components/circle-canvas/circle-canvas';
import { Insomnia } from 'ionic-native';

@Component({
  selector: 'page-meditate',
  templateUrl: 'meditate.html'
})
export class MeditatePage {

  @ViewChild(CountDownTimerComponent)
  private timerComponent: CountDownTimerComponent;

  @ViewChild(CircleCanvasComponent)
  private cavasComponent: CircleCanvasComponent;

  settings;
  windowHeight: number;
  windowWidth: number;
  running: boolean;
  loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController ) {
    this.settings = this.navParams.get('settings');
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.running = false;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    Insomnia.keepAwake().then(() => {}, () => {});
    this.loadSounds();
  }

  ionViewWillUnload() {
    NativeAudio.unload('largeBell').then(() => {}, () => {});
    NativeAudio.unload('smallBell').then(() => {}, () => {});
    Insomnia.allowSleepAgain().then(() => {}, () => {});
  }

  pause() {
    this.running = false;
    this.timerComponent.stop();
    this.cavasComponent.stop();
  }

  stop() {
    this.running = false;
    this.cavasComponent.stop();
  }

  start() {
    this.running = true;
    this.timerComponent.start();
    this.cavasComponent.start();
  }

  started(val: boolean) {
    if (val) {
      if (this.settings.playBeginEndBell == "true") {
        NativeAudio.play('largeBell', () => console.log('largeBell is done playing'));
      }
    }
  }

  finished(val: boolean) {
    if (val) {
      this.stop();
      if (this.settings.playBeginEndBell == "true") {
        NativeAudio.play('largeBell', () => console.log('largeBell is done playing'));
      }
      this.showFinishedToast();
    }
  }

  intervalMet(val: boolean) {
    if (val) {
      if (this.settings.playIntervalBell == "true") {
        NativeAudio.play('smallBell', () => console.log('smallBell is done playing'));
      }
    }
  }

  doStopButton() {
    this.pause();
    let confirm = this.alertCtrl.create({
      title: 'Stop meditating?',
      message: 'Do you want to quit your Zazen session?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present()
  }

  showFinishedToast() {
    let toast = this.toastCtrl.create({
      message: 'Hooray for investing in yourself! Go forth and live well.',
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }

  private loadSounds() {
    this.presentLoading();
    NativeAudio.preloadSimple('largeBell', 'assets/audio/LargeBell.mp3').then(() => {}, () => {});
    NativeAudio.preloadSimple('smallBell', 'assets/audio/SmallBell.mp3').then(() => {
    }, () => {});
    this.dismissLoading();
  }

  private presentLoading() {
    this.loading.present();
  }

  private dismissLoading() {
    this.loading.dismiss();
  }

}
