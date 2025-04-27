import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoffeeService } from '../../../core/services/coffee.service';
import { DessertService } from '../../../core/services/dessert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  searchBarActive = false;
  searchTerm = '';
  lastScrollTop = 0;
  isHeaderVisible = true;
  
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchSvg') searchSvg!: ElementRef;
  @ViewChild('headerElement') headerElement!: ElementRef;
  
  constructor(
    private coffeeService: CoffeeService,
    private dessertService: DessertService,
    private renderer: Renderer2
  ) {}
  
  ngAfterViewInit(): void {
    // Initialize if needed
  }
  
  // Listen for scroll events to hide/show header
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    // If we're at the very top of the page, always show header
    if (st <= 0) {
      this.isHeaderVisible = true;
      if (this.headerElement && this.headerElement.nativeElement) {
        this.renderer.setStyle(this.headerElement.nativeElement, 'transform', 'translateY(0)');
      }
      this.lastScrollTop = 0;
      return;
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (st > this.lastScrollTop && st > 80) {
      // Scrolling down & past threshold
      if (this.isHeaderVisible && this.headerElement && this.headerElement.nativeElement) {
        this.renderer.setStyle(this.headerElement.nativeElement, 'transform', 'translateY(-100%)');
        this.isHeaderVisible = false;
      }
    } else {
      // Scrolling up
      if (!this.isHeaderVisible && this.headerElement && this.headerElement.nativeElement) {
        this.renderer.setStyle(this.headerElement.nativeElement, 'transform', 'translateY(0)');
        this.isHeaderVisible = true;
      }
    }
    
    this.lastScrollTop = st;
  }
  
  toggleSearchBar(): void {
    const wasActive = this.searchBarActive;
    this.searchBarActive = !this.searchBarActive;
    
    // If opening the search bar, focus the input after animation completes
    if (this.searchBarActive) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 400); // Slightly longer delay to match the animation timing
    } else {
      // Clear search term when closing search bar
      this.searchTerm = '';
      
      // Reset search results to show all coffees and desserts when search bar is closed
      this.coffeeService.searchCoffees('');
      this.dessertService.searchDesserts('');
      
      // After a small delay to let the component re-render
      setTimeout(() => {
        // Apply the animation manually since the SVG may have been recreated
        if (this.searchSvg && this.searchSvg.nativeElement) {
          // Remove any existing animation
          this.renderer.removeClass(this.searchSvg.nativeElement, 'animate-grow-shrink');
          
          // Force a reflow before adding the class again
          void this.searchSvg.nativeElement.offsetWidth;
          
          // Add the animation class
          this.renderer.addClass(this.searchSvg.nativeElement, 'animate-grow-shrink');
        }
      }, 10);
    }
  }
  
  onSearch(): void {
    // Search both coffees and desserts
    this.coffeeService.searchCoffees(this.searchTerm);
    this.dessertService.searchDesserts(this.searchTerm);
  }
}