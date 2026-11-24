import { test, expect } from '../../fixtures/fixtures';
import { users } from '../../test-data/users';


test('standard user can log in', async ({ loginPage, productsPage }) => { 
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(productsPage.title).toHaveText('Products');
});