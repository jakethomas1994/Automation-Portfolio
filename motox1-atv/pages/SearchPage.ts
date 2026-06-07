import { type Locator, type Page, } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly searchbox: Locator;
  readonly searchCloseButton: Locator;
  readonly searchInsideTextBox: Locator;


  constructor(page: Page) {
    this.page = page;

    this.searchbox = page.getByRole('combobox', { name: 'Search' });
    this.searchCloseButton =  page.getByRole('button', { name: 'Close' });
    this.searchInsideTextBox =  page.getByRole('search').getByRole('button', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

async search(searchTerm: string) {
  await this.searchButton.click();  
  await this.searchbox.click();
  await this.searchbox.fill(searchTerm);
  await this.searchbox.press('Enter');
}

}