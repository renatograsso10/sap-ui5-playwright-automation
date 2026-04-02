import { test, expect } from '../src/fixtures/test';

test.describe('Shopping Cart @smoke @shopping-cart', () => {
  test('adds a promoted item to the cart and shows it in the cart pane', async ({
    shoppingCartPage,
  }) => {
    await shoppingCartPage.open();

    await expect(shoppingCartPage.catalogHeading).toBeVisible();
    await expect(shoppingCartPage.categoriesList).toBeVisible();
    await shoppingCartPage.searchProducts('screen');

    const addedItem = await shoppingCartPage.addFirstPromotedItemToCart();
    await shoppingCartPage.openShoppingCart();

    await expect(shoppingCartPage.cartItemsList).toBeVisible();
    await expect(shoppingCartPage.cartItem(addedItem)).toBeVisible();
    await expect(shoppingCartPage.cartRegion).toContainText(/total:/i);
  });
});

