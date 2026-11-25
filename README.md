# SauceDemo Login Tests

![Playwright Tests](https://github.com/Tamanna871/saucedemo-login-tests/actions/workflows/playwright.yml/badge.svg)

Automated end-to-end tests for the login page of [SauceDemo](https://www.saucedemo.com), written with Playwright and JavaScript. 22 tests, run on every push with GitHub Actions.

## What is covered
- Login page elements: fields, placeholders, masked password
- Valid login and logout
- Invalid login (data-driven, 8 cases): empty fields, missing username or password, unknown user, wrong password, case sensitivity, locked-out user
- Direct access to the products page without logging in, and after logging out
- Users who can log in: standard, problem, error, visual
- Slow login for the performance glitch user (longer wait on that one check)

## Tech
Playwright, JavaScript, Node.js, GitHub Actions

## Project structure
- `tests/saucedemo/`: test files
- `pages/`: page objects (`LoginPage`, `ProductsPage`)
- `fixtures/`: custom fixtures that provide the page objects to tests
- `test-data/`: users, error messages, and the table of invalid login cases

## How to run

You need [Node.js](https://nodejs.org) installed.

1. Clone the repository and open the folder:
   ```bash
   git clone https://github.com/Tamanna871/saucedemo-login-tests.git
   cd saucedemo-login-tests
   ```
2. Install the dependencies and the Playwright browsers:
   ```bash
   npm install
   npx playwright install
   ```
3. Run the tests (the same two projects CI runs):
   ```bash
   npx playwright test --project=chromium --project="Mobile Chrome"
   ```
4. Open the HTML report:
   ```bash
   npx playwright show-report
   ```

To run all five configured projects (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari), use `npx playwright test` with no `--project` option.

## Test reporting
HTML report. On failure the config keeps a screenshot, a video and a trace.

## CI
GitHub Actions runs the Chromium and Mobile Chrome projects on every push and pull request, and saves the HTML report so it can be downloaded from the run.

## Notes
- Tests run against the public demo site, so results depend on its availability.
- Scope: only the scenarios listed under "What is covered" are automated. This is not a complete test suite for the site.