import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html'
})
export class SetComponent implements OnInit {

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.store.selectedSeries) {
      this.router.navigate(['/new']);
      return;
    }
    console.log(this.store.selectedSeries);
  }

}
