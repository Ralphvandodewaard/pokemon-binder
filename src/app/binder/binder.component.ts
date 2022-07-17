import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../api/store.service';
import { Card, Filter, Preset, Set, Size, Style } from '../models';
import constants from '../shared/constants';

@Component({
  selector: 'app-binder',
  templateUrl: './binder.component.html'
})
export class BinderComponent implements OnInit {
  isLoading = true;

  selectedSet: Set | null = null;

  selectedSize: Size | null = null;

  selectedStyle: Style | null = null;

  selectedPreset: Preset | null = null;

  cards: Card[] = [];

  filteredCards: Card[] = [];

  currentPageLeft = 0;

  currentPageRight = 1;

  collectedCardIds: string[] = [];

  superTypeFilters: Filter[] = [
    { key: 'pokemon', label: 'Pokemon', isEnabled: true },
    { key: 'trainer', label: 'Trainers', isEnabled: true },
    { key: 'energy', label: 'Energies', isEnabled: true }
  ];

  rarityFilters: Filter[] = [
    { key: 'common', label: 'Commons', isEnabled: true },
    { key: 'uncommon', label: 'Uncommons', isEnabled: true },
    { key: 'rare', label: 'Rares', isEnabled: true },
    { key: 'ultra rare', label: 'Ultra rares', isEnabled: true },
    { key: 'secret rare', label: 'Secret rares', isEnabled: true }
  ];

  sortingOptions: Filter[] = [
    { key: 'number', label: 'Number', isEnabled: true },
    { key: 'rarity', label: 'Rarity', isEnabled: false },
    { key: 'type', label: 'Type', isEnabled: false }
  ];

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (
      (!this.store.selectedSet || !this.store.selectedSize || !this.store.selectedStyle) &&
      !this.store.selectedPreset
      ) {
      this.router.navigate(['/']);
      return;
    }

    this.selectedPreset = this.store.selectedPreset;
    if (this.selectedPreset) {
      const sets: Set[] = await this.store.getAllSets();
      this.selectedSet = sets.filter((set: Set) => set.id === this.selectedPreset!.set.id)[0];

      const sizes: Size[] = this.store.sizes;
      this.selectedSize = sizes.filter((size: Size) => size.width === this.selectedPreset!.size.width && size.height === this.selectedPreset!.size.height)[0];

      const styles: Style[] = this.store.styles;
      this.selectedStyle = styles.filter((style: Style) => style.label === this.selectedPreset!.style)[0];
    } else {
      this.selectedSet = this.store.selectedSet;
      this.selectedSize = this.store.selectedSize;
      this.selectedStyle = this.store.selectedStyle;
    }

    this.cards = await this.store.getCards();
    this.filteredCards = this.cards;

    if (localStorage.getItem('collected-cards')) {
      this.collectedCardIds = JSON.parse(localStorage.getItem('collected-cards')!);
    }

    if (this.selectedPreset) {
      if (this.selectedPreset.sortBy) {
        const selectedSortingOption: string = this.selectedPreset.sortBy;

        this.sortingOptions.forEach((option: Filter) => {
          if (option.key === selectedSortingOption) {
            option.isEnabled = true;
          } else {
            option.isEnabled = false;
          }
        })

        if (!this.selectedPreset.filters) {
          this.sortCards();
        }
      }

      if (this.selectedPreset.filters) {
        this.superTypeFilters[0].isEnabled = this.selectedPreset.filters.pokemon;
        this.superTypeFilters[1].isEnabled = this.selectedPreset.filters.trainers;
        this.superTypeFilters[2].isEnabled = this.selectedPreset.filters.energies;

        this.rarityFilters[0].isEnabled = this.selectedPreset.filters.common;
        this.rarityFilters[1].isEnabled = this.selectedPreset.filters.uncommon;
        this.rarityFilters[2].isEnabled = this.selectedPreset.filters.rare;
        this.rarityFilters[3].isEnabled = this.selectedPreset.filters.ultraRare;
        this.rarityFilters[4].isEnabled = this.selectedPreset.filters.secretRare;

        this.filterCards();
      } 
    } else {
      this.sortCards();
    }

    this.isLoading = false;
  }

  getPageClasses(cards: Card[]): string {
    return cards.length > 0 ? `grid-cols-${this.selectedSize!.width} grid-rows-${this.selectedSize!.height}` : 'hidden';
  }

  get orderClass(): string {
    return this.cardsLeft.length == 0 ? 'order-1' : 'order-2';
  }
  
  get emptyPageClasses(): string {
    const widthClasses = `w-page-${this.selectedSize!.width}-mobile mobile:w-page-${this.selectedSize!.width}-desktop`;
    const heightClasses = `h-page-${this.selectedSize!.height}-mobile mobile:h-page-${this.selectedSize!.height}-desktop`;

    return `${widthClasses} ${heightClasses}`;
  }

  get cardsLeft(): Card[] {
    if (this.currentPageLeft > 0) {
      return this.filteredCards.slice((this.currentPageLeft * this.pageSize) - this.pageSize, this.currentPageLeft * this.pageSize);
    } else {
      return [];
    }
  }

  get cardsRight(): Card[] {
    if (this.currentPageRight > 0) {
      return this.filteredCards.slice((this.currentPageRight * this.pageSize) - this.pageSize, this.currentPageRight * this.pageSize);
    } else {
      return [];
    }
  }

  get pageSize(): number {
    return this.selectedSize!.width * this.selectedSize!.height;
  }

  get controlsWidth(): string {
    switch (this.selectedSize!.width) {
      case 2:
        return '616px';
      case 3:
        return '904px';
      default:
        return '1192px';
    }
  }

  get pageAmount(): number {
    return Math.ceil(this.filteredCards.length / (this.selectedSize!.width * this.selectedSize!.height));
  }

  get isFirstPage(): boolean {
    return this.currentPageLeft == 0;
  }

  get isLastPage(): boolean {
    return this.currentPageRight >= (this.filteredCards.length / this.pageSize);
  }

  goToPage(page: string): void {
    switch (page) {
      case 'first':
        this.currentPageLeft = 0;
        this.currentPageRight = 1;
        break;
      case 'last':
        const isEven = this.pageAmount % 2 == 0;
        this.currentPageLeft = isEven ? this.pageAmount : this.pageAmount - 1;
        this.currentPageRight = !isEven ? this.pageAmount : this.pageAmount + 1;
        break;
      case 'previous':
        if (this.currentPageLeft > 0) {
          this.currentPageLeft = this.currentPageLeft - 2;
          this.currentPageRight = this.currentPageRight - 2;
        }
        break;
      default:
        if (this.currentPageRight < (this.filteredCards.length / this.pageSize)) {
          this.currentPageLeft = this.currentPageLeft + 2;
          this.currentPageRight = this.currentPageRight + 2;
        }
        break;
    }
  }

  get binderInfo(): { label: string, value: string | number }[] {
    return [
      { label: 'Set', value: this.selectedSet!.name },
      { label: 'Cards', value: this.filteredCards.length },
      { label: 'Collected', value: this.collectedCardsAmount },
    ];
  }

  toggleFilterEnabled(filter: Filter): void {
    filter.isEnabled = !filter.isEnabled;

    this.filterCards();

    if (this.filteredCards.length == 0) {
      this.goToPage('first');
    } else if (this.isLastPage) {
      this.goToPage('last');
    }

    if (this.selectedPreset) {
      let presets: Preset[] = [];
      if (localStorage.getItem('presets')) {
        presets = JSON.parse(localStorage.getItem('presets')!);
      }

      let preset = presets.filter((preset: Preset) => preset.id === this.selectedPreset!.id)[0];

      preset.filters = {
        pokemon: this.superTypeFilters[0].isEnabled,
        trainers: this.superTypeFilters[1].isEnabled,
        energies: this.superTypeFilters[2].isEnabled,
        common: this.rarityFilters[0].isEnabled,
        uncommon: this.rarityFilters[1].isEnabled,
        rare: this.rarityFilters[2].isEnabled,
        ultraRare: this.rarityFilters[3].isEnabled,
        secretRare: this.rarityFilters[4].isEnabled,
      }

      localStorage.setItem('presets', JSON.stringify(presets));
    }
  }

  filterCards(): void {
    this.filteredCards = this.cards;

    this.superTypeFilters.forEach((filter: Filter) => {
      if (!filter.isEnabled) {
        switch (filter.key) {
          case 'pokemon':
            this.filteredCards = this.filteredCards.filter((card: Card) => card.supertype.toLowerCase() !== constants.SUPERTYPES.POKEMON);
            break;
          case 'trainer':
            this.filteredCards = this.filteredCards.filter((card: Card) => card.supertype.toLowerCase() !== constants.SUPERTYPES.TRAINER);
            break;
          case 'energy':
            this.filteredCards = this.filteredCards.filter((card: Card) => card.supertype.toLowerCase() !== constants.SUPERTYPES.ENERGY);
            break;
          default:
            break;
        }
      }
    })

    this.rarityFilters.forEach((filter: Filter) => {
      if (!filter.isEnabled) {
        switch (filter.key) {
          case 'common':
            this.filteredCards = this.filteredCards.filter((card: Card) => card.rarity.toLowerCase() !== constants.RARITIES.COMMON);
            break;
          case 'uncommon':
            this.filteredCards = this.filteredCards.filter((card: Card) => card.rarity.toLowerCase() !== constants.RARITIES.UNCOMMON);
            break;
          case 'rare':
            this.filteredCards = this.filteredCards.filter((card: Card) =>
              card.rarity.toLowerCase() !== constants.RARITIES.RARE &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO
            );
            break;
          case 'ultra rare':
            this.filteredCards = this.filteredCards.filter((card: Card) =>
              card.rarity.toLowerCase() !== constants.RARITIES.LEGEND &&
              card.rarity.toLowerCase() !== constants.RARITIES.RADIANT_RARE &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_ACE &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_BREAK &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_EX &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_GX &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_LVX &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_STAR &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_V &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_VMAX &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_VSTAR &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_PRIME &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_PRISM_STAR &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_SHINY &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_SHINY_GX &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_ULTRA
            );
            break;
          case 'secret rare':
            this.filteredCards = this.filteredCards.filter((card: Card) =>
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_RAINBOW &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_SECRET &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_SHINING
            );
            break;
          default:
            break;
        }
      }
    })

    this.sortCards();
  }

  toggleSortingOption(selectedOption: Filter): void {
    if (!selectedOption.isEnabled) {
      this.sortingOptions.forEach((option: Filter) => {
        if (option.key === selectedOption.key) {
          option.isEnabled = true;
        } else {
          option.isEnabled = false;
        }
      })

      this.sortCards();

      if (this.selectedPreset) {
        let presets: Preset[] = [];
        if (localStorage.getItem('presets')) {
          presets = JSON.parse(localStorage.getItem('presets')!);
        }
  
        let preset: Preset = presets.filter((preset: Preset) => preset.id === this.selectedPreset!.id)[0]; 
        preset.sortBy = this.sortingOptions.filter((option: Filter) => option.isEnabled)[0].key;
  
        localStorage.setItem('presets', JSON.stringify(presets));
      }
    }
  }

  sortCards(): void {
    const selectedOption: Filter = this.sortingOptions.filter((option: Filter) => option.isEnabled)[0];

    switch (selectedOption.key) {
      case 'number':
        this.filteredCards.sort((a: Card, b: Card) => Number(a.number) > Number(b.number) ? 1 : -1);
        break;
      case 'rarity':
        this.filteredCards.sort((a: Card, b: Card) => {
          if (a.raritySortingIndex === b.raritySortingIndex) {
            return Number(a.number) > Number(b.number) ? 1 : -1;
          }
      
          return a.raritySortingIndex! > b.raritySortingIndex! ? 1 : -1;
        });
        break;
      case 'type':
        this.filteredCards.sort((a: Card, b: Card) => {
          if (a.typeSortingIndex === b.typeSortingIndex) {
            return Number(a.number) > Number(b.number) ? 1 : -1;
          }
      
          return a.typeSortingIndex! > b.typeSortingIndex! ? 1 : -1;
        });
        break;
      default:
        break;
    }
  }

  get collectedCardsAmount(): number {
    const collectedCardsInSet = this.collectedCardIds.filter((id: string) => id.split('-')[0] === this.selectedSet!.id);

    let amount = 0;
    this.filteredCards.forEach((card: Card) => {
      if (collectedCardsInSet.includes(card.id)) {
        amount++;
      }
    });

    return amount;
  }

  get isCollection(): boolean {
    return this.selectedStyle!.isCollection;
  }

  cardCollected(cardId: string): boolean {
    return this.collectedCardIds.includes(cardId);
  }

  toggleCollected(cardId: string): void {
    if (!this.collectedCardIds.includes(cardId)) {
      this.collectedCardIds.push(cardId);
    } else {
      const index = this.collectedCardIds.indexOf(cardId);
      this.collectedCardIds.splice(index, 1);
    }

    localStorage.setItem('collected-cards', JSON.stringify(this.collectedCardIds));
  }

}
