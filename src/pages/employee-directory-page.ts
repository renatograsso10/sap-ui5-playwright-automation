import { expect, type Locator, type Page } from '@playwright/test';
import { demoApps } from '../data/demo-apps';
import { BasePage } from './base-page';

export class EmployeeDirectoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get homeHeading(): Locator {
    return this.page.getByRole('heading', { name: /^home$/i });
  }

  get employeeListHeading(): Locator {
    return this.page.getByRole('heading', { name: /employee list/i });
  }

  get showEmployeeListButton(): Locator {
    return this.page.getByRole('button', { name: /show employee list/i });
  }

  protected get appUrl(): string {
    return demoApps.employeeDirectory.url;
  }

  async waitUntilReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.homeHeading).toBeVisible();
    await expect(this.showEmployeeListButton).toBeVisible();
  }

  async showEmployeeList(): Promise<void> {
    await this.showEmployeeListButton.click();
    await expect(this.page).toHaveURL(/#\/employees$/);
    await expect(this.employeeListHeading).toBeVisible();
  }

  employeeName(name: string): Locator {
    return this.page.getByText(new RegExp(`^${name}$`, 'i')).first();
  }

  async openEmployee(name: string): Promise<void> {
    await this.employeeName(name).click();
  }

  employeeDetailsHeading(name: string): Locator {
    return this.page.getByRole('heading', { name: new RegExp(`employee details of ${name}`, 'i') });
  }

  employeeIdHeading(id: string | number): Locator {
    return this.page.getByRole('heading', { name: new RegExp(`employee id: ${id}`, 'i') });
  }
}
