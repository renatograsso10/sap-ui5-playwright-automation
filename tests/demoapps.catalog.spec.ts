import { demoApps } from '../src/data/demo-apps';
import { test, expect } from '../src/fixtures/test';

test.describe('Demo Apps catalog @smoke @catalog', () => {
  test('shows the catalog and the entry points for the selected demo apps', async ({
    demoAppsCatalogPage,
    page,
  }) => {
    await test.step('open catalog page', async () => {
      await demoAppsCatalogPage.open();
    });

    await test.step('verify catalog page structure', async () => {
      await expect(page).toHaveURL(/#\/demoapps/);
      await expect(page).toHaveTitle(/demo apps/i);
      await expect(demoAppsCatalogPage.heading).toBeVisible();
      await expect(demoAppsCatalogPage.readMoreButton).toBeVisible();
    });

    await test.step('verify all demo app cards are visible', async () => {
      for (const app of demoAppsCatalogPage.appCards()) {
        await expect(demoAppsCatalogPage.card(app.name)).toBeVisible();
        await expect(demoAppsCatalogPage.openAppLink(app.name)).toBeVisible();
      }
    });
  });

  test('navigates from the catalog to the Shopping Cart app', async ({
    demoAppsCatalogPage,
  }) => {
    await test.step('open catalog and navigate to Shopping Cart', async () => {
      await demoAppsCatalogPage.open();
      const appPage = await demoAppsCatalogPage.openAppFromCatalog(demoApps.shoppingCart);

      await expect(appPage).toHaveURL(/cart\/webapp\/index\.html/);
      await expect(appPage.getByRole('heading', { name: /product catalog/i })).toBeVisible();
    });
  });
});
