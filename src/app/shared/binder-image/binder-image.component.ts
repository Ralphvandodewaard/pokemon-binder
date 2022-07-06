import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-binder-image',
  templateUrl: './binder-image.component.html'
})
export class BinderImageComponent implements OnInit {
  @Input() binderImage!: {
    width: number,
    height: number,
    hasPlus?: boolean
  }

  constructor() { }

  ngOnInit(): void {
  }

  get pageAmount(): number {
    return this.binderImage.hasPlus ? 1 : 2;
  }

  get gridClasses(): string {
    return `grid-cols-${this.binderImage.width} grid-rows-${this.binderImage.height}`;
  }

  get cardAmount(): number {
    return this.binderImage.width * this.binderImage.height;
  }

  get emptyPageWidth(): string {
    const binderWidth = this.binderImage.width;
    return `${(binderWidth * 12) + ((binderWidth + 1) * 4) + 2}px`;
  }

}
