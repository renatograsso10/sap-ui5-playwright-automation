import { test, expect } from '../src/fixtures/test';

test.describe('Walkthrough @regression @walkthrough', () => {
  test('opens the hello dialog and keeps the invoices table visible', async ({
    walkthroughPage,
  }) => {
    await test.step('open walkthrough page', async () => {
      await walkthroughPage.open();
      await expect(walkthroughPage.walkthroughHeading).toBeVisible();
      await expect(walkthroughPage.helloWorldHeading).toBeVisible();
    });

    await test.step('open hello dialog and verify contents', async () => {
      await walkthroughPage.openHelloDialog();
      await expect(walkthroughPage.helloDialog()).toBeVisible();
      await expect(walkthroughPage.helloDialog()).toContainText(/hello world/i);
      await expect(walkthroughPage.helloDialog().getByRole('button', { name: /^ok$/i })).toBeVisible();
    });

    await test.step('verify invoices table remains visible', async () => {
      await expect(walkthroughPage.invoicesGrid().row(/milk/i)).toBeVisible();
    });
  });
});

