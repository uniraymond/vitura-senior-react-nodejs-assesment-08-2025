import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type {Product, UserView} from '../types';

const ProductList = ({products}: {products: Product[]}) => {

    return (
        <div style={{display: 'grid', gap: 12}}>
            {products && products.map(product => (
                <Card key={product.id} variant="outlined">
                    <CardContent>
                        <Typography variant="h6">
                            {product.publicName}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {(product.visibleTo ?? []).map((v: UserView) => (
                            <Chip key={v} label={v} />
                            ))}
                        </Stack>
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