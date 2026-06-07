import { test, expect } from '../../fixtures';
import { type Page } from '@playwright/test';

async function skipIfCloudflareBlocked(page: Page) {
  const isBlocked = await page.getByText('There was a problem loading this website').isVisible();
  test.skip(isBlocked, 'Cloudflare is preventing automation on this site');
}

test.describe('Product', () => {

  test('should display the product price', async ({ productPage, page }) => {
    await skipIfCloudflareBlocked(page);
    await expect(productPage.productPrice).toBeVisible();
  });

  test('should display the product image', async ({ productPage, page }) => {
    await skipIfCloudflareBlocked(page);
    await expect(productPage.productImage).toBeVisible();
  });

  test('should display the product description', async ({ productPage, page }) => {
    await skipIfCloudflareBlocked(page);
    await expect(productPage.productDescription).toBeVisible();
  });

  test('should display the specifications link', async ({ productPage, page }) => {
    await skipIfCloudflareBlocked(page);
    await expect(productPage.specifications).toBeVisible();
  });

  test('should display the order now button', async ({ productPage, page }) => {
    await skipIfCloudflareBlocked(page);
    await expect(productPage.orderNow).toBeVisible();
  });

  test('should scroll to buy box when order now is clicked', async ({ productPage, page }) => {
    await skipIfCloudflareBlocked(page);
    await productPage.orderNow.click();
    await expect(page.getByRole('button', { name: 'Add To Basket - £' })).toBeVisible();
  });

});
