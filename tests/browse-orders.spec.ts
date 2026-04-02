import { test, expect } from '../src/fixtures/test';

test.describe('Browse Orders @smoke @browse-orders', () => {
  test('opens an order from the list and shows its details', async ({ browseOrdersPage }) => {
    await test.step('open orders list', async () => {
      await browseOrdersPage.open();
      await expect(browseOrdersPage.ordersHeading).toBeVisible();
    });

    const orderLabel = await test.step('select the first order', async () => {
      return await browseOrdersPage.openFirstOrder();
    });

    await test.step('verify order details are displayed', async () => {
      await expect(browseOrdersPage.detailHeading(orderLabel)).toBeVisible();
      await expect(browseOrdersPage.shippingAddressRegion()).toBeVisible();
      await expect(browseOrdersPage.lineItemsGrid()).toBeVisible();
    });
  });
});

