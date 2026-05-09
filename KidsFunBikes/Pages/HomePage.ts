import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly logo: Locator;
  readonly login: Locator;
  readonly cargrid: Locator;
  readonly cookieAcceptButton: Locator;
  readonly gridUsedCars: Locator;
  readonly gridQuads: Locator;
  readonly gridOffRoad: Locator;
  readonly browseNow: Locator;
  readonly reviews: Locator;
  readonly trustpilotReviewLink: Locator;  
  readonly footerBikes: Locator[];
  readonly emailField: Locator;
  readonly searchbox: Locator;
  readonly productInBasket: Locator;
  readonly quantityBasket: Locator;



  readonly url = 'https://www.motox1-atv.co.uk/';

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'MotoX1 Warrington' }).first();
    this.cargrid = page.getByRole('img', { name: 'MotoX1 hero image 3' });
    this.emailField = page.getByRole('textbox', { name: 'Email' });
    this.searchbox = page.getByRole('combobox', { name: 'Search' });
    this.productInBasket = page.getByRole('cell', { name: 'Revvi 12" Kids Electric Bike £325.00 Colour: Black' });
    this.quantityBasket = page.getByRole('spinbutton', { name: 'Quantity for Revvi 12&quot;' })


// constructor
    this.trustpilotReviewLink = page.locator('a[href*="trustpilot.com/review/www.motox1-atv.co.uk"]');   
    this.login = page.getByRole('link', { name: 'Log in' });
    // Define your locators once here
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.cookieAcceptButton = page.getByRole('button', { name: 'Accept' });
    this.browseNow = page.getByRole('link', { name: 'Browse now' });
    this.reviews = page.getByText('★★★★★');    // Inside your HomePage class constructor
    this.gridUsedCars = page.getByRole('link', { name: 'Hand-picked stock Used Cars' });
    this.gridQuads = page.getByRole('link', { name: 'Ride ready Quads &' });
    this.gridOffRoad = page.getByRole('link', { name: 'Kids & adults Off-Road Bikes' });

    this.footerBikes = [
        page.getByRole('link', { name: 'New Revvi 20" Electric Bike' }),
        page.getByRole('link', { name: 'New Revvi 18” electric bike' }),
        page.getByRole('link', { name: 'PRE ORDER JUNE - New Revvi 16' }),
        page.getByRole('link', { name: 'Revvi Junior 16” Plus' }),
];
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
async verifyReviewsVisible() {
  await expect(this.reviews).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    await expect(this.reviews.nth(i)).toBeVisible();
  }
}

async verifyTrustpilotReviewLinkVisible() {
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await this.trustpilotReviewLink.scrollIntoViewIfNeeded();
  await expect(this.trustpilotReviewLink).toBeVisible({ timeout: 10000 });
}

async verifyFooterBikesVisible() {
  for (const bike of this.footerBikes) {
    await expect(bike).toBeVisible();
  }
}
}