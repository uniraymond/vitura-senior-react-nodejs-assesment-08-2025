import {Request, Response, NextFunction} from 'express';
import {getProducts} from '../utils/loadProducts';
import {ProductsQueryParams, UserView, ApiResponse, ProductsResponse } from '../types';

export const getProductsHandler = async (
    req: Request<{}, {}, {}, ProductsQueryParams>,
    res: Response,
    next: NextFunction
) => {
    const {view, q, new: isNew} = req.query;

    try {
        let products = getProducts();

        // filter views
        const userView = (view as UserView) || 'doctor';
        products = products.filter(product => product.visibleTo.includes(userView));

        // search
        if (q) {
            const searchTerm = q.toLowerCase();
            products = products.filter(product => product.publicName.toLowerCase().includes(searchTerm));
        }

        // filter is new (not more than 30days)
        if (isNew === 'true') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            products = products.filter(product => {
                const createdAt = new Date(product.createdAt);
                return createdAt >= thirtyDaysAgo;
            });
        }

        const responseData: ProductsResponse[] = products.map(p => ({
            id: p.id,
            publicName: p.publicName,
            category: p.category ?? '',
            brand: p.brand ?? '',
            isWholesaleProduct: p.isWholesaleProduct ?? false,
            priceCents: p.priceCents ?? 0,
            createdAt: p.createdAt,
            visibleTo:p.visibleTo ?? [],
        }));

        const response: ApiResponse<ProductsResponse[]> = {
            data: responseData,
            count: responseData.length,
        };

        res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
}
