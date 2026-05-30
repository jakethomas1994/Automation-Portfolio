import { test, expect } from '../../fixtures';

test.describe('Basket', () => {
  test.skip(({ isMobile }) => isMobile, 'Cloudflare bot protection blocks mobile automation on this site');

  test('should add a product to the basket', async ({ homePage, page }) => {
    await homePage.searchButton.click();
    await homePage.searchbox.click();
    await homePage.searchbox.fill('kids revvi');
    await page.getByRole('link', { name: 'Revvi 12 Revvi 12" Kids' }).click();
    await page.getByRole('button', { name: 'Add To Basket • £' }).click();
    await expect(homePage.productInBasket).toBeVisible();
    await expect(homePage.quantityBasket).toBeVisible();
  });

  test('should remove a product from the basket', async ({ homePage, page }) => {
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
