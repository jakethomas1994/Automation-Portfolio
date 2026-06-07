import { type Page, type Locator } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;

  readonly contactUs: Locator;
  readonly qualityUsedCars: Locator;
  readonly electricBikes: Locator;
  readonly accessories: Locator;
  readonly dirtBikes: Locator;
  readonly quadBikes: Locator;
  readonly scooters: Locator;
  readonly rideOnToys: Locator;

  readonly searchButton: Locator;
  readonly loginButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    const nav = page.getByRole('navigation');

    this.contactUs = nav.locator('a[title="Contact us"]');
    this.qualityUsedCars = nav.locator('a[title="Quality Used Cars"]');
    this.electricBikes = nav.locator('a[title="Electric bikes"]');
    this.accessories = nav.locator('a[title="Accessories"]');
    this.dirtBikes = nav.locator('a[title="Dirt bikes"]');
    this.quadBikes = nav.locator('a[title="Quad bikes"]');
    this.scooters = nav.locator('a[title="Scooters"]');
    this.rideOnToys = nav.locator('a[title="Ride on toys"]');

    this.searchButton = page.getByRole('button', { name: /Search/i });
    this.loginButton = page.getByRole('link', { name: /Log in/i });
    this.cartButton = page.getByRole('link', { name: /Cart/i });
  }
}
