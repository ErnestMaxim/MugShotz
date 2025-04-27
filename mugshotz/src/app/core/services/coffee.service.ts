import { Injectable, signal } from '@angular/core';
import { Coffee } from '../models/coffee';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private coffeeList: Coffee[] = [
    {
      id: 1,
      name: 'Flat White',
      description: 'The flat white is a drink that is very much in fashion among coffee lovers',
      price: 3.50,
      imageUrl: 'assets/images/coffee/flat_white.jpg',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Americano',
      description: 'Americano is a delicious, full-bodied long speciality coffee',
      price: 3.99,
      imageUrl: 'assets/images/coffee/americano.jpg',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Iced Coffee',
      description: 'Chilled espresso with cold milk over ice for a refreshing coffee break',
      price: 4.25,
      imageUrl: 'assets/images/coffee/icedcoffee.jpg',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Cortado',
      description: 'The perfect blend of aromatic espresso and velvety milk foam',
      price: 3.25,
      imageUrl: 'assets/images/coffee/cortado.jpg',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Espresso',
      description: 'Strong black coffee made by forcing steam through ground coffee beans',
      price: 2.99,
      imageUrl: 'assets/images/coffee/espresso.jpg',
      isFavorite: false
    },
    {
      id: 6,
      name: 'Cappuccino',
      description: 'Equal parts espresso, steamed milk, and milk foam for a perfect balance',
      price: 4.50,
      imageUrl: 'assets/images/coffee/cappuccino.jpg',
      isFavorite: false
    },
    {
      id: 7,
      name: 'Biscuit latte',
      description: 'Cult cocoa cookie as a base for creamy sweet latte macchiato',
      price: 4.75,
      imageUrl: 'assets/images/coffee/biscuit_latte.jpg',
      isFavorite: false
    },
    {
      id: 8,
      name: 'Macchiato',
      description: 'Espresso with a small amount of frothed milk for subtle sweetness',
      price: 3.95,
      imageUrl: 'assets/images/coffee/espresso_macchiato.jpg',
      isFavorite: false
    }
  ];

  private selectedCoffeeSignal = signal<string>('');
  
  
  private searchResultsSubject = new BehaviorSubject<Coffee[]>(this.sortedCoffeeList());
  public searchResults$ = this.searchResultsSubject.asObservable();

  
  getCoffees(): Coffee[] {
    return this.sortedCoffeeList();
  }
  
  
  private sortedCoffeeList(): Coffee[] {
    
    return [...this.coffeeList].sort((a, b) => {
      
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      
      
      return a.name.localeCompare(b.name);
    });
  }

  
  searchCoffees(term: string): Coffee[] {
    let results: Coffee[];
    
    if (!term.trim()) {
      results = this.sortedCoffeeList();
    } else {
      results = this.coffeeList
        .filter(coffee => coffee.name.toLowerCase().includes(term.toLowerCase()))
        .sort((a, b) => {
          
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          
          
          return a.name.localeCompare(b.name);
        });
    }
    
    
    this.searchResultsSubject.next(results);
    
    return results;
  }
  
  
  toggleFavorite(id: number, isFavorite: boolean): void {
    const index = this.coffeeList.findIndex(coffee => coffee.id === id);
    if (index !== -1) {
      this.coffeeList[index].isFavorite = isFavorite;
      
      
      this.searchResultsSubject.next(this.sortedCoffeeList());
    }
  }

  
  selectCoffee(name: string): void {
    this.selectedCoffeeSignal.set(name);
  }

  
  getSelectedCoffee() {
    return this.selectedCoffeeSignal;
  }
}