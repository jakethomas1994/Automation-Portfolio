import { test, expect } from '../../fixtures';

test.describe('Navigation Tests', () => {

  test('should be able to see all nav links', async ({ navigationPage, homePage, isMobile }) => {
    test.skip(isMobile, 'Nav links are hidden behind hamburger menu on mobile');
    await expect(navigationPage.contactUs).toBeVisible();
    await expect(navigationPage.qualityUsedCars).toBeVisible();
    await expect(navigationPage.electricBikes).toBeVisible();
    await expect(navigationPage.accessories).toBeVisible();
    await expect(navigationPage.dirtBikes).toBeVisible();
    await expect(navigationPage.quadBikes).toBeVisible();
    await expect(navigationPage.scooters).toBeVisible();
    await expect(navigationPage.rideOnToys).toBeVisible();
    await expect(navigationPage.searchButton).toBeVisible();
    await expect(navigationPage.loginButton).toBeVisible();
    await expect(navigationPage.cartButton).toBeVisible();
  });

  test('should navigate to quality used cars page', async ({ navigationPage, homePage, isMobile, page }) => {
    test.skip(isMobile, 'Nav links are hidden behind hamburger menu on mobile');
    await navigationPage.qualityUsedCars.click();
    await expect(page).toHaveURL(/north-west-car-sales/i);
  });

  test('should navigate to dirt bikes page', async ({ navigationPage, homePage, isMobile, page }) => {
    test.skip(isMobile, 'Nav links are hidden behind hamburger menu on mobile');
    await navigationPage.dirtBikes.click();
    await expect(page).toHaveURL(/petrol-bikes/i);
  });

});
