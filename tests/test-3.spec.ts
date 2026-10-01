import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  page.setDefaultTimeout(0); //No action timeout
  test.setTimeout(60_000); //60s for test
  await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click();
  await page.locator('#customer_login').click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('steveuser@example.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('SteveUser1!');
  await page.getByRole('button', { name: 'Log in' }).click();
  //await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
  await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
  //await page.goto('https://www.edgewordstraining.co.uk/demo-site/shop/');
  await page.getByRole('link', { name: 'Cap Cap Sale! Original price' }).click();
  await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page.getByRole('link', { name: 'View cart ' }).click();
  await page.getByRole('button', { name: 'Remove Cap from cart' }).click();
  await page.getByRole('link', { name: 'Return to shop' }).click();
  await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click();
  await page.getByRole('link', { name: ' Log out' }).click();
  //await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
});