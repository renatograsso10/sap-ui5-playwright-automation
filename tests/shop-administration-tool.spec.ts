import { test, expect } from '../src/fixtures/test';

test.describe('Shop Administration Tool @regression @shop-administration-tool', () => {
  test('collapses the side menu while keeping the overview content visible', async ({
    shopAdministrationToolPage,
  }) => {
    await shopAdministrationToolPage.open();

    await expect(shopAdministrationToolPage.heading).toBeVisible();
    await expect(shopAdministrationToolPage.customerOverviewHeading).toBeVisible();
    await expect(shopAdministrationToolPage.text(/usage statistics/i)).toBeVisible();

    await shopAdministrationToolPage.collapseMenu();

    await expect(shopAdministrationToolPage.text(/usage statistics/i)).toBeHidden();
    await expect(shopAdministrationToolPage.customerOverviewGrid().row(/marry/i)).toBeVisible();
    await expect(shopAdministrationToolPage.text(/administration/i)).toBeVisible();
  });
});
