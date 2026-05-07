import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage'; 

test.describe('MotoX1 Home Page Test', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate(); 
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/MotoX1/); 
  });

  test('should be able to select the login icon', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
  });

  test('should be able to select the motox1 logo icon', async () => {
    await homePage.logo.click();
  });

  test('should be able to see the car grid', async () => {
    await expect(homePage.cargrid).toBeVisible(); 
}); 

 test('should be able to see the three grid rail', async () => {
      await expect(homePage.gridUsedCars).toBeVisible();
      await expect(homePage.gridQuads).toBeVisible();
      await expect(homePage.gridOffRoad).toBeVisible();
}); 
});