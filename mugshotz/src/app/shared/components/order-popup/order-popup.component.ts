import { Component, input, effect, ElementRef, Renderer2, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Coffee } from '../../../core/models/coffee';
import { Dessert } from '../../../core/models/dessert';
import { CoffeeService } from '../../../core/services/coffee.service';
import { DessertService } from '../../../core/services/dessert.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-order-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-popup.component.html',
  styleUrl: './order-popup.component.scss'
})
export class OrderPopupComponent {
  
  selectedItemName = input<string>('');
  
  
  isOpen = signal<boolean>(false);
  selectedItem = signal<Coffee | Dessert | null>(null);
  quantity = signal<number>(1);
  
  
  coffeeList = signal<Coffee[]>([]);
  dessertList = signal<Dessert[]>([]);
  
  
  activeTab = signal<'coffee' | 'dessert'>('coffee');
  
  @ViewChild('popup') popupElement!: ElementRef;
  @ViewChild('backdrop') backdropElement!: ElementRef;
  
  constructor(
    private coffeeService: CoffeeService,
    private dessertService: DessertService,
    private cartService: CartService,
    private renderer: Renderer2
  ) {
    
    effect(() => {
      const name = this.selectedItemName();
      if (name) {
        this.loadItemByName(name);
        
        
      }
    });
  }
  
  ngOnInit(): void {
    
    this.coffeeList.set(this.coffeeService.getCoffees());
    this.dessertList.set(this.dessertService.getDesserts());
  }
  
  
  private loadItemByName(name: string): void {
    
    let coffee = this.coffeeService.getCoffees().find(c => c.name === name);
    if (coffee) {
      this.selectedItem.set(coffee);
      this.activeTab.set('coffee');
      return;
    }
    
    
    let dessert = this.dessertService.getDesserts().find(d => d.name === name);
    if (dessert) {
      this.selectedItem.set(dessert);
      this.activeTab.set('dessert');
      return;
    }
    
    
    this.selectedItem.set(null);
  }
  
  
  open(): void {
    this.isOpen.set(true);
    this.quantity.set(1);
    
    
    document.body.classList.add('popup-open');
    
    
    setTimeout(() => {
      if (this.popupElement && this.backdropElement) {
        this.renderer.addClass(this.popupElement.nativeElement, 'active');
        this.renderer.addClass(this.backdropElement.nativeElement, 'active');
      }
    }, 10);
  }
  
  
  close(): void {
    
    if (this.popupElement && this.backdropElement) {
      this.renderer.removeClass(this.popupElement.nativeElement, 'active');
      this.renderer.removeClass(this.backdropElement.nativeElement, 'active');
    }
    
    
    setTimeout(() => {
      this.isOpen.set(false);
      
      
      document.body.classList.remove('popup-open');
    }, 300); 
  }
  
  
  setActiveTab(tab: 'coffee' | 'dessert'): void {
    this.activeTab.set(tab);
  }
  
  
  selectItem(item: Coffee | Dessert): void {
    this.selectedItem.set(item);
  }
  
  
  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }
  
  increaseQuantity(): void {
    this.quantity.update(q => q + 1);
  }
  
  
  addToCart(): void {
    const item = this.selectedItem();
    const qty = this.quantity();
    
    if (!item) return;
    
    
    const isCoffee = this.coffeeList().some(coffee => coffee.id === item.id);
    
    if (isCoffee) {
      this.cartService.addCoffeeToCart(item as Coffee, qty);
    } else {
      this.cartService.addDessertToCart(item as Dessert, qty);
    }
    
    
    this.close();
  }
  
  
  isSelected(item: Coffee | Dessert): boolean {
    const selectedItem = this.selectedItem();
    if (!selectedItem) return false;
    
    return selectedItem.id === item.id && 
           (this.activeTab() === 'coffee' ? 
             this.coffeeList().some(c => c.id === item.id) : 
             this.dessertList().some(d => d.id === item.id));
  }
}