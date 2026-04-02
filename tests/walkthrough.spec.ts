import { test, expect } from '../src/fixtures/test';

test.describe('Walkthrough @regression @walkthrough', () => {
  test('opens the hello dialog and keeps the invoices table visible', async ({
    walkthroughPage,
  }) => {
    await walkthroughPage.open();

    await expect(walkthroughPage.walkthroughHeading).toBeVisible();
    await expect(walkthroughPage.helloWorldHeading).toBeVisible();

    await walkthroughPage.openHelloDialog();

    await expect(walkthroughPage.helloDialog()).toBeVisible();
    await expect(walkthroughPage.helloDialog()).toContainText(/hello world/i);
    await expect(walkthroughPage.helloDialog().getByRole('button', { name: /^ok$/i })).toBeVisible();
    await expect(walkthroughPage.invoicesGrid().row(/milk/i)).toBeVisible();
  });
});

