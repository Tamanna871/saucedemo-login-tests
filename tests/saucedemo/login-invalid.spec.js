import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { invalidLoginCases } from '../../test-data/login-cases';

test.describe('Login page: invalid login', () => {
    let loginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    for (const { name, username, password, error } of invalidLoginCases) {
        test(`${name} shows the expected error`, async () => {
            await loginPage.login(username, password);

            await expect(loginPage.errorMessage).toHaveText(error);
        });
    }

    test('failed login keeps the user on the login page', async () => {
        await loginPage.login('wrong_user', 'wrong_password');

        await expect(loginPage.loginButton).toBeVisible();
    });
    
});