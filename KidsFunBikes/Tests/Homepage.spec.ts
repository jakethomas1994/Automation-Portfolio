import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage'; 

test.describe('MotoX1 Home Page Test', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate(); 
  });

  test('should be able to see all elements on page', async ({ page }) => {
    await expect(page).toHaveTitle(/MotoX1/); 
    // await expect(homePage.login).toBeVisible();
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
    await expect(homePage.cargrid).toBeVisible(); 
    await expect(homePage.gridUsedCars).toBeVisible();
    await expect(homePage.gridQuads).toBeVisible();
    await expect(homePage.gridOffRoad).toBeVisible();
    await expect(homePage.browseNow).toBeVisible();
    // await homePage.verifyTrustpilotReviewLinkVisible();   
    await expect(homePage.emailField).toBeVisible()
    await homePage.verifyReviewsVisible();
    await homePage.verifyFooterBikesVisible();
  });   

    test('should be able to add an item to the checkout and remove it', async ({ page }) => {
      await homePage.searchButton.click();
      await homePage.searchbox.click();
      await homePage.searchbox.fill('kids revvi');
      await page.getByRole('link', { name: 'Revvi 12 Revvi 12" Kids' }).click();
      await page.getByRole('button', { name: 'Add To Basket • £' }).click();
      await expect(homePage.productInBasket).toBeVisible();
      await expect (homePage.quantityBasket).toBeVisible();
      await homePage.quantityBasket.click();
      await homePage.quantityBasket.fill('0');
      await page.locator('cart-items').click();
      await page.getByRole('heading', { name: 'Your cart is empty' }).click();
  });        

});