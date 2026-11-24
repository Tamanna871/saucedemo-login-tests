import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../test-data/users';

test('performance glitch user reaches the products page, slowly', async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(users.performanceGlitch.username, users.performanceGlitch.password);

    // Manual check: login takes about 6 to 8 seconds. The default check wait is 5 seconds.
    await expect(productsPage.title).toHaveText('Products', { timeout: 20000 });
});