import { test, expect } from '../../fixtures';
import { type Page } from '@playwright/test';

async function skipIfCloudflareBlocked(page: Page) {
  const isBlocked = await page.getByText('There was a problem loading this website').isVisible();
  test.skip(isBlocked, 'Cloudflare is preventing automation on this site');
}

test.describe('Search', () => {

  test('should display results for a valid search term', async ({ homePage, searchPage, page }) => {
    await searchPage.search('Revvi');
    await skipIfCloudflareBlocked(page);
    await expect(page.getByRole('link', { name: /Revvi/i }).first()).toBeVisible();
  });

  test('should display no results message for an invalid search term', async ({ homePage, searchPage, page }) => {
    await searchPage.search('xyznotaproduct123');
    await skipIfCloudflareBlocked(page);
    await expect(page.getByText(/no results/i)).toBeVisible();
  });

  test('should be able to search and navigate to a product', async ({ homePage, searchPage, page }) => {
    await searchPage.search('kids revvi');
    await skipIfCloudflareBlocked(page);
    await page.getByRole('link', { name: /Revvi 12/i }).first().click();
    await expect(page.getByRole('button', { name: 'Add To Basket • £' })).toBeVisible();
  });

});
