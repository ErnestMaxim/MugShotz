import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoffeeService } from '../../../core/services/coffee.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private coffeeService: CoffeeService) {}
  
  get selectedCoffee() {
    return this.coffeeService.getSelectedCoffee();
  }
}