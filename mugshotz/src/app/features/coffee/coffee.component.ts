import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CoffeeCardComponent } from '../../shared/components/coffee-card/coffee-card.component';
import { CoffeeService } from '../../core/services/coffee.service';
import { CartService } from '../../core/services/cart.service';
import { Coffee } from '../../core/models/coffee';
import { Subscription } from 'rxjs';
import { OrderPopupComponent } from '../../shared/components/order-popup/order-popup.component';
import { CartComponent } from '../../shared/components/cart/cart.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    CoffeeCardComponent, 
    OrderPopupComponent,
    CartComponent,
    FooterComponent
  ],
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.scss'
})
export class CoffeeComponent implements OnInit, OnDestroy {
  coffees: Coffee[] = [];
  selectedItemName = signal<string>('');
  private subscription: Subscription | null = null;
  
  constructor(
    private coffeeService: CoffeeService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    
    this.coffees = this.coffeeService.getCoffees();
    
    
    this.subscription = this.coffeeService.searchResults$.subscribe(results => {
      this.coffees = results;
    });
  }
  
  ngOnDestroy(): void {
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  handleOrderClick(itemName: string): void {
    
    this.selectedItemName.set(itemName);
    
    
    this.coffeeService.selectCoffee(itemName);
    
    
    const selectedCoffee = this.coffees.find(coffee => coffee.name === itemName);
    
    
    if (selectedCoffee) {
      this.cartService.addCoffeeToCart(selectedCoffee);
      this.cartService.openCart(); 
    }
  }
}