import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'count-down-timer',
  templateUrl: 'count-down-timer.html',
  inputs: ['minutesRemaining', 'interval']
})
export class CountDownTimerComponent {

  @Output() started = new EventEmitter<boolean>();
  @Output() finished = new EventEmitter<boolean>();
  @Output() intervalMet = new EventEmitter<boolean>();

  minutesRemaining: number;
  secondsRemaining: number;
  decisecondRemaining: number;
  intervalId: number;
  inProgress: boolean;
  interval: number;
  intervalMinutesRemaining: number;
  intervalSecondsRemaining: number;
  display: string;

  constructor() {
    this.intervalId = 0;
    this.secondsRemaining = 0;
    this.inProgress = false;
    this.intervalSecondsRemaining = 0;
    this.decisecondRemaining = 9;
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.display = this.formatTimeString();
    this.intervalMinutesRemaining = this.interval;
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    if (!this.inProgress) {
      this.inProgress = true;
      this.started.emit(this.inProgress);
    }
    this.countDown();
  }

  stop() {
    this.clearTimer();
    if (this.minutesRemaining === 0 && this.secondsRemaining === 0) {
      this.finished.emit(true);
    }
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      if (this.decisecondRemaining == 0) {
        this.decisecondRemaining = 9;
        this.decrementTimerByOne();
        this.display = this.formatTimeString();
        if (this.minutesRemaining === 0 && this.secondsRemaining === 0) {
          this.stop();
          return;
        }
        if (this.interval) {
          this.decrementIntervalTimerByOne();
          if (this.intervalMinutesRemaining === 0 && this.intervalSecondsRemaining === 0) {
            this.intervalMet.emit(true);
            this.intervalMinutesRemaining = this.interval;
          }
        }
      } else {
        this.decisecondRemaining -= 1;
      }
    }, 100);
  }

  private formatTimeString() {
    return ('0' + this.minutesRemaining).slice(-2) +
      ":" +
      ('0' + this.secondsRemaining).slice(-2);
  }

  private decrementTimerByOne() {
    if (this.minutesRemaining > 0 || this.secondsRemaining > 0) {
      if (this.minutesRemaining > 0 && this.secondsRemaining == 0) {
        this.minutesRemaining -= 1;
        this.secondsRemaining = 59;
      } else {
        this.secondsRemaining -= 1;
      }
    }
  }

  private decrementIntervalTimerByOne() {
    if (this.intervalMinutesRemaining > 0 || this.intervalSecondsRemaining > 0) {
      if (this.intervalMinutesRemaining > 0 && this.intervalSecondsRemaining == 0) {
        this.intervalMinutesRemaining -= 1;
        this.intervalSecondsRemaining = 59;
      } else {
        this.intervalSecondsRemaining -= 1;
      }
    }
  }

}
