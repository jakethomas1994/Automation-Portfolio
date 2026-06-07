import { test, expect } from '../../fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
    

  test('homepage should have no accessibility violations', async ({ homePage, page, isMobile }) => {
    test.skip(isMobile, 'Mobile layout renders differently — accessibility tested on desktop only');
    const results = await new AxeBuilder({ page })
      .include('main')
      .exclude('iframe')
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('product page should have no accessibility violations', async ({ productPage, page, isMobile }) => {
    test.skip(isMobile, 'Mobile layout renders differently — accessibility tested on desktop only');
    const results = await new AxeBuilder({ page })
      .include('main')
      .exclude('iframe')
      .exclude('[data-fera-component]')
      .analyze();
    expect(results.violations).toEqual([]);
  });

});
