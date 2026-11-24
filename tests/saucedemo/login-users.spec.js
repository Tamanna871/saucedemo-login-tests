import { test, expect } from '../../fixtures/fixtures';
import { users } from '../../test-data/users';

const loggingInUsers = ['standard', 'problem', 'error', 'visual'];

test.describe('Login page: users who can log in', () => {
    for (const key of loggingInUsers) {
        test(`${key} user reaches the products page`, async ({ loginPage, productsPage }) => {
            await loginPage.goto();
            await loginPage.login(users[key].username, users[key].password);

            await expect(productsPage.title).toHaveText('Products');
        });
    }
});