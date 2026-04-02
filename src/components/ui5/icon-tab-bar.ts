import type { Locator, Page } from '@playwright/test';
import { tabByName } from '../../ui5/ui5-locators';

type Scope = Page | Locator;

export class Ui5IconTabBar {
  constructor(private readonly scope: Scope) {}

  container(): Locator {
    return 'url' in this.scope ? this.scope.getByRole('tablist').first() : this.scope;
  }

  tab(name: string | RegExp): Locator {
    return tabByName(this.scope, name).first();
  }

  async select(name: string | RegExp): Promise<void> {
    await this.tab(name).click();
  }
}

