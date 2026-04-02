import { expect, type Page } from '@playwright/test';
import { waitForBusyIndicatorsToClear } from '../ui5/ui5-waits';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected abstract get appUrl(): string;

  abstract waitUntilReady(): Promise<void>;

  async open(): Promise<void> {
    await this.page.goto(this.appUrl);
    await this.waitUntilReady();
  }

  protected async waitForDomAndBusy(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await waitForBusyIndicatorsToClear(this.page);
  }
}
