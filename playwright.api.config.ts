import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api',
  fullyParallel: true,
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report/api' }],
  ],
  outputDir: 'test-results/api',
  use: {
    baseURL: 'https://ui5.sap.com',
  },
});

