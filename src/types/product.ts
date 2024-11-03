export enum Category {
    Electronics = "Electronics",
    Fashion = "Fashion",
    Furniture = "Furniture",
    Accessories = "Accessories",
    Sports = "Sports",
    Others = "Others",
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: Category;
    seller: string;
    stock: number;
    ratings: number;
    createdAt: string;
}
