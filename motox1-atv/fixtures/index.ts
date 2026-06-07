import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { NavigationPage } from '../pages/NavigationPage';



type Fixtures = {
  homePage: HomePage;
  searchPage: SearchPage;
  productPage: ProductPage;
  navigationPage: NavigationPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await use(homePage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
    await use(productPage);
  },

    navigationPage: async ({ page }, use) => {
    const navigationPage = new NavigationPage(page);
    await use(navigationPage);
  },

});

export { expect } from '@playwright/test';
