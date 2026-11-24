import { test, expect } from '../../fixtures/fixtures';
import { invalidLoginCases } from '../../test-data/login-cases';

test.describe('Login page: invalid login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    for (const { name, username, password, error } of invalidLoginCases) {
        test(`${name} shows the expected error`, async ({ loginPage }) => {
            await loginPage.login(username, password);

            await expect(loginPage.errorMessage).toHaveText(error);
        });
    }

    test('failed login keeps the user on the login page', async ({ loginPage }) => {
        await loginPage.login('wrong_user', 'wrong_password');

        await expect(loginPage.loginButton).toBeVisible();
    });
});