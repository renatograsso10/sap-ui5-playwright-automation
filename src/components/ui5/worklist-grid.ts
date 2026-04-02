import type { Locator, Page } from '@playwright/test';
import { rowByText } from '../../ui5/ui5-locators';

type Scope = Page | Locator;

export class Ui5WorklistGrid {
  constructor(private readonly scope: Scope) {}

  container(): Locator {
    return 'url' in this.scope ? this.scope.locator('[role="grid"], table').first() : this.scope;
  }

  row(text: string | RegExp): Locator {
    return rowByText(this.scope, text);
  }

  text(text: string | RegExp): Locator {
    return this.scope.getByText(text).first();
  }
}
