import { expect, type Locator, type Page } from '@playwright/test';
import { Ui5IconTabBar } from '../components/ui5/icon-tab-bar';
import { Ui5WorklistGrid } from '../components/ui5/worklist-grid';
import { demoApps } from '../data/demo-apps';
import { searchboxByName } from '../ui5/ui5-locators';

export class ManageProductsPage {
  constructor(private readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByText(/^Manage Products$/).first();
  }

  get productsHeading(): Locator {
    return this.page.getByText(/^Products \(\d+\)$/).first();
  }

  get searchbox(): Locator {
    return searchboxByName(this.page, /search/i);
  }

  async open(): Promise<void> {
    await this.page.goto(demoApps.manageProducts.url);
    await this.waitUntilReady();
  }

  async waitUntilReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForFunction(() => {
      const bodyText = document.body?.innerText ?? '';
      return bodyText.includes('Manage Products') && bodyText.includes('Products (14)');
    });
    await expect(this.productsHeading).toBeVisible();
  }

  async searchProducts(query: string): Promise<void> {
    await this.searchbox.fill(query);
    await expect(this.searchbox).toHaveValue(query);
  }

  stockTabs(): Ui5IconTabBar {
    return new Ui5IconTabBar(this.page);
  }

  async showShortageProducts(): Promise<void> {
    await this.stockTabs().select(/shortage/i);
    await expect(this.page.getByText(/^Products \(3\)$/)).toBeVisible();
  }

  productRow(text: string | RegExp): Locator {
    return this.worklistGrid().row(text);
  }

  supplierText(text: string | RegExp): Locator {
    return this.worklistGrid().text(text);
  }

  text(text: string | RegExp): Locator {
    return this.page.getByText(text).first();
  }

  worklistGrid(): Ui5WorklistGrid {
    return new Ui5WorklistGrid(this.page);
  }
}
