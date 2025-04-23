import { Component, input, output, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Coffee } from '../../../core/models/coffee';

@Component({
  selector: 'app-coffee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-card.component.html',
  styleUrl: './coffee-card.component.scss'
})
export class CoffeeCardComponent implements AfterViewInit, OnDestroy {
  // Provide a default empty coffee object
  coffee = input<Coffee>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  });
  orderClicked = output<string>();
  
  // Variables for tracking mouse movement
  private card: HTMLElement | null = null;
  private lightElement: HTMLElement | null = null;
  private boundingRect: DOMRect | null = null;
  private cardTransitionTimeout: any = null;
  
  constructor(private el: ElementRef) {}
  
  ngAfterViewInit(): void {
    this.card = this.el.nativeElement.querySelector('.coffee-card');
    if (this.card) {
      // Create light effect element
      this.lightElement = document.createElement('div');
      this.lightElement.className = 'card-light-effect';
      this.card.appendChild(this.lightElement);
      
      // Add event listeners
      this.card.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      this.card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      
      // Ensure all cards have the same height regardless of content
      const cardContent = this.card.querySelector('.card-content') as HTMLElement;
      if (cardContent) {
        cardContent.style.height = '100%';
      }
    }
  }
  
  ngOnDestroy(): void {
    // Clean up event listeners to prevent memory leaks
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
    if (this.card) {
      // Update bounding rect on mouse enter to ensure accuracy
      this.boundingRect = this.card.getBoundingClientRect();
      
      // Remove any transition that might be applied from mouse leave
      this.card.style.transition = '';
    }
  }
  
  handleMouseMove(e: MouseEvent): void {
    if (!this.card || !this.boundingRect) return;
    
    // Calculate mouse position relative to the card
    const mouseX = e.clientX - this.boundingRect.left;
    const mouseY = e.clientY - this.boundingRect.top;
    
    // Calculate position as a percentage of the card's dimensions
    const xPercent = mouseX / this.boundingRect.width;
    const yPercent = mouseY / this.boundingRect.height;
    
    // Calculate the tilt angle (max 15 degrees)
    const maxTilt = 15;
    const rotateX = maxTilt * (0.5 - yPercent);
    const rotateY = maxTilt * (xPercent - 0.5);
    
    // Add a slight movement effect with translateX and translateY (max 10px)
    const maxMove = 10;
    const translateX = maxMove * (xPercent - 0.5);
    const translateY = maxMove * (yPercent - 0.5);
    
    // Apply the transformation to the card
    this.card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`;
    
    // Update light effect position - ensure this is working by logging
    console.log('Mouse move detected', mouseX, mouseY);
    if (this.lightElement) {
      // Position the light effect at the mouse position
      this.lightElement.style.left = `${mouseX}px`;
      this.lightElement.style.top = `${mouseY}px`;
      
      // Make the light effect visible and ensure it has a larger z-index
      this.lightElement.style.opacity = '1';
      this.lightElement.style.zIndex = '20';
    }
  }
  
  handleMouseLeave(): void {
    if (this.card) {
      // Add smooth transition back to original position
      this.card.style.transition = 'transform 0.5s ease-out';
      this.card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateX(0) translateY(0)';
      
      // Hide the light effect
      if (this.lightElement) {
        this.lightElement.style.opacity = '0';
      }
      
      // Clear any existing timeout
      if (this.cardTransitionTimeout) {
        clearTimeout(this.cardTransitionTimeout);
      }
      
      // Remove the transition property after animation completes
      this.cardTransitionTimeout = setTimeout(() => {
        if (this.card) {
          this.card.style.transition = '';
        }
      }, 500);
    }
  }
  
  onOrderNow(): void {
    this.orderClicked.emit(this.coffee().name);
  }
}