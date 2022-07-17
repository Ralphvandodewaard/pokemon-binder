import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/models';

@Component({
  selector: 'app-binder-settings',
  templateUrl: './binder-settings.component.html',
  styleUrls: ['./binder-settings.component.css']
})
export class BinderSettingsComponent implements OnInit {

  @Input() superTypeFilters!: Filter[];

  @Input() rarityFilters!: Filter[];

  @Output() toggleFilterEnabled = new EventEmitter<Filter>();

  settingsOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  get filterCategories(): { label: string, filters: Filter[] }[] {
    return [
      { label: 'Include supertypes', filters: this.superTypeFilters },
      { label: 'Include rarities', filters: this.rarityFilters }
    ];
  }

  toggleSettingsOpen(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  emitToggleFilterEnabled(filter: Filter): void {
    this.toggleFilterEnabled.emit(filter);
  }

}
