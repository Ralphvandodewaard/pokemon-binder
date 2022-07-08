import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
  @Input() isCollection?: boolean;

  cardColor = '';

  constructor() { }

  ngOnInit(): void {
    if (typeof this.isCollection === 'boolean') {
      const collectedChance = this.isCollection ? 0.5 : 1;
      this.cardColor = Math.random() < collectedChance ? 'bg-green' : 'bg-gray-800';
    } else {
      this.cardColor = 'bg-gray-800';
    }
  }

}
