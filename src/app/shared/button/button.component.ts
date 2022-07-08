import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Input() isDisabled = false;

  @Input() isDeletable = false;

  @Output() delete = new EventEmitter<any>();

  deleteButtonVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDeleteButton(visible: boolean): void {
    this.deleteButtonVisible = visible;
  }

  emitDelete(): void {
    this.delete.emit();
  }

}
