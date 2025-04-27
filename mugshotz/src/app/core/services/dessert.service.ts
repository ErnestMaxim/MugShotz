import { Injectable, signal } from '@angular/core';
import { Dessert } from '../models/dessert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DessertService {
  private dessertList: Dessert[] = [
    {
      id: 1,
      name: 'Berry Bliss',
      description: 'Cocoa cake with dark chocolate ganache and berries',
      price: 3.99,
      imageUrl: 'assets/images/desserts/berrybliss.jpg',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Amandina',
      description: 'Rum-soaked cocoa layers with chocolate buttercream',
      price: 4.50,
      imageUrl: 'assets/images/desserts/amandina.jpg',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Choux a la creme',
      description: 'Nutella-filled pastry with vanilla mascarpone cream',
      price: 3.25,
      imageUrl: 'assets/images/desserts/chouxalacreme.jpg',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Vanilla Flan',
      description: 'French pastry with delicate vanilla bean cream',
      price: 4.25,
      imageUrl: 'assets/images/desserts/flanvvanilie.jpg',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Gateau Au Chocolat',
      description: 'Rich dark chocolate cake with vanilla notes',
      price: 4.99,
      imageUrl: 'assets/images/desserts/gateauchocolat.jpg',
      isFavorite: false
    },
    {
      id: 6,
      name: 'L\'Ispahan',
      description: 'Crunchy shell with rose-lychee ganache and raspberry',
      price: 3.75,
      imageUrl: 'assets/images/desserts/lispahan.jpg',
      isFavorite: false
    },
    {
      id: 7,
      name: 'Mousse D\'Or',
      description: 'White chocolate layers with bright citrus accents',
      price: 4.50,
      imageUrl: 'assets/images/desserts/moussedor.jpg',
      isFavorite: false
    },
    {
      id: 8,
      name: 'Nuage D\'Amour',
      description: 'Raspberry-strawberry mousse with tonka and almond',
      price: 4.25,
      imageUrl: 'assets/images/desserts/nuagedamour.jpg',
      isFavorite: false
    },
    {
      id: 9,
      name: 'Pavlova',
      description: 'Crisp meringue filled with Amaretto mascarpone',
      price: 5.00,
      imageUrl: 'assets/images/desserts/pavlova.jpg',
      isFavorite: false
    },
    {
      id: 10,
      name: 'Pavlova Exotique',
      description: 'Meringue cup with cream and tropical fruits',
      price: 5.99,
      imageUrl: 'assets/images/desserts/pavlovaexotique.jpg',
      isFavorite: false
    },
    {
      id: 11,
      name: 'Red Velvet',
      description: 'Raspberry-glazed cake with cream cheese filling',
      price: 3.25,
      imageUrl: 'assets/images/desserts/redvelvet.jpg',
      isFavorite: false
    },
    {
      id: 12,
      name: 'Tulip',
      description: 'Elderflower white chocolate mousse with raspberry',
      price: 6.25,
      imageUrl: 'assets/images/desserts/tulip.jpg',
      isFavorite: false
    }
  ];

  
  private searchResultsSubject = new BehaviorSubject<Dessert[]>(this.sortedDessertList());
  public searchResults$ = this.searchResultsSubject.asObservable();
  
  
  private selectedDessertSignal = signal<string>('');

  
  getDesserts(): Dessert[] {
    return this.sortedDessertList();
  }
  
  
  private sortedDessertList(): Dessert[] {
    
    return [...this.dessertList].sort((a, b) => {
      
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      
      
      return a.name.localeCompare(b.name);
    });
  }
  
  
  searchDesserts(term: string): Dessert[] {
    let results: Dessert[];
    
    if (!term.trim()) {
      results = this.sortedDessertList();
    } else {
      results = this.dessertList
        .filter(dessert => dessert.name.toLowerCase().includes(term.toLowerCase()))
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
    const index = this.dessertList.findIndex(dessert => dessert.id === id);
    if (index !== -1) {
      this.dessertList[index].isFavorite = isFavorite;
      
      
      this.searchResultsSubject.next(this.sortedDessertList());
    }
  }
  
  
  selectDessert(name: string): void {
    this.selectedDessertSignal.set(name);
  }

  
  getSelectedDessert() {
    return this.selectedDessertSignal;
  }
}