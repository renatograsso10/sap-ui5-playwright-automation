import type { Locator } from '@playwright/test';
import { buttonByName } from '../../ui5/ui5-locators';

export class Ui5DynamicPage {
  constructor(private readonly root: Locator) {}

  container(): Locator {
    return this.root;
  }

  title(name: string | RegExp): Locator {
    return this.root.getByRole('heading', { name }).first();
  }

  content(): Locator {
    return this.root.locator('main, [role="main"], article').first();
  }

  button(name: string | RegExp): Locator {
    return buttonByName(this.root, name).first();
  }

  text(text: string | RegExp): Locator {
    return this.root.getByText(text).first();
  }
}

