import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { errors } from '../../test-data/messages';
import { PASSWORD, users, invalidUsers } from '../../test-data/users';

test.describe('Login page: invalid login', () => {
    let loginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('empty username and password shows username required', async () => {
        await loginPage.login('', '');

        await expect(loginPage.errorMessage).toHaveText(errors.usernameRequired);
    });

    test('username without password shows password required', async () => {
        await loginPage.login(users.standard.username, '');

        await expect(loginPage.errorMessage).toHaveText(errors.passwordRequired);
    });

    test('password without username shows username required', async () => {
        await loginPage.login('', PASSWORD);

        await expect(loginPage.errorMessage).toHaveText(errors.usernameRequired);
    });

    test('unknown username shows invalid credentials', async () => {
        await loginPage.login(invalidUsers.unknown.username, invalidUsers.unknown.password);

        await expect(loginPage.errorMessage).toHaveText(errors.invalidCredentials);
    });

    test('wrong password shows invalid credentials', async () => {
        await loginPage.login(invalidUsers.wrongPassword.username, invalidUsers.wrongPassword.password);

        await expect(loginPage.errorMessage).toHaveText(errors.invalidCredentials);
    });

    test('username is case sensitive', async () => {
        await loginPage.login(invalidUsers.capitalisedUsername.username, invalidUsers.capitalisedUsername.password);

        await expect(loginPage.errorMessage).toHaveText(errors.invalidCredentials);
    });

    test('password is case sensitive', async () => {
        await loginPage.login(invalidUsers.capitalisedPassword.username, invalidUsers.capitalisedPassword.password);

        await expect(loginPage.errorMessage).toHaveText(errors.invalidCredentials);
    });

    test('locked out user cannot log in', async () => {
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);

        await expect(loginPage.errorMessage).toHaveText(errors.lockedOut);
    });

    test('failed login keeps the user on the login page', async () => {
        await loginPage.login(invalidUsers.unknown.username, invalidUsers.unknown.password);

        await expect(loginPage.loginButton).toBeVisible();
    });
    
});