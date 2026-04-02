import type { Locator } from '@playwright/test';
import { linkByName } from '../../ui5/ui5-locators';

export class DemoAppCard {
  constructor(private readonly root: Locator) {}

  container(): Locator {
    return this.root;
  }

  openAppLink(): Locator {
    return linkByName(this.root, /open app/i).first();
  }
}

