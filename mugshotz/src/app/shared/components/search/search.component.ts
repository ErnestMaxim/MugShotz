import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Coffee } from '../../../core/models/coffee';
import { CoffeeService } from '../../../core/services/coffee.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm = '';
  
  @Output() searchResults = new EventEmitter<Coffee[]>();
  
  constructor(private coffeeService: CoffeeService) {}
  
  onSearch(): void {
    const results = this.coffeeService.searchCoffees(this.searchTerm);
    this.searchResults.emit(results);
  }
}