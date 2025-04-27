export interface Dessert {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isFavorite?: boolean;
}