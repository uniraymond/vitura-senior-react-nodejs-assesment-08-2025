export interface Product {
    id: string
    publicName: string
    brand?: string
    category?: string
    createdAt: string
    isWholesaleProduct?: boolean
    priceCents?: number
    visibleTo: UserView[]
}

export type UserView = 'admin' | 'doctor';

export interface ProductsResponse {
    data: Product[],
    count: number
}

export interface ProductState {
    data: Product[];
    loading: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | null;
    error: string | null;
    count: number;
}
