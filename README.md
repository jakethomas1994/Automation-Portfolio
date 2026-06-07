# Automation Portfolio — Jake Thomas

Senior Test Engineer with 8 years of software testing experience, building this portfolio to demonstrate modern Playwright test automation skills.

---

## What is this project?

This is a personal automation portfolio built with [Playwright](https://playwright.dev/) and TypeScript. It tests real-world e-commerce websites to demonstrate end-to-end testing across multiple browsers and devices.

The first project targets **[MotoX1 ATV](https://www.motox1-atv.co.uk/)** — a UK-based retailer of kids electric bikes, quad bikes, and off-road vehicles.

---

## Purpose & Values

- Write tests that reflect how real users interact with a site — not just happy paths
- Keep tests maintainable using the **Page Object Model (POM)** pattern
- Prioritise test reliability over coverage — a flaky test is worse than no test
- Make CI a first-class citizen — every push runs the full suite automatically

---

## What it Showcases

- **Page Object Model** — locators and actions encapsulated per page (`HomePage`, `SearchPage`, `ProductPage`, `NavigationPage`)
- **Playwright Fixtures** — shared setup injected into tests via `base.extend`, eliminating repetition
- **Cross-browser testing** — Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
- **Dynamic test skipping** — tests detect Cloudflare bot protection at runtime and skip gracefully rather than failing
- **Mobile-aware tests** — mobile viewports configured, tests that can't run on mobile (e.g. basket, desktop nav) skip with clear reasons
- **GitHub Actions CI** — automated test runs on every push and pull request with HTML report artifacts

---

## Test Coverage

| Area | Tests | Notes |
|---|---|---|
| Homepage | Elements visible | Logo, search, grids, reviews, footer |
| Search | Valid search, no results, navigate to product | Cloudflare-aware skip on mobile |
| Basket | Add to basket, remove from basket | Skipped on mobile (Cloudflare bot protection) |
| Product | Price, image, description, specs, order now | Direct URL navigation |
| Navigation | All nav links visible, link navigation | Desktop only — hamburger menu on mobile |

---

## How to Run Locally

**Prerequisites:** Node.js (LTS)

```bash
# Clone the repo
git clone https://github.com/jakethomas1994/Automation-Portfolio.git
cd Automation-Portfolio/motox1-atv

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run a specific suite
npx playwright test tests/search/
npx playwright test tests/product/
npx playwright test tests/basket/
npx playwright test tests/navigation/

# Open the HTML report
npx playwright show-report
```

---

## How We Stay Up to Date

- Playwright is pinned in `package.json` and updated deliberately — not automatically
- Tests are run against the live site on every push, so regressions from site changes are caught quickly
- Locators use accessible roles and attributes (`getByRole`, `getByTitle`) rather than brittle CSS selectors where possible

---

## Future Improvements

- [x] Accessibility testing with axe-core
- [ ] API-level tests for network requests (price/stock validation)
- [ ] Shared cookie consent helper to remove duplication across page objects
- [ ] Browser caching in GitHub Actions to speed up CI
- [ ] Add second website project to demonstrate multi-project portfolio structure
- [ ] Visual regression testing

---

## CI Status

![Playwright Tests](https://github.com/jakethomas1994/Automation-Portfolio/actions/workflows/playwright.yml/badge.svg)
