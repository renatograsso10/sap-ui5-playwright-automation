import { expect, type Locator, type Page } from '@playwright/test';

export async function waitForBusyIndicatorsToClear(page: Page): Promise<void> {
  const busyIndicators = page.locator(
    '[aria-busy="true"], .sapUiLocalBusyIndicator, .sapUiLocalBusyIndicatorAnimation, .sapMBusyIndicator'
  );
  await busyIndicators.first().waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => {});
}

export async function waitForUi5Ready(page: Page, readyLocator: Locator): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await waitForBusyIndicatorsToClear(page);
  await expect(readyLocator).toBeVisible();
  await waitForBusyIndicatorsToClear(page);
}

export async function waitForHash(page: Page, hashFragment: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(hashFragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

export async function acceptCookiesIfPresent(page: Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: /(accept all|aceitar tudo)/i });
  if (await acceptButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await acceptButton.click();
    await expect(acceptButton).toBeHidden({ timeout: 10_000 });
  }
}
