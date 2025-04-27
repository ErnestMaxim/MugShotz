import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CoffeeCardComponent } from '../../shared/components/coffee-card/coffee-card.component';
import { DessertService } from '../../core/services/dessert.service';
import { CartService } from '../../core/services/cart.service';
import { Dessert } from '../../core/models/dessert';
import { Coffee } from '../../core/models/coffee';
import { Subscription } from 'rxjs';
import { OrderPopupComponent } from '../../shared/components/order-popup/order-popup.component';
import { CartComponent } from '../../shared/components/cart/cart.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-bakery',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    CoffeeCardComponent, 
    OrderPopupComponent,
    CartComponent,
    FooterComponent
  ],
  templateUrl: './bakery.component.html',
  styleUrl: './bakery.component.scss'
})
export class BakeryComponent implements OnInit, OnDestroy {
  desserts: Dessert[] = [];
  selectedItemName = signal<string>('');
  private subscription: Subscription | null = null;
  
  constructor(
    private dessertService: DessertService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    
    this.desserts = this.dessertService.getDesserts();
    
    
    this.subscription = this.dessertService.searchResults$.subscribe(results => {
      this.desserts = results;
    });
  }
  
  ngOnDestroy(): void {
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
  
  handleOrderClick(itemName: string): void {
    
    this.selectedItemName.set(itemName);
    
    
    this.dessertService.selectDessert(itemName);
    
    
    const selectedDessert = this.desserts.find(dessert => dessert.name === itemName);
    
    
    if (selectedDessert) {
      this.cartService.addDessertToCart(selectedDessert);
      this.cartService.openCart(); 
    }
  }
}