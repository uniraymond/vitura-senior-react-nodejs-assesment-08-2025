export interface Product {
    id: string
    publicName: string
    brand?: string
    category?: string
    createdAt: string
    isWholesaleProduct?: boolean
    priceCents?: number
}

export type UserView = 'admin' | 'doctor';

export interface ProductsResponse {
    data: Product[]
    count: number
}
