import { test, expect } from '../../fixtures/fixtures';
import { users } from '../../test-data/users';

test('performance glitch user reaches the products page, slowly', async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(users.performanceGlitch.username, users.performanceGlitch.password);

    // Manual check: login takes about 6 to 8 seconds. The default check wait is 5 seconds.
    await expect(productsPage.title).toHaveText('Products', { timeout: 20000 });
});