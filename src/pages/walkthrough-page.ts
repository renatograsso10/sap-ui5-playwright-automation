import { expect, type Locator, type Page } from '@playwright/test';
import { Ui5WorklistGrid } from '../components/ui5/worklist-grid';
import { demoApps } from '../data/demo-apps';
import { BasePage } from './base-page';

export class WalkthroughPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get walkthroughHeading(): Locator {
    return this.page.getByRole('heading', { name: /^walkthrough$/i });
  }

  get helloWorldHeading(): Locator {
    return this.page.getByRole('heading', { name: /^hello world$/i }).first();
  }

  get sayHelloWithDialogButton(): Locator {
    return this.page.getByRole('button', { name: /say hello with dialog/i });
  }

  protected get appUrl(): string {
    return demoApps.walkthrough.url;
  }

  async waitUntilReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.walkthroughHeading).toBeVisible();
    await expect(this.sayHelloWithDialogButton).toBeVisible();
  }

  async openHelloDialog(): Promise<void> {
    await this.sayHelloWithDialogButton.click();
  }

  helloDialog(): Locator {
    return this.page.getByRole('dialog').filter({ hasText: /hello world/i }).first();
  }

  invoicesGrid(): Ui5WorklistGrid {
    return new Ui5WorklistGrid(this.page);
  }
}

