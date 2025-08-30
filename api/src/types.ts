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