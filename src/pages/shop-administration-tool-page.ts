import { expect, type Locator, type Page } from '@playwright/test';
import { Ui5WorklistGrid } from '../components/ui5/worklist-grid';
import { demoApps } from '../data/demo-apps';

export class ShopAdministrationToolPage {
  constructor(private readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /customized shop administration tool/i });
  }

  get collapseMenuButton(): Locator {
    return this.page.getByRole('button', { name: /collpase menu/i });
  }

  get customerOverviewHeading(): Locator {
    return this.page.getByRole('heading', { name: /customer overview/i });
  }

  async open(): Promise<void> {
    await this.page.goto(demoApps.shopAdministrationTool.url);
    await this.waitUntilReady();
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
