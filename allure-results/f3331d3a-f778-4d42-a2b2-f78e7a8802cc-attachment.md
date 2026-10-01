# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ProjectDepsExample.spec.ts >> Should already be logged in
- Location: tests\ProjectDepsExample.spec.ts:10:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Add A Record"
Received string:    "Access and Authentication"
Timeout: 10000ms

Call log:
  - Expect "toContainText" locator('h1') with timeout 10000ms
  - waiting for locator('h1')
    17 × locator resolved to <h1>Access and Authentication</h1>
       - unexpected value "Access and Authentication"

```

```yaml
- heading "Access and Authentication" [level=1]
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | //These tests expect to be logged in to work
  3  | //That is achieved via setup (and teardown) projects defined in the playwright.config.ts file
  4  | //Setup does a log in, then stores the login cookie
  5  | //When these tests are run, the project restores the stashed cookies in to the browser before execution.
  6  | test.beforeEach(async ({ page }) => {
  7  |     await page.goto('https://www.edgewordstraining.co.uk/webdriver2/sdocs/add_record.php');
  8  | });
  9  | 
  10 | test('Should already be logged in', async ({ page }) => {
  11 |     
  12 |     await page.waitForTimeout(1000);
> 13 |     await expect(page.locator('h1')).toContainText('Add A Record');
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  14 |     await page.waitForTimeout(1000);
  15 | 
  16 | });
  17 | 
  18 | test('Should already be logged in2', async ({ page }) => {
  19 |     
  20 |     await page.waitForTimeout(1000);
  21 |     await expect(page.locator('h1')).toContainText('Add A Record');
  22 |     await page.waitForTimeout(1000);
  23 | 
  24 | });
```