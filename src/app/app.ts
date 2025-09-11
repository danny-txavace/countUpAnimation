import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { CountUp } from 'countup.js';
import { CountUpModule } from 'ngx-countup';
import { CountUpss } from "./count-ups/count-upss";
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  imports: [CountUpModule, CountUpss, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnInit {
  protected readonly title = signal('CountUpAnimation');

  @ViewChild('countUpElement') countUpElement!: ElementRef;

  ngAfterViewInit() {
    /*const countUp = new CountUp(this.countUpElement.nativeElement, 20021.75, {
      duration: 2,
      separator: ' ',
      decimal: ',',
      decimalPlaces: 2
    });
    if (!countUp.error) {
      countUp.start();
    }*/

      this.onCountUp(this.countUpElement, 2345);
  }

  ngOnInit(): void {
    //this.onCountUp();
  }

  onCountUp(element: ElementRef, value: number) {
    const countUp = new CountUp(element.nativeElement, value, {
      duration: 2,
      separator: ' ',
      decimal: ',',
      decimalPlaces: 2
    });
    if (!countUp.error) {
      countUp.start();
    }
  }
}
