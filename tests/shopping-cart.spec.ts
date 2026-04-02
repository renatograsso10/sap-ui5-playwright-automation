import { test, expect } from '../src/fixtures/test';

test.describe('Shopping Cart @smoke @shopping-cart', () => {
  test('adds a promoted item to the cart and shows it in the cart pane', async ({
    shoppingCartPage,
  }) => {
    await test.step('open catalog and verify structure', async () => {
      await shoppingCartPage.open();
      await expect(shoppingCartPage.catalogHeading).toBeVisible();
      await expect(shoppingCartPage.categoriesList).toBeVisible();
    });

    await test.step('search for products and add to cart', async () => {
      await shoppingCartPage.searchProducts('screen');
      const addedItem = await shoppingCartPage.addFirstPromotedItemToCart();

      await test.step('open cart and verify item is present', async () => {
        await shoppingCartPage.openShoppingCart();
        await expect(shoppingCartPage.cartItemsList).toBeVisible();
        await expect(shoppingCartPage.cartItem(addedItem)).toBeVisible();
        await expect(shoppingCartPage.cartRegion).toContainText(/total:/i);
      });
    });
  });
});

