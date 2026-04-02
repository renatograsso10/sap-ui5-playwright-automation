import { test, expect } from '../src/fixtures/test';

test.describe('Browse Orders @smoke @browse-orders', () => {
  test('opens an order from the list and shows its details', async ({ browseOrdersPage }) => {
    await browseOrdersPage.open();

    await expect(browseOrdersPage.ordersHeading).toBeVisible();

    const orderLabel = await browseOrdersPage.openFirstOrder();

    await expect(browseOrdersPage.detailHeading(orderLabel)).toBeVisible();
    await expect(browseOrdersPage.shippingAddressRegion()).toBeVisible();
    await expect(browseOrdersPage.lineItemsGrid()).toBeVisible();
  });
});

