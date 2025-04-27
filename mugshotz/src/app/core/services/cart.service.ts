import { Injectable, signal } from '@angular/core';
import { Coffee } from '../models/coffee';
import { Dessert } from '../models/dessert';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  type: 'coffee' | 'dessert';
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems = signal<CartItem[]>([]);
  private cartTotal = signal<number>(0);
  private cartOpen = signal<boolean>(false);
  
  constructor() {}
  
  
  addCoffeeToCart(coffee: Coffee, quantity: number = 1): void {
    this.addToCart({
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
      imageUrl: coffee.imageUrl,
      quantity: quantity,
      type: 'coffee'
    });
  }
  
  
  addDessertToCart(dessert: Dessert, quantity: number = 1): void {
    this.addToCart({
      id: dessert.id,
      name: dessert.name,
      price: dessert.price,
      imageUrl: dessert.imageUrl,
      quantity: quantity,
      type: 'dessert'
    });
  }
  
  
  private addToCart(item: CartItem): void {
    
    const existingItemIndex = this.cartItems().findIndex(
      cartItem => cartItem.id === item.id && cartItem.type === item.type
    );
    
    if (existingItemIndex !== -1) {
      
      const updatedItems = [...this.cartItems()];
      updatedItems[existingItemIndex].quantity += item.quantity;
      this.cartItems.set(updatedItems);
    } else {
      
      this.cartItems.update(items => [...items, item]);
    }
    
    
    this.updateCartTotal();
  }
  
  
  removeFromCart(index: number): void {
    const updatedItems = this.cartItems().filter((_, i) => i !== index);
    this.cartItems.set(updatedItems);
    this.updateCartTotal();
  }
  
  
  updateItemQuantity(index: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(index);
      return;
    }
    
    const updatedItems = [...this.cartItems()];
    updatedItems[index].quantity = quantity;
    this.cartItems.set(updatedItems);
    this.updateCartTotal();
  }
  
  
  private updateCartTotal(): void {
    const total = this.cartItems().reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    this.cartTotal.set(total);
  }
  
  
  clearCart(): void {
    this.cartItems.set([]);
    this.cartTotal.set(0);
  }
  
  
  openCart(): void {
    this.cartOpen.set(true);
  }
  
  
  closeCart(): void {
    this.cartOpen.set(false);
  }
  
  
  toggleCart(): void {
    this.cartOpen.update(state => !state);
  }
  
  
  getCartItems() {
    return this.cartItems;
  }
  
  
  getCartTotal() {
    return this.cartTotal;
  }
  
  
  isCartOpen() {
    return this.cartOpen;
  }
}