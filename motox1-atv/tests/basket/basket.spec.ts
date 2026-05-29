import { test, expect } from '../../fixtures';


    test.describe('Basket', () => {

    test('should be able to add an item to the checkout and remove it', async ({ homePage, page }) => {
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

      test('should add a product to the basket', async ({ homePage, page }) => {
      await homePage.searchButton.click();
      await homePage.searchbox.click();
      await homePage.searchbox.fill('kids revvi');
      await page.getByRole('link', { name: 'Revvi 12 Revvi 12" Kids' }).click();
      await page.getByRole('button', { name: 'Add To Basket • £' }).click();
      await expect(homePage.productInBasket).toBeVisible();
      await expect (homePage.quantityBasket).toBeVisible();
  }); 

      test('should remove a product from the bçasket', async ({ homePage, page }) => {
      await homePage.searchButton.click();
      await homePage.searchbox.click();
      await homePage.searchbox.fill('kids revvi');
      await page.getByRole('link', { name: 'Revvi 12 Revvi 12" Kids' }).click();
      await page.getByRole('button', { name: 'Add To Basket • £' }).click();
      await homePage.quantityBasket.fill('0');
      await page.locator('cart-items').click();
      await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
  }); 

  });
