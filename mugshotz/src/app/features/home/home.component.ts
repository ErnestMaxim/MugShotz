import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeCardComponent } from '../../shared/components/coffee-card/coffee-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CartComponent } from '../../shared/components/cart/cart.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CoffeeService } from '../../core/services/coffee.service';
import { DessertService } from '../../core/services/dessert.service';
import { CartService } from '../../core/services/cart.service';
import { Coffee } from '../../core/models/coffee';
import { Dessert } from '../../core/models/dessert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CoffeeCardComponent, HeaderComponent, CartComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  allCoffees = signal<Coffee[]>([]);
  allDesserts = signal<Dessert[]>([]);
  
  displayedCoffees = signal<Coffee[]>([]);
  displayedDesserts = signal<Dessert[]>([]);
  
  currentCoffeeIndex = signal<number>(0);
  currentDessertIndex = signal<number>(0);
  
  
  cardsToShow = 4;
  
  private subscriptions: Subscription[] = [];
  
  constructor(
    private coffeeService: CoffeeService,
    private dessertService: DessertService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.allCoffees.set(this.coffeeService.getCoffees());
    this.allDesserts.set(this.dessertService.getDesserts());
    
    this.updateDisplayedCoffees();
    this.updateDisplayedDesserts();
    
    this.subscriptions.push(
      this.coffeeService.searchResults$.subscribe(results => {
        this.allCoffees.set(results);
        
        if (this.currentCoffeeIndex() > 0 && results.length <= this.cardsToShow) {
          this.currentCoffeeIndex.set(0);
        }
        this.updateDisplayedCoffees();
      })
    );
  
    
    this.subscriptions.push(
      this.dessertService.searchResults$.subscribe(results => {
        this.allDesserts.set(results);
        
        if (this.currentDessertIndex() > 0 && results.length <= this.cardsToShow) {
          this.currentDessertIndex.set(0);
        }
        this.updateDisplayedDesserts();
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
  
  convertDessertToCoffee(dessert: Dessert): Coffee {
    return {
      id: dessert.id,
      name: dessert.name,
      description: dessert.description,
      price: dessert.price,
      imageUrl: dessert.imageUrl,
      isFavorite: dessert.isFavorite
    };
  }
  
  
  isCoffeeNextDisabled(): boolean {
    return this.allCoffees().length <= this.cardsToShow || 
           this.currentCoffeeIndex() + this.cardsToShow >= this.allCoffees().length;
  }
  
  
  isCoffeePrevDisabled(): boolean {
    return this.currentCoffeeIndex() <= 0;
  }
  
  
  isDessertNextDisabled(): boolean {
    return this.allDesserts().length <= this.cardsToShow || 
           this.currentDessertIndex() + this.cardsToShow >= this.allDesserts().length;
  }
  
  
  isDessertPrevDisabled(): boolean {
    return this.currentDessertIndex() <= 0;
  }
  
  
  nextCoffee(): void {
    if (!this.isCoffeeNextDisabled()) {
      this.currentCoffeeIndex.update(index => index + 1);
      this.updateDisplayedCoffees();
    }
  }
  
  prevCoffee(): void {
    if (!this.isCoffeePrevDisabled()) {
      this.currentCoffeeIndex.update(index => index - 1);
      this.updateDisplayedCoffees();
    }
  }
  
  nextDessert(): void {
    if (!this.isDessertNextDisabled()) {
      this.currentDessertIndex.update(index => index + 1);
      this.updateDisplayedDesserts();
    }
  }
  
  prevDessert(): void {
    if (!this.isDessertPrevDisabled()) {
      this.currentDessertIndex.update(index => index - 1);
      this.updateDisplayedDesserts();
    }
  }
  
  private updateDisplayedCoffees(): void {
    const startIndex = this.currentCoffeeIndex();
    this.displayedCoffees.set(
      this.allCoffees().slice(startIndex, startIndex + this.cardsToShow)
    );
  }
  
  private updateDisplayedDesserts(): void {
    const startIndex = this.currentDessertIndex();
    this.displayedDesserts.set(
      this.allDesserts().slice(startIndex, startIndex + this.cardsToShow)
    );
  }
  
  handleOrderClick(itemName: string): void {
    const coffee = this.allCoffees().find(c => c.name === itemName);
    const dessert = this.allDesserts().find(d => d.name === itemName);
    
    if (coffee) {
      this.cartService.addCoffeeToCart(coffee, 1);
      this.cartService.openCart();
    } else if (dessert) {
      this.cartService.addDessertToCart(dessert, 1);
      this.cartService.openCart();
    }
  }
  
  
  handleFavoriteToggle(event: {id: number, isFavorite: boolean}): void {
    this.updateDisplayedCoffees();
    this.updateDisplayedDesserts();
  }
}