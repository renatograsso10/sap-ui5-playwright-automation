import { expect, type Locator, type Page } from '@playwright/test';
import { Ui5DynamicPage } from '../components/ui5/dynamic-page';
import { Ui5IconTabBar } from '../components/ui5/icon-tab-bar';
import { Ui5ListSection } from '../components/ui5/list-section';
import { Ui5SplitLayout } from '../components/ui5/split-layout';
import { Ui5WorklistGrid } from '../components/ui5/worklist-grid';
import { demoApps } from '../data/demo-apps';
import { normalizeWhitespace } from '../support/strings';
import { regionByHeading } from '../ui5/ui5-locators';
import { waitForUi5Ready } from '../ui5/ui5-waits';
import { BasePage } from './base-page';

export class BrowseOrdersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  splitLayout(): Ui5SplitLayout {
    return new Ui5SplitLayout(this.page);
  }

  get ordersHeading(): Locator {
    return this.page.getByRole('heading', { name: /orders \(\d+\)/i });
  }

  get orderListItems(): Locator {
    return this.ordersSection().container().getByRole('listitem').filter({ hasText: /order \d+/i });
  }

  protected get appUrl(): string {
    return demoApps.browseOrders.url;
  }

  async waitUntilReady(): Promise<void> {
    await waitForUi5Ready(this.page, this.ordersHeading);
    await expect(this.orderListItems.first()).toBeVisible();
  }

  async openFirstOrder(): Promise<string> {
    const firstItem = this.orderListItems.first();
    const orderText = normalizeWhitespace(await firstItem.textContent());
    const orderLabel = orderText.match(/Order \d+/i)?.[0] ?? 'Order';

    await firstItem.click();
    await expect(this.page).toHaveURL(/#\/Orders\/\d+/);

    return orderLabel;
  }

  detailHeading(orderLabel: string): Locator {
    return this.page.getByRole('heading', { name: new RegExp(orderLabel, 'i') }).last();
  }

  ordersSection(): Ui5ListSection {
    return new Ui5ListSection(regionByHeading(this.splitLayout().firstColumn(), /orders \(\d+\)/i));
  }

  shippingAddressRegion(): Locator {
    return this.detailsPage().container().getByRole('form', { name: /shipping address/i }).first();
  }

  lineItemsGrid(): Locator {
    return this.lineItemsSection().container();
  }

  detailsPage(): Ui5DynamicPage {
    return new Ui5DynamicPage(this.splitLayout().middleColumn().locator('article').first());
  }

  detailsTabs(): Ui5IconTabBar {
    return new Ui5IconTabBar(this.detailsPage().container());
  }

  lineItemsSection(): Ui5WorklistGrid {
    return new Ui5WorklistGrid(this.detailsPage().container().getByRole('grid', { name: /line items/i }));
  }
}
