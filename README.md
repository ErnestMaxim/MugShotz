# MugShotz Cafe

A modern coffee shop website featuring an urban, graffiti-inspired design that showcases specialty coffees and artisanal desserts.

## Project Overview

MugShotz is a fictional cafe website that combines the aesthetics of urban street art with a premium coffee experience. The application allows users to:

- Browse specialty coffees and desserts
- Search for products by name
- Add items to a shopping cart
- Place orders
- Mark favorite products

The project is built with Angular 17, leveraging its latest features including standalone components, signals API, and the new control flow syntax.

## Technical Implementation

### Core Requirements Implemented

1. **Standalone Components**
   - HomeComponent 
   - AboutComponent
   - BakeryComponent
   - HeaderComponent
   - FooterComponent
   - CartComponent
   - CoffeeCardComponent
   - OrderPopupComponent
   - SearchComponent

2. **Lazy Loading**
   - Home page is loaded initially
   - Coffee, Bakery, and About pages are lazy-loaded on demand

3. **Service-Based Data Management**
   - CoffeeService: Handles coffee products data and operations
   - DessertService: Manages dessert products data and operations
   - CartService: Manages the shopping cart functionality

4. **Search Functionality**
   - Implemented in HeaderComponent
   - Searches across both coffee and dessert products
   - Results are propagated using observables

5. **Input/Output and NgModel**
   - Using modern `input()`/`output()` signal-based API for component communication
   - Two-way binding with `[(ngModel)]` for search functionality

6. **Signals API Usage**
   - Reactive state management using Angular signals
   - Signals for managing product collections, cart state, and UI state

7. **@for Control Flow**
   - Using Angular 17's new `@for` syntax for list rendering
   - Empty state handling with `@empty` block

8. **Event Communication**
   - Coffee selection with Order Now button triggers events
   - Cart system integrates across components

9. **Clean Architecture**
   - Feature-based project structure
   - Clear separation of concerns
   - Reusable components in shared module
  
![image](https://github.com/user-attachments/assets/36ee1912-2867-4c2c-8244-4c409750c416)

![image](https://github.com/user-attachments/assets/2d8167fa-0d2f-4efb-b9ce-ad70f36e1984)

![image](https://github.com/user-attachments/assets/47f58ec5-c729-4f10-ad49-b2c17831062c)

![image](https://github.com/user-attachments/assets/b81504c5-becc-4cef-910b-b94315373608)


  
