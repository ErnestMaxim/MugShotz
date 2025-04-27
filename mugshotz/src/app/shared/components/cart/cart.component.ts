import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(private cartService: CartService) {}
  
  
  get cartItems() {
    return this.cartService.getCartItems();
  }
  
  get cartTotal() {
    return this.cartService.getCartTotal();
  }
  
  get isOpen() {
    return this.cartService.isCartOpen();
  }
  
  
  toggleCart(): void {
    this.cartService.toggleCart();
  }
  
  closeCart(): void {
    this.cartService.closeCart();
  }
  
  clearCart(): void {
    this.cartService.clearCart();
  }
  
  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }
  
  increaseQuantity(index: number): void {
    const currentQuantity = this.cartItems()[index].quantity;
    this.cartService.updateItemQuantity(index, currentQuantity + 1);
  }
  
  decreaseQuantity(index: number): void {
    const currentQuantity = this.cartItems()[index].quantity;
    if (currentQuantity > 1) {
      this.cartService.updateItemQuantity(index, currentQuantity - 1);
    } else {
      this.removeItem(index);
    }
  }

  sum () : number {
    return this.cartTotal() + 2.50; 
  }
  
  
  checkout(): void {
    
    alert('Thank you for your order! Total: ' + this.sum().toFixed(2)  + ' €');
    this.cartService.clearCart();
    this.cartService.closeCart();
  }
}