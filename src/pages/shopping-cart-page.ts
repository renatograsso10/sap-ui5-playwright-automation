import { expect, type Locator, type Page } from '@playwright/test';
import { Ui5ListSection } from '../components/ui5/list-section';
import { Ui5SplitLayout } from '../components/ui5/split-layout';
import { demoApps } from '../data/demo-apps';
import { normalizeWhitespace } from '../support/strings';
import {
  buttonByName,
  linkByName,
  listByName,
  listItemByName,
  regionByHeading,
  searchboxByName,
} from '../ui5/ui5-locators';
import { waitForHash, waitForUi5Ready } from '../ui5/ui5-waits';
import { BasePage } from './base-page';

export class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  splitLayout(): Ui5SplitLayout {
    return new Ui5SplitLayout(this.page);
  }

  get catalogHeading(): Locator {
    return this.page.getByRole('heading', { name: /product catalog/i });
  }

  get categoriesList(): Locator {
    return listByName(this.splitLayout().firstColumn(), /categories/i);
  }

  get showShoppingCartButton(): Locator {
    return buttonByName(this.page, /show shopping cart/i);
  }

  get cartRegion(): Locator {
    return this.splitLayout().lastColumn();
  }

  get cartItemsList(): Locator {
    return this.cartSection().list();
  }

  get searchbox(): Locator {
    return searchboxByName(this.page, /search/i);
  }

  protected get appUrl(): string {
    return demoApps.shoppingCart.url;
  }

  async waitUntilReady(): Promise<void> {
    await waitForUi5Ready(this.page, this.catalogHeading);
    await expect(this.categoriesList).toBeVisible();
    await expect(this.showShoppingCartButton).toBeVisible();
  }

  async searchProducts(query: string): Promise<void> {
    await this.searchbox.fill(query);
    await expect(this.searchbox).toHaveValue(query);
  }

  async selectCategory(categoryName: string): Promise<void> {
    await listItemByName(this.categoriesList, new RegExp(categoryName, 'i')).first().click();
  }

  categoriesSection(): Ui5ListSection {
    return new Ui5ListSection(regionByHeading(this.splitLayout().firstColumn(), /categories/i));
  }

  promotedItemsRegion(): Locator {
    return this.promotedItemsSection().container();
  }

  promotedItemsSection(): Ui5ListSection {
    return new Ui5ListSection(regionByHeading(this.splitLayout().middleColumn(), /promoted items/i));
  }

  cartSection(): Ui5ListSection {
    return new Ui5ListSection(this.splitLayout().lastColumn());
  }

  async addFirstPromotedItemToCart(): Promise<string> {
    const promotedItems = this.promotedItemsSection();
    const firstLink = promotedItems.link(/.+/);
    const firstAddButton = promotedItems.button(/add to shopping cart/i);
    const itemName = normalizeWhitespace(await firstLink.textContent());

    if (!itemName) {
      throw new Error('Could not resolve promoted item name — textContent was empty');
    }

    await firstAddButton.click();

    return itemName;
  }

  async openShoppingCart(): Promise<void> {
    await this.showShoppingCartButton.click();
    await waitForHash(this.page, '#/cart');
    await expect(this.cartRegion).toBeVisible();
  }

  cartItem(itemName: string): Locator {
    return this.cartSection().itemByText(new RegExp(itemName, 'i'));
  }
}
