import {Request, Response} from 'express';
import {getProducts} from '../utils/loadProducts';
import {} from '../types';
import {ProductsQueryParams, UserView, ApiResponse, ProductsResponse } from '../types';
import {NextFunction} from 'express';

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

        const responseData: ProductsResponse[] = products.map(product => ({
            id: product.id,
            publicName: product.publicName,
            category: product.category,
            brand: product.brand,
            isWholesaleProduct: product.isWholesaleProduct,
            visibleTo: product.visibleTo,
            priceCents: product.priceCents,
            createdAt: product.createdAt
        }));

        const response: ApiResponse<ProductsResponse> = {
            data: responseData,
            total: responseData.length
        }

        res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
}
