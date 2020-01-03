import { Component, OnInit } from "@angular/core";
import { Observable, fromEvent, interval, of, from, timer } from "rxjs";
import {
  switchMap,
  tap,
  map,
  pluck,
  take,
  delay,
  concatMap
} from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  x: any;

  ngOnInit() {
    this.switchMap();
    this.switchMap2();
  }

  simulateHttp(val: any, d: number) {
    // return of(val).pipe(concatMap(value => of(value).pipe(delay(d))));
    return of(val).pipe(delay(d));
  }

  switchMap() {
    // const obs1$ = fromEvent(document,'click');
    // const obs2$ = interval(1000);
    // const finalObs$ = obs1$.pipe(
    //   switchMap(e => obs2$)
    // );
    // finalObs$.subscribe(d => console.log(d))
    // this.simulateHttp("ones", 1000).subscribe(d => {
    //   console.log(d);
    // });
    // this.simulateHttp("two", 5000).subscribe(d => {
    //   console.log(d);
    // });
  }

  switchMap2() {
    const saveUser$ = this.simulateHttp(" user saved ", 1000);

    const httpResult$ = saveUser$.pipe(
      switchMap(sourceValue => {
        console.log(sourceValue);
        return this.simulateHttp(" data reloaded ", 5000);
      })
    );

    httpResult$.subscribe(console.log, console.error, () =>
      console.log("completed httpResult$")
    );
  }

  tap() {
    const obs$ = of(1, 2, 3, 4, 5);
    obs$
      .pipe(
        tap(val => {
          console.log(val);
        }),
        map(val => val + 10),
        tap(val => {
          console.log(val);
        })
      )
      .subscribe(v => console.log(v));
  }

  mapAndPluck() {
    const data = [
      { id: 1, value: "one" },
      { id: 2, value: "two" },
      { id: 3, value: "three" },
      { id: 4, value: "four" },
      { id: 5, value: "five" }
    ];

    console.log("PLUCK");
    const obs1$ = from(data)
      .pipe(pluck("value"))
      .subscribe(v => {
        console.log(v);
      });
    console.log("---------------------------");
    console.log("MAP");
    const obs2$ = from(data)
      .pipe(map(data => data["value"]))
      .subscribe(v => {
        console.log(v);
      });
  }

  timer() {
    const timer = interval(5000);
    timer.pipe(take(10)).subscribe(() => console.log("complete"));
  }

  Unsub() {
    this.x.unsubscribe();
  }
}
