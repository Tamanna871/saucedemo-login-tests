import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../test-data/users';

test.describe('Login page: elements', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('shows username, password and login button', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('fields show the expected placeholders', async () => {
        await expect(loginPage.usernameInput).toHaveAttribute('placeholder', 'Username');
        await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password');
    });

    test('password field is masked', async () => {
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });
});

test.describe('Login page: valid login', () => {
    let loginPage;
    let productsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await loginPage.goto();
    });

    test('standard user lands on the products page', async ({ page }) => {
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(page).toHaveURL('/inventory.html');
        await expect(productsPage.title).toHaveText('Products');
    });

    test('logged-in user can log out', async () => {
        await loginPage.login(users.standard.username, users.standard.password);
        await productsPage.logout();

        await expect(loginPage.loginButton).toBeVisible();
    });
});