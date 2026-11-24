import { test, expect } from '../../fixtures/fixtures';
import { errors } from '../../test-data/messages';
import { users } from '../../test-data/users';


test('opening the products page directly shows a login error', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');

    await expect(loginPage.errorMessage).toHaveText(errors.notLoggedIn);
    await expect(loginPage.loginButton).toBeVisible();
});

test('opening the products page after logging out shows a login error', async ({ page, loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(productsPage.title).toHaveText('Products');

    await productsPage.logout();
    await expect(loginPage.loginButton).toBeVisible();

    await page.goto('/inventory.html');
    await expect(loginPage.errorMessage).toHaveText(errors.notLoggedIn);
    await expect(loginPage.loginButton).toBeVisible();
});