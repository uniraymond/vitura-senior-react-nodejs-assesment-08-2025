import { Card, CardContent, Typography } from '@mui/material';
import type {Product} from '../types';

const ProductList = ({products}: {products: Product[]}) => {

    return (
        <div style={{display: 'grid', gap: 12}}>
            {products && products.map(product => (
                <Card key={product.id} variant="outlined">
                    <CardContent>
                        <Typography variant="h6">
                            {product.publicName}
                        </Typography>
                        <Typography variant="body2">
                            {product.brand ?? '-'} . {product.category ?? '-'} . {new Date(product.createdAt).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 

export default ProductList;