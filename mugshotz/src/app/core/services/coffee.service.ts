import { Injectable, signal } from '@angular/core';
import { Coffee } from '../models/coffee';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private coffeeList: Coffee[] = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Strong black coffee made by forcing steam through ground coffee beans',
      price: 3.50,
      imageUrl: 'assets/images/espresso.jpg'
    },
    {
      id: 2,
      name: 'Americano',
      description: 'Espresso diluted with hot water, similar strength to drip coffee but different flavor',
      price: 3.75,
      imageUrl: 'assets/images/americano.jpg'
    },
    {
      id: 3,
      name: 'Cappuccino',
      description: 'Equal parts espresso, steamed milk, and milk foam',
      price: 4.25,
      imageUrl: 'assets/images/cappuccino.jpg'
    },
    {
      id: 4,
      name: 'Latte',
      description: 'Espresso with steamed milk and a small layer of foam on top',
      price: 4.50,
      imageUrl: 'assets/images/latte.jpg'
    },
    {
      id: 5,
      name: 'Mocha',
      description: 'Espresso with chocolate syrup and steamed milk, topped with whipped cream',
      price: 4.75,
      imageUrl: 'assets/images/mocha.jpg'
    },
    {
      id: 6,
      name: 'Macchiato',
      description: 'Espresso "stained" with a small amount of milk or foam',
      price: 4.00,
      imageUrl: 'assets/images/macchiato.jpg'
    },
    {
      id: 7,
      name: 'Flat White',
      description: 'Espresso with steamed milk and minimal foam, stronger than a latte',
      price: 4.50,
      imageUrl: 'assets/images/flat-white.jpg'
    },
    {
      id: 8,
      name: 'Cold Brew',
      description: 'Coffee brewed with cold water over 12-24 hours, resulting in a smooth, less acidic flavor',
      price: 4.50,
      imageUrl: 'assets/images/cold-brew.jpg'
    },
    {
      id: 9,
      name: 'Affogato',
      description: 'A scoop of vanilla ice cream "drowned" with a shot of hot espresso',
      price: 5.50,
      imageUrl: 'assets/images/affogato.jpg'
    },
    {
      id: 10,
      name: 'Turkish Coffee',
      description: 'Finely ground coffee beans boiled in a pot, served unfiltered',
      price: 4.25,
      imageUrl: 'assets/images/turkish-coffee.jpg'
    },
    {
      id: 11,
      name: 'Irish Coffee',
      description: 'Hot coffee, Irish whiskey, and sugar, topped with cream',
      price: 6.50,
      imageUrl: 'assets/images/irish-coffee.jpg'
    },
    {
      id: 12,
      name: 'Cortado',
      description: 'Equal parts espresso and warm milk, reducing the acidity',
      price: 4.00,
      imageUrl: 'assets/images/cortado.jpg'
    },
    {
      id: 13,
      name: 'Ristretto',
      description: 'A "restricted" shot of espresso using less water, resulting in a more concentrated flavor',
      price: 3.50,
      imageUrl: 'assets/images/ristretto.jpg'
    },
    {
      id: 14,
      name: 'Vienna Coffee',
      description: 'Coffee or espresso topped with whipped cream',
      price: 4.75,
      imageUrl: 'assets/images/vienna-coffee.jpg'
    },
    {
      id: 15,
      name: 'Bulletproof Coffee',
      description: 'Coffee blended with grass-fed butter and MCT oil',
      price: 5.50,
      imageUrl: 'assets/images/bulletproof-coffee.jpg'
    },
    {
      id: 16,
      name: 'French Press',
      description: 'Coffee brewed by steeping grounds in hot water and pressing them out',
      price: 4.00,
      imageUrl: 'assets/images/french-press.jpg'
    },
    {
      id: 17,
      name: 'Pour Over',
      description: 'Hot water poured over coffee grounds in a filter, creating a clean, bright cup',
      price: 4.25,
      imageUrl: 'assets/images/pour-over.jpg'
    },
    {
      id: 18,
      name: 'Nitro Cold Brew',
      description: 'Cold brew coffee infused with nitrogen for a creamy, stout-like texture',
      price: 5.00,
      imageUrl: 'assets/images/nitro-cold-brew.jpg'
    },
    {
      id: 19,
      name: 'Caramel Macchiato',
      description: 'Vanilla-flavored espresso with caramel drizzle and steamed milk',
      price: 5.25,
      imageUrl: 'assets/images/caramel-macchiato.jpg'
    },
    {
      id: 20,
      name: 'Vietnamese Coffee',
      description: 'Strong coffee dripped through a metal filter and mixed with sweetened condensed milk',
      price: 4.75,
      imageUrl: 'assets/images/vietnamese-coffee.jpg'
    }
  ];

  private selectedCoffeeSignal = signal<string>('');

  /*
    Returns the complete list of coffees
  */
  getCoffees(): Coffee[]{
    return this.coffeeList;
  }

  /*
    Filters the coffee list based on a search term, matching coffee names that include the term (case-insensitive)
    If the search term is empty, it returns the full list
  */
  searchCoffees(term: string): Coffee[] {
    if( !term.trim()){
      return this.coffeeList;
    }
    return this.coffeeList.filter(coffee =>
      coffee.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  /*
    Updates the selected coffee signal with a new coffee name
  */
  selectCoffee(name: string): void{
    this.selectedCoffeeSignal.set(name);
  }

  /*
    Returns the signal that tracks the selected coffee, allowing components to subscribe to selection changes
  */
  getSelectedCoffee() {
    return this.selectedCoffeeSignal;
  }
}
