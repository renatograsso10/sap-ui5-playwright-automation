import type { Locator, Page } from '@playwright/test';

const FIRST_COLUMN = /^first column$/i;
const MIDDLE_COLUMN = /^middle column$/i;
const LAST_COLUMN = /^last column$/i;

export class Ui5SplitLayout {
  constructor(private readonly page: Page) {}

  firstColumn(): Locator {
    return this.page.getByRole('region', { name: FIRST_COLUMN }).first();
  }

  middleColumn(): Locator {
    return this.page.getByRole('region', { name: MIDDLE_COLUMN }).first();
  }

  lastColumn(): Locator {
    return this.page.getByRole('region', { name: LAST_COLUMN }).first();
  }
}

