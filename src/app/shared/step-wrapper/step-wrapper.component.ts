import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-wrapper',
  templateUrl: './step-wrapper.component.html'
})
export class StepWrapperComponent implements OnInit {
  @Input() label = '';

  constructor() { }

  ngOnInit(): void {
  }

}
