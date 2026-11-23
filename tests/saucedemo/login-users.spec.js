import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../test-data/users';

const loggingInUsers = ['standard', 'problem', 'error', 'visual'];

test.describe('Login page: users who can log in', () => {
    for (const key of loggingInUsers) {
        test(`${key} user reaches the products page`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);

            await loginPage.goto();
            await loginPage.login(users[key].username, users[key].password);

            await expect(productsPage.title).toHaveText('Products');
        });
    }
});