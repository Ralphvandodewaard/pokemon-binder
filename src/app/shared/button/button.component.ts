import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
  @Input() label = '';

  @Input() image?: {
    src: string,
    alt: string
  };

  @Input() binderImage?: {
    width: number,
    height: number,
    hasPlus?: boolean,
    isCollection?: boolean
  }

  @Input() isDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
