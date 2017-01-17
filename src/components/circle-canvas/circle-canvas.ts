import { Component } from '@angular/core';

@Component({
  selector: 'circle-canvas',
  templateUrl: 'circle-canvas.html',
  inputs: ['windowHeight', 'windowWidth', 'breathFrequency', 'inhaleTime']
})
export class CircleCanvasComponent {

  // Class variables passed from the containing component
  windowHeight: number;
  windowWidth: number;
  breathFrequency: number;
  inhaleTime: number;

  // Class variables defined in the component constructor
  PI: number;
  intervalId: number;
  inhale: boolean;
  outerCircleRadius: number;
  outerCircleAngleRadians: number;
  outerCircleClass: string;
  inhaleTextClass: string;
  exhaleTextClass: string;

  // Class variables defined in the ngOnInit lifecycle method
  viewPortWidth: number;
  viewPortHeight: number;
  circleRadius: number;
  circleStartX: number;
  circleStartY: number;
  outerCircleStartX: number;
  outerCircleStartY: number;
  outerCircleX: number;
  outerCircleY: number;
  frequency: number;
  period: number;
  exhaleTime: number;
  inhaleRadian: number;
  exhaleRadian: number;

  constructor() {
    this.PI = 3.141592654;
    this.intervalId = 0;
    this.inhale = true;
    this.outerCircleRadius = 7;
    this.outerCircleAngleRadians = this.PI;
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.viewPortWidth = this.windowWidth / 2;
    this.viewPortHeight = this.windowHeight / 2;
    this.circleRadius = 0.90 * Math.min(this.viewPortHeight, this.viewPortWidth) / 2;
    this.circleStartX = this.viewPortWidth / 2;
    this.circleStartY = this.viewPortHeight / 2;
    this.outerCircleStartX = this.circleStartX - this.circleRadius;
    this.outerCircleStartY = this.circleStartY;
    this.outerCircleX = this.outerCircleStartX;
    this.outerCircleY = this.outerCircleStartY;
    this.frequency = this.breathFrequency / 60;
    this.period = 1 / this.frequency;
    this.exhaleTime = this.period - this.inhaleTime;
    this.inhaleRadian = this.PI / (this.inhaleTime * 1000 / 100);
    this.exhaleRadian = this.PI / (this.exhaleTime * 1000 / 100);
    this.outerCircleClass = "inhaleCircle";
    this.inhaleTextClass = "inhaleText";
    this.exhaleTextClass = "hidden";
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.animateOuterCircle();
  }

  stop() {
    this.clearTimer();
  }

  private animateOuterCircle() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.updateOuterCircleLocation()
    }, 100);
  }

  updateOuterCircleLocation() {
    this.outerCircleAngleRadians += (this.inhale) ? this.inhaleRadian : this.exhaleRadian;
    this.outerCircleX = this.outerCircleStartX + this.circleRadius + this.circleRadius * Math.cos(this.outerCircleAngleRadians);
    this.outerCircleY = this.outerCircleStartY + this.circleRadius * Math.sin(this.outerCircleAngleRadians);

    // Change outer circle class
    if (Math.floor(this.outerCircleAngleRadians / this.PI) % 2 == 0 && this.inhale) { // we've completed the inhale
      this.inhale = false;
      this.outerCircleClass = "exhaleCircle";
    } else if (Math.floor(this.outerCircleAngleRadians / this.PI) % 2 == 1 && !this.inhale) { // we've completed the exhale
      this.inhale = true;
      this.outerCircleClass = "inhaleCircle";
    }

    // Display "inhale" and "exhale" text the first time only
    if (this.outerCircleAngleRadians > 2 * this.PI && this.outerCircleAngleRadians < 3 * this.PI) {
      this.inhaleTextClass = "hidden";
      this.exhaleTextClass = "exhaleText";
    }
    if (this.outerCircleAngleRadians > 3 * this.PI && this.outerCircleAngleRadians < 4 * this.PI) {
      this.exhaleTextClass = "hidden";
    }
  }

}
