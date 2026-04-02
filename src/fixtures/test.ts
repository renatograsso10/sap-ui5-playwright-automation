import { test as base, expect } from '@playwright/test';
import { BrowseOrdersPage } from '../pages/browse-orders-page';
import { DemoAppsCatalogPage } from '../pages/demoapps-catalog-page';
import { EmployeeDirectoryPage } from '../pages/employee-directory-page';
import { ManageProductsPage } from '../pages/manage-products-page';
import { ShopAdministrationToolPage } from '../pages/shop-administration-tool-page';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { WalkthroughPage } from '../pages/walkthrough-page';
import { TestDiagnosticsCollector } from '../support/test-diagnostics';

type AppFixtures = {
  demoAppsCatalogPage: DemoAppsCatalogPage;
  shoppingCartPage: ShoppingCartPage;
  browseOrdersPage: BrowseOrdersPage;
  manageProductsPage: ManageProductsPage;
  employeeDirectoryPage: EmployeeDirectoryPage;
  walkthroughPage: WalkthroughPage;
  shopAdministrationToolPage: ShopAdministrationToolPage;
  diagnostics: void;
};

export const test = base.extend<AppFixtures>({
  diagnostics: [
    async ({ page }, use, testInfo) => {
      const collector = new TestDiagnosticsCollector(page);
      collector.attach();

      await use();
      await collector.attachOnFailure(testInfo);
    },
    { auto: true },
  ],
  demoAppsCatalogPage: async ({ page }, use) => {
    await use(new DemoAppsCatalogPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
  browseOrdersPage: async ({ page }, use) => {
    await use(new BrowseOrdersPage(page));
  },
  manageProductsPage: async ({ page }, use) => {
    await use(new ManageProductsPage(page));
  },
  employeeDirectoryPage: async ({ page }, use) => {
    await use(new EmployeeDirectoryPage(page));
  },
  walkthroughPage: async ({ page }, use) => {
    await use(new WalkthroughPage(page));
  },
  shopAdministrationToolPage: async ({ page }, use) => {
    await use(new ShopAdministrationToolPage(page));
  },
});

export { expect };
