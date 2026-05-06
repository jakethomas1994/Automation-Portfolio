import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    // Define your locators once here
    this.searchInput = page.locator('#search-input'); 
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.logo = page.locator('.header-logo');
  }

  async navigate() {
    await this.page.goto('/'); // Uses the baseURL from your config
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}