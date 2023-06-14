import { Component, computed, effect, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, interval, map } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  public counter = signal(0);
  public double = computed(() => this.counter() * 2);
  public triple = computed(() => this.counter() * 3);
  public person = signal({
    id: 1,
    name: 'Fulano',
    lastname: 'Costa',
  }, {
    equal: (a, b) => {
      console.log(a, b);
      return a.id === b.id;
    }
  });
  public timer$ = interval(1000);
  public timerComSignal = toSignal(this.timer$);
  public timer2$ = toObservable(this.timerComSignal);

  public fullName = computed(() => this.person().name + ' ' + this.person().lastname);

  constructor() {
    effect(() => {
      console.log(this.person());
    });
  }

  public increment(): void {
    // this.counter.set(this.counter() + 1);
    this.counter.update(value => value + 1);
    this.person.mutate(person => person.name = 'Ciclano');
  }

}
