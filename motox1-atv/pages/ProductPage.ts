import { type Locator, type Page, } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productPrice: Locator;
  readonly orderNow: Locator;
  readonly specifications: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly cookieAcceptButton: Locator;


  constructor(page: Page) {
    this.page = page;
    
    this.cookieAcceptButton = page.getByRole('button', { name: 'Accept' });
    this.productPrice = page.locator('.mx1-price')
    this.orderNow =  page.getByRole('link', { name: 'Order Now' }).first()
    this.specifications = page.getByRole('link', { name: 'View Specs' })
    this.productDescription = page.getByRole('paragraph').first()
    this.productImage = page.getByRole('img').first()
  }

async navigate() {
  // 1. Go to the URL and wait until the network is quiet
await this.page.goto('https://www.motox1-atv.co.uk/collections/littletrax-kids-electric-bike-showcase/products/littletrax-350w-kids-electric-bike-ages-3-to-7-ride-on-mini-motorbike')

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
}
