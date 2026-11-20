import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../test-data/users';


test('standard user can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(productsPage.title).toHaveText('Products');
});