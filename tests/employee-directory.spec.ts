import { test, expect } from '../src/fixtures/test';

test.describe('Employee Directory @regression @employee-directory', () => {
  test('navigates from the home screen to an employee detail page', async ({
    employeeDirectoryPage,
    page,
  }) => {
    await employeeDirectoryPage.open();

    await expect(employeeDirectoryPage.homeHeading).toBeVisible();

    await employeeDirectoryPage.showEmployeeList();
    await expect(employeeDirectoryPage.employeeListHeading).toBeVisible();
    await expect(employeeDirectoryPage.employeeName('Nancy Davolio')).toBeVisible();

    await employeeDirectoryPage.openEmployee('Nancy Davolio');

    await expect(page).toHaveURL(/#\/employees\/1$/);
    await expect(employeeDirectoryPage.employeeDetailsHeading('Nancy Davolio')).toBeVisible();
    await expect(employeeDirectoryPage.employeeIdHeading(1)).toBeVisible();
    await expect(page.getByText(/seattle, wa/i)).toBeVisible();
  });
});
