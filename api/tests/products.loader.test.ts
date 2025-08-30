import * as fs from 'fs/promises';
import * as path from 'path';
import {loadProducts} from '../src/utils/loadProducts';

describe('utils/loadProducts', () => {
  it('loads and parses successfully', async () => {
    const products = await loadProducts();

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);

    expect(products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        publicName: expect.any(String),
        createdAt: expect.any(String),
      })
    );
  });
});
