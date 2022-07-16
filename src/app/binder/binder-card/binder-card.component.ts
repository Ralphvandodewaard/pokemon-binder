import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models';

@Component({
  selector: 'app-binder-card',
  templateUrl: './binder-card.component.html'
})
export class BinderCardComponent implements OnInit {
  @Input() card!: Card;

  @Input() isCollection = false;

  @Input() isCollected = false;

  @Output() toggleCollected = new EventEmitter<any>();

  popupButtonVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  get popupButtonClasses(): string {
    const visibleClasses = this.popupButtonVisible ? 'opacity-100' : 'opacity-100 sm:opacity-0 sm:cursor-default sm:-z-10';
    const collectedClasses = this.isCollected ? 'bg-green border-transparent' : 'bg-disabled border-gray-300';

    return `${visibleClasses} ${collectedClasses}`;
  }

  togglePopupButton(visible: boolean): void {
    this.popupButtonVisible = visible;
  }

  emitToggleCollected(): void {
    this.toggleCollected.emit();
  }

}
