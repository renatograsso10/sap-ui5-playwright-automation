import { test, expect } from '../src/fixtures/test';

test.describe('Employee Directory @regression @employee-directory', () => {
  test('navigates from the home screen to an employee detail page', async ({
    employeeDirectoryPage,
    page,
  }) => {
    await test.step('open home screen', async () => {
      await employeeDirectoryPage.open();
      await expect(employeeDirectoryPage.homeHeading).toBeVisible();
    });

    await test.step('navigate to employee list', async () => {
      await employeeDirectoryPage.showEmployeeList();
      await expect(employeeDirectoryPage.employeeListHeading).toBeVisible();
      await expect(employeeDirectoryPage.employeeName('Nancy Davolio')).toBeVisible();
    });

    await test.step('open employee detail page', async () => {
      await employeeDirectoryPage.openEmployee('Nancy Davolio');
      await expect(page).toHaveURL(/#\/employees\/1$/);
      await expect(employeeDirectoryPage.employeeDetailsHeading('Nancy Davolio')).toBeVisible();
      await expect(employeeDirectoryPage.employeeIdHeading(1)).toBeVisible();
      await expect(page.getByText(/seattle, wa/i)).toBeVisible();
    });
  });
});
