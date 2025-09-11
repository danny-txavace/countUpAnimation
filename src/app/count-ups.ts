import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, combineLatest, distinctUntilChanged, endWith, interval, map, switchMap, takeWhile } from 'rxjs';

const easeOutQuad = (x: number): number => x * (2 - x);

@Directive({
  selector: '[appCountUp]'
})
export class CountUps implements OnInit {
  targetValue = 100;

  private readonly count$ = new BehaviorSubject(0);
  private readonly duration$ = new BehaviorSubject(2000);

  private readonly currentCount$ =
  combineLatest([
    this.count$,
    this.duration$
  ]).pipe(
    switchMap(([count, duration]) => {
      const startTime = animationFrameScheduler.now();

      return interval(0,
        animationFrameScheduler).pipe(
          map(() => animationFrameScheduler.now() - startTime),
          map((elapsedTime) => elapsedTime / duration),
          takeWhile((progress) => progress <= 1),
          map(easeOutQuad),
          map((progress) => Math.round(progress * count)),
          endWith(count),
          distinctUntilChanged()
        );
    })
  );

  @Input('countUps')
  set count(count: number) {
    this.count$.next(count);
  }

  @Input()
  set duration(duration: number) {
    this.duration$.next(duration);
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  )
  {}

  ngOnInit(): void {
    this.displayCurrentCount();
  }

  private displayCurrentCount(): void {
    this.currentCount$
      .subscribe((currentCount) => {
        this.renderer.setProperty(
          this.elementRef.nativeElement,
          'innerHTML',
          currentCount
        );
      });
  }
}
