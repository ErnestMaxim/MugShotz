import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeCardComponent } from '../../shared/components/coffee-card/coffee-card.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CoffeeService } from '../../core/services/coffee.service';
import { Coffee } from '../../core/models/coffee';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CoffeeCardComponent, SearchComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  coffeeList = signal<Coffee[]>([]);
  
  constructor(private coffeeService: CoffeeService) {
    this.coffeeList.set(this.coffeeService.getCoffees());
  }
  
  updateCoffees(results: Coffee[]): void {
    this.coffeeList.set(results);
  }
  
  handleOrderClick(coffeeName: string): void {
    this.coffeeService.selectCoffee(coffeeName);
  }
}