import type { Locator } from '@playwright/test';
import { buttonByName, linkByName } from '../../ui5/ui5-locators';

export class Ui5ListSection {
  constructor(private readonly root: Locator) {}

  container(): Locator {
    return this.root;
  }

  list(): Locator {
    return this.root.getByRole('list').first();
  }

  itemByText(text: string | RegExp): Locator {
    return this.list().getByText(text).first();
  }

  listItemByName(name: string | RegExp): Locator {
    return this.list().getByRole('listitem', { name }).first();
  }

  button(name: string | RegExp): Locator {
    return buttonByName(this.root, name).first();
  }

  link(name: string | RegExp): Locator {
    return linkByName(this.root, name).first();
  }

  text(text: string | RegExp): Locator {
    return this.root.getByText(text).first();
  }
}

