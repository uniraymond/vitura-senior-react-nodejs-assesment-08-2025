export interface Product {
    id: string;
    publicName: string;
    category?: string;
    brand?: string;
    isWholesaleProduct?: boolean;
    visibleTo: UserView[];
    createdAt: string;
    priceCents?: number;
    tags?: string[]
}

export type UserView = 'admin' | 'doctor';


export interface ProductsResponse {
    id: string;
    publicName: string;
    category?: string;
    brand?: string;
    isWholesaleProduct: boolean;
    visibleTo: UserView;
    priceCents?: number;
    createdAt: string;
}

export interface ProductsQueryParams {
    view?: UserView;
    q?: string;
    new?: string;
}

export interface ErrorResponse {
    error: string;
    message: string;
    statusCode: number;
}