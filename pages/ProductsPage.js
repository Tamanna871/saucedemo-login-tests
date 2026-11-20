export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }
}