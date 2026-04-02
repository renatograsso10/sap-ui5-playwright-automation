import { defineConfig } from '@playwright/test';
import { AUTH_STATE_PATH } from './src/support/paths';

export default defineConfig({
  testDir: './tests',
  testIgnore: ['tests/api/**'],
  fullyParallel: false,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report/ui' }],
  ],
  outputDir: 'test-results/ui',
  globalSetup: require.resolve('./src/support/global-setup'),
  use: {
    baseURL: 'https://ui5.sap.com',
    browserName: 'chromium',
    headless: true,
    locale: 'en-US',
    viewport: { width: 1440, height: 1024 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    storageState: AUTH_STATE_PATH,
  },
  projects: [
    {
      name: 'chromium',
    },
  ],
});
