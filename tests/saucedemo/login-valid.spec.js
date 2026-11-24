import { test, expect } from '../../fixtures/fixtures';
import { users } from '../../test-data/users';

test.describe('Login page: elements', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('shows username, password and login button', async ({ loginPage }) => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('fields show the expected placeholders', async ({ loginPage }) => {
        await expect(loginPage.usernameInput).toHaveAttribute('placeholder', 'Username');
        await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password');
    });

    test('password field is masked', async ({ loginPage }) => {
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });
});

test.describe('Login page: valid login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('standard user lands on the products page', async ({ page, loginPage, productsPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(page).toHaveURL('/inventory.html');
        await expect(productsPage.title).toHaveText('Products');
    });

    test('logged-in user can log out', async ({ loginPage, productsPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await productsPage.logout();

        await expect(loginPage.loginButton).toBeVisible();
    });
});