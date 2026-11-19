import { test, expect } from '@playwright/test';

test('login page opens', async({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();
});