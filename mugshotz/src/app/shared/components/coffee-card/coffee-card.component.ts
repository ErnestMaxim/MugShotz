import { Component, input, output, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Coffee } from '../../../core/models/coffee';
import { CartService } from '../../../core/services/cart.service';
import { CoffeeService } from '../../../core/services/coffee.service';
import { DessertService } from '../../../core/services/dessert.service';

@Component({
  selector: 'app-coffee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-card.component.html',
  styleUrl: './coffee-card.component.scss'
})
export class CoffeeCardComponent implements AfterViewInit, OnDestroy {
  coffee = input<Coffee>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  });
  
  orderClicked = output<string>();
  favoriteToggled = output<{id: number, isFavorite: boolean}>();
  
  private cartService = inject(CartService);
  private coffeeService = inject(CoffeeService);
  private dessertService = inject(DessertService);
  
  private card: HTMLElement | null = null;
  private lightElement: HTMLElement | null = null;
  private boundingRect: DOMRect | null = null;
  private cardTransitionTimeout: any = null;
  private isBrowser: boolean;
  
  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngAfterViewInit(): void {
    
    if (!this.isBrowser) return;

    this.card = this.el.nativeElement.querySelector('.coffee-card');
    if (this.card) {
      this.lightElement = document.createElement('div');
      this.lightElement.className = 'card-light-effect';
      this.card.appendChild(this.lightElement);
      
      this.card.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      this.card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      
      const cardContent = this.card.querySelector('.card-content') as HTMLElement;
      if (cardContent) {
        cardContent.style.height = '100%';
      }
    }
  }
  
  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    
    if (this.card) {
      this.card.removeEventListener('mousemove', this.handleMouseMove.bind(this));
      this.card.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
      this.card.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    }
    
    if (this.cardTransitionTimeout) {
      clearTimeout(this.cardTransitionTimeout);
    }
  }
  
  handleMouseEnter(): void {
    if (!this.isBrowser || !this.card) return;
    
    this.boundingRect = this.card.getBoundingClientRect();
    this.card.style.transition = '';
  }
  
  handleMouseMove(e: MouseEvent): void {
    if (!this.isBrowser || !this.card || !this.boundingRect) return;
    
    const mouseX = e.clientX - this.boundingRect.left;
    const mouseY = e.clientY - this.boundingRect.top;
    
    const xPercent = mouseX / this.boundingRect.width;
    const yPercent = mouseY / this.boundingRect.height;
    
    const maxTilt = 15;
    const rotateX = maxTilt * (0.5 - yPercent);
    const rotateY = maxTilt * (xPercent - 0.5);
    
    const maxMove = 10;
    const translateX = maxMove * (xPercent - 0.5);
    const translateY = maxMove * (yPercent - 0.5);
    
    this.card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`;
    
    if (this.lightElement) {
      this.lightElement.style.left = `${mouseX}px`;
      this.lightElement.style.top = `${mouseY}px`;
      
      this.lightElement.style.opacity = '1';
      this.lightElement.style.zIndex = '20';
    }
  }
  
  handleMouseLeave(): void {
    if (!this.isBrowser || !this.card) return;
    
    this.card.style.transition = 'transform 0.5s ease-out';
    this.card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateX(0) translateY(0)';
    
    if (this.lightElement) {
      this.lightElement.style.opacity = '0';
    }
    
    if (this.cardTransitionTimeout) {
      clearTimeout(this.cardTransitionTimeout);
    }
    
    this.cardTransitionTimeout = setTimeout(() => {
      if (this.card) {
        this.card.style.transition = '';
      }
    }, 500);
  }
  
  onOrderNow(): void {
    this.orderClicked.emit(this.coffee().name);
  }
  
  toggleFavorite(event: Event): void {
    event.stopPropagation();
    
    const coffeeObj = this.coffee();
    const isFavorite = !coffeeObj.isFavorite;
    
    const dessertKeywords = ['cake', 'bliss', 'velvet', 'flan', 'cream', 'mousse', 'chocolate', 'pastry', 'ispahan', 'pavlova', 'tulip'];
    const isDessert = dessertKeywords.some(keyword => 
      coffeeObj.name.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (isDessert) {
      this.dessertService.toggleFavorite(coffeeObj.id, isFavorite);
    } else {
      this.coffeeService.toggleFavorite(coffeeObj.id, isFavorite);
    }
    
    this.favoriteToggled.emit({id: coffeeObj.id, isFavorite});
  }
}