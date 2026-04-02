import { expect, type Locator, type Page } from '@playwright/test';
import { Ui5WorklistGrid } from '../components/ui5/worklist-grid';
import { demoApps } from '../data/demo-apps';
import { BasePage } from './base-page';

export class ShopAdministrationToolPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /customized shop administration tool/i });
  }

  get collapseMenuButton(): Locator {
    return this.page.getByRole('button', { name: /collpase menu/i });
  }

  get customerOverviewHeading(): Locator {
    return this.page.getByRole('heading', { name: /customer overview/i });
  }

  protected get appUrl(): string {
    return demoApps.shopAdministrationTool.url;
  }

  async waitUntilReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.heading).toBeVisible();
    await expect(this.customerOverviewHeading).toBeVisible();
  }

  async collapseMenu(): Promise<void> {
    await this.collapseMenuButton.click();
  }

  text(text: string | RegExp): Locator {
    return this.page.getByText(text).first();
  }

  customerOverviewGrid(): Ui5WorklistGrid {
    return new Ui5WorklistGrid(this.page);
  }
}
