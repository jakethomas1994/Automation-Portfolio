import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly logo: Locator;
  readonly cargrid: Locator;
  readonly cookieAcceptButton: Locator;
  readonly gridUsedCars: Locator;
  readonly gridQuads: Locator;
  readonly gridOffRoad: Locator;



  readonly url = 'https://www.motox1-atv.co.uk/';

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'MotoX1 Warrington' }).first();
    this.cargrid = page.getByRole('img', { name: 'MotoX1 hero image 3' });
    // Define your locators once here
    this.searchInput = page.locator('#search-input'); 
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.cookieAcceptButton = page.getByRole('button', { name: 'Accept' });
    // Inside your HomePage class constructor
    this.gridUsedCars = page.getByRole('link', { name: 'Hand-picked stock Used Cars' });
    this.gridQuads = page.getByRole('link', { name: 'Ride ready Quads &' });
    this.gridOffRoad = page.getByRole('link', { name: 'Kids & adults Off-Road Bikes' });
  }

async navigate() {
  // 1. Go to the URL and wait until the network is quiet
  await this.page.goto(this.url, { waitUntil: 'networkidle' });

  // 2. Give the cookie banner a moment to animate in
  try {
    // If the button appears within 3 seconds, click it. 
    // If not, the 'catch' block prevents the whole test from crashing.
    await this.cookieAcceptButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.cookieAcceptButton.click();
  } catch (e) {
    console.log('Cookie banner did not appear, moving on...');
  }
}

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}