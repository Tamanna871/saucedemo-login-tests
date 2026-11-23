import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { errors } from '../../test-data/messages';
import { users } from '../../test-data/users';

let loginPage;
let productsPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
});

test('opening the products page directly shows a login error', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(loginPage.errorMessage).toHaveText(errors.notLoggedIn);
    await expect(loginPage.loginButton).toBeVisible();
});

test('opening the products page after logging out shows a login error', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(productsPage.title).toHaveText('Products');

    await productsPage.logout();
    await expect(loginPage.loginButton).toBeVisible();

    await page.goto('/inventory.html');
    await expect(loginPage.errorMessage).toHaveText(errors.notLoggedIn);
    await expect(loginPage.loginButton).toBeVisible();
});