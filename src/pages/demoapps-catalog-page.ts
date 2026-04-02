import type { Locator, Page } from '@playwright/test';
import { DemoAppCard } from '../components/ui5/demo-app-card';
import { demoApps, type DemoAppDefinition } from '../data/demo-apps';
import { escapeRegExp } from '../support/strings';
import { buttonByName, regionByName } from '../ui5/ui5-locators';
import { acceptCookiesIfPresent, waitForUi5Ready } from '../ui5/ui5-waits';
import { BasePage } from './base-page';

export class DemoAppsCatalogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /^demo apps$/i });
  }

  get readMoreButton(): Locator {
    return buttonByName(this.page, /read more/i);
  }

  protected get appUrl(): string {
    return '/#/demoapps';
  }

  async open(): Promise<void> {
    await this.page.goto(this.appUrl);
    await this.acceptCookies();
    await this.waitUntilReady();
  }

  async waitUntilReady(): Promise<void> {
    await waitForUi5Ready(this.page, this.heading);
  }

  async acceptCookies(): Promise<void> {
    await acceptCookiesIfPresent(this.page);
  }

  card(appName: string): Locator {
    return this.appCard(appName).container();
  }

  openAppLink(appName: string): Locator {
    return this.appCard(appName).openAppLink();
  }

  appCard(appName: string): DemoAppCard {
    return new DemoAppCard(regionByName(this.page, new RegExp(escapeRegExp(appName), 'i')));
  }

  async openAppFromCatalog(app: DemoAppDefinition): Promise<Page> {
    await this.acceptCookies();
    const popupPromise = this.page.waitForEvent('popup').catch(() => null);
    const link = this.appCard(app.name).openAppLink();

    try {
      await link.click({ timeout: 5_000 });
      const popup = await popupPromise;

      return popup ?? this.page;
    } catch {
      const href = await link.getAttribute('href');
      if (!href) {
        throw new Error(`Missing href for catalog link: ${app.name}`);
      }

      const targetPage = await this.page.context().newPage();
      await targetPage.goto(new URL(href, this.page.url()).toString(), {
        waitUntil: 'domcontentloaded',
      });

      return targetPage;
    }
  }

  appCards(): DemoAppDefinition[] {
    return [
      demoApps.shoppingCart,
      demoApps.browseOrders,
      demoApps.manageProducts,
      demoApps.employeeDirectory,
      demoApps.walkthrough,
      demoApps.shopAdministrationTool,
    ];
  }
}
