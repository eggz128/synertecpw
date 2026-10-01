import { test, expect } from '@playwright/test'; //Bring in the test() and expect() methods from Playwright to use in this file

// test.beforeAll(async ({page})=>{ //beforeAll page isnt carried over to test instance
//   await page.goto('https://playwright.dev/');
// })

test.beforeEach(async ({page})=>{ //beforeEach page is carried over to test instance
  await page.goto('https://playwright.dev/');
})

//Playwright's test method (at minimum) takes 2 args test(arg1,arg2)
//1st - The title (name) of the test
//2nd - an async callback function containing the actual test code
test('has title',  async function({ page }) {
  //await page.goto('https://playwright.dev/'); //To pass beforeEach above must be uncommented

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  await page.goto('https://www.bing.com');
});

//Arrow syntax is fine for the callback function (and is the default)
test('get started link', async ({ page }) => { //By requesting the 'page' fixture, PW will start a browser, then a context, then a page and pass it (the page) to the test for use.
  //await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});