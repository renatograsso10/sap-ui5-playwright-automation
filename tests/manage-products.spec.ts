import { test, expect } from '../src/fixtures/test';

test.describe('Manage Products @smoke @manage-products', () => {
  test('filters the worklist to the shortage products tab', async ({ manageProductsPage }) => {
    await manageProductsPage.open();

    await expect(manageProductsPage.heading).toBeVisible();
    await expect(manageProductsPage.productsHeading).toBeVisible();

    await manageProductsPage.showShortageProducts();

    await expect(manageProductsPage.productRow(/ikura/i)).toBeVisible();
    await expect(manageProductsPage.productRow(/northwoods cranberry sauce/i)).toBeVisible();
    await expect(manageProductsPage.text(/alice mutton/i)).toBeHidden();
  });
});
