import fs from 'fs/promises';
import { chromium, type FullConfig, type Page } from '@playwright/test';
import { AUTH_STATE_DIR, AUTH_STATE_PATH } from './paths';

async function acceptCookiesIfPresent(page: Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: /(accept all|aceitar tudo)/i });
  if (await acceptButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await acceptButton.click();
  }
}

export default async function globalSetup(config: FullConfig): Promise<void> {
  const projectUse = config.projects[0]?.use ?? {};
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    baseURL: String(projectUse.baseURL ?? 'https://ui5.sap.com'),
    locale: String(projectUse.locale ?? 'en-US'),
    viewport: projectUse.viewport as { width: number; height: number } | undefined,
  });
  const page = await context.newPage();

  await page.goto('/#/demoapps', { waitUntil: 'domcontentloaded' });
  await acceptCookiesIfPresent(page);
  await page.getByRole('heading', { name: /^demo apps$/i }).waitFor({ state: 'visible' });

  await fs.mkdir(AUTH_STATE_DIR, { recursive: true });
  await context.storageState({ path: AUTH_STATE_PATH });

  await browser.close();
}
