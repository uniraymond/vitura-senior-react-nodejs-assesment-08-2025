import {Product} from '../types';

import * as fs from 'fs/promises';
import * as path from 'path';

let products: Product[] = [];

export const loadProducts = async (): Promise<Product[]> => {
  try {
    const filePath = path.join(__dirname, '..', '..', 'data', 'sample-products.json');
    console.log('Load products', filePath);

    const data = await fs.readFile(filePath, 'utf-8');
    products = JSON.parse(data);
    console.log(`Loaded ${products.length} products into memory`);
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    throw new Error('Failed to load products data');
  }
};

export const getProducts = (): Product[] => products;