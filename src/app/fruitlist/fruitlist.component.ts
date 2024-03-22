import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SinglefruitComponent } from './singlefruit/singlefruit.component';
import { FruitlistdataService } from '../fruitlistdata.service';
import { BehaviorSubject, throttle, interval, throttleTime } from 'rxjs';

@Component({
  selector: 'app-fruitlist',
  standalone: true,
  imports: [CommonModule, SinglefruitComponent],
  templateUrl: './fruitlist.component.html',
  styleUrl: './fruitlist.component.scss'
})

export class FruitlistComponent implements OnInit{
  timer = new BehaviorSubject<number>(0);

  ngOnInit() : void{
    this.timer
    //.pipe(throttle(val => interval(2000)))
    .pipe(throttleTime(2000))
    .subscribe((timePassed) => {
      console.log(timePassed);
    });

    setInterval(() => {
      this.timer.next(this.timer.value + 1000);
    }, 100);
  }

  fruitlistdata = inject(FruitlistdataService);

  fontColorGood = 'green';
  fontColorBad = 'red';
  

  addComment(comment: string, index: number){
    this.fruitlistdata.addCommentToFruit(comment, index)
  }

  nameLog(name:string){
    console.log(name);
  }
}
