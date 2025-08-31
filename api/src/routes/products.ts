import {Router} from 'express';
import {getProductsHandler} from '../controllers/productsController';

const router = Router();
router.get('/', getProductsHandler);
export default router;