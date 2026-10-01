import { expect } from '@playwright/test'
import { test } from './my-test'
import { HomePagePOM } from './POMs/HomePagePOM';
import { LoginPagePOM } from './POMs/LoginPagePOM';
import { AddRecordPOM } from './POMs/AddRecordPagePOM';
import testdata from './test-data/logins.json';

test('Non POM login', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    await page.getByRole('link', { name: 'Login To Restricted Area' }).click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').fill('edgewords');
    await page.locator('#password').click();
    await page.locator('#password').fill('edgewords123');
    await page.getByRole('link', { name: 'Submit' }).click();
    await expect(page.locator('h1')).toContainText('Add A Record To the Database');
})

test('POM test login', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    const homepage = new HomePagePOM(page);
    await homepage.goLogin();
    const loginpage = new LoginPagePOM(page);
    // Using "low level" service methods of the POM class
    // await loginpage.setUsername('edgewords');
    // await loginpage.setPassword('edgewords123');
    // await loginpage.submitForm();

    // Using a "higher level" service method that combines the low level steps
    await loginpage.login('edgewords', 'edgewords123');

    //Assertions *still belong in the test* - not in the POM classes
    const addrecordpage = new AddRecordPOM(page);
    //await expect(addrecordpage.heading, {message: "The heading is wrong"}) //Custom error message for expect failiure
    //.toHaveText('Add A Record To the Database'); //Retries, but locator needed to leak in to test (ecapsulation fail)
    //expect(await addrecordpage.getHeading()).toBe('Add A Record To the Database'); //Doesn't leak locator, but also doesn't retry. Heading captured once then checked.
    await expect.poll(async () => { //Supply custom polling (retrying) method
        return await addrecordpage.getHeading(); //returns from async functions are automatically wrapped as promises
    },
        { //Optional options object
            intervals: [250, 500, 1500], //... Defaults to [100, 250, 500, 1000].
            timeout: 7000, //Custom timeout goes here, not in the matcher that follows
            message: "Eek"
        }).toBe('Add A Record To the DatabaseX'); //toBe is a base Jest matcher, not PW.
    // https://playwright.dev/docs/test-assertions#expectpoll
})


test('OR test login', async ({ page }) => {
    //You could opt for an Object Repositoy approach, where the test is
    //not responsible for finding elements, but remains responsible for using located elements to perform actions
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    const homepage = new HomePagePOM(page);
    await homepage.loginLink.click();
    const loginpage = new LoginPagePOM(page);
    // In the POM approach locators should be propery encapsulated (hidden) from tests.
    // This prevents tests from "accedentally" taking over finding elements and performing actions via locator chaining
    // await loginpage.usernameBox.locator('xpath=../../../').click() //Get parents of usernamebox and click

    await loginpage.usernameBox.fill('edgewords');

    // The locatos used below have been made private either via TS of JS
    // The steps are commented out to allow this code to compile
    // await loginpage.passwordBox.fill('edgewords123');
    // await loginpage.#submitBtn.click();
});

for (const credentials of testdata) {
    test(`Data driven test using ${credentials.username}`, async ({ page }) => {
        await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
        const homepage = new HomePagePOM(page);
        await homepage.goLogin();
        const loginpage = new LoginPagePOM(page);
        await loginpage.login(credentials.username, credentials.password);
        const addrecordpage = new AddRecordPOM(page);
        await expect.poll(async () => { //Supply custom polling (retrying) method
            return await addrecordpage.getHeading(); //returns from async functions are automatically wrapped as promises
        },
            { //Optional options object
                intervals: [250, 500, 1500], //... Defaults to [100, 250, 500, 1000].
                timeout: 7000, //Custom timeout goes here, not in the matcher that follows
                message: "Eek"
            }).toBe('Add A Record To the Database'); //toBe is a base Jest matcher, not PW.
    })
}


test("Reading env vars", async ({ page, person }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    const homepage = new HomePagePOM(page);
    await homepage.goLogin();
    const loginpage = new LoginPagePOM(page);
    await loginpage.login(person, "edgewords");
})