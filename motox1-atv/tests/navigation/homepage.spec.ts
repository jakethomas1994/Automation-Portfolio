import { test, expect } from '../../fixtures';


test.describe('MotoX1 Home Page Test', () => {

  test('should be able to see all elements on page', async ({  homePage, page }) => {
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
       

});