export interface Product {
    id: string
    publicName: string
    brand?: string
    category?: string
    createdAt: string
    isWholesaleProduct?: boolean
    priceCents?: number
    visiableTo: UserView[]
}

export type UserView = 'admin' | 'doctor';

export interface ProductsResponse {
    data: Product[],
    loading: false,
    status: null,
    count: number
}
