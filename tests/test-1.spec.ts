import { test, expect } from '@playwright/test';

test.beforeAll(async ({ page })=>{
  await page.goto("https://www.bing.com/"); //Why does this work? It should not work?
  console.log("Runs once only before any tests")
});

test.afterAll(()=>{
  console.log("Runs once after all tests have finished")
});

test.beforeEach('beforeEact',()=>{
  console.log('Runs just before each individual test')
});

test.afterEach(()=>{
  console.log('Runs after each test finishes')
});

test.describe('An outer suite',() => {
  test.describe.configure({ mode: 'serial' });
  test.slow();
  test('Login Test', {lock: 'cart'},async ({ page }) => {
    /*Arrange*/
    /*Get things ready to test*/

    await page.goto('/webdriver2/');
    //Most automation tools follow this pattern:
    //Tool---------------------->Find something--------------------->Do something with it()
    //WebDriverJS: await driver.findElement(By.linkText("Login to restricted area")).click();
    //Cypress: cy.contains("Login to restricted area").click();
    await page.getByRole('link', { name: 'Login To Restricted Area' }).click(); //Locators need to match 1 element to be able to perform an action
    //await page.locator('a').nth(0).click(); //Get all links ->out of the set, get the first->click()
    //await page.locator('a >> nth=0').click();
    //await page.click('a') //Also clicks a link, but this is the old PW way - dont do this in new code

    /*Act*/
    /*Perform the actions required to have the desired outcome*/

    await page.locator('#username').filter({ visible: true }).click();
    await page.locator('#username').visible().fill('edgewords'); //New for PW 1.63
    const password = page.locator('#password'); //Locator references can be stored in variables and reused.
    await password.click(); //The element is only searched for when an action occurs.
    await password.fill('edgewords123'); //You will need to 'await' action outcomes - but you don't need to await just the locator reference.

    await page.getByRole('link', { name: 'Submit' }).click();

    /*Assert*/
    /*Did the desired outcome occur?*/
    await expect(page.locator('h1')).toContainText('Add A Record To the Database');
  });
  test.describe('An inner suite', () => {

    test('all products', async ({ page }) => {

      await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
      const newProducts = page.getByLabel('Recent Products');
      for (const prod of await newProducts.locator('h2:not(.section-title)').all()) { //gathers a collection of all() matching elements
        console.log(await prod.textContent()); //then loops over each individual matches logging the text
      }; //No need to await console, but you do need to await the locator.textContent() . Or you will only get the "promise" of the text, not the actual text.

    });

    test('Locator Handler @smoke', async ({ page, browserName }) => { //How to handle unpredicatable modal "pop ups"
      if(browserName==="webkit"){test.skip();} //If running in webkit - skip this test
      test.fail(); //This test should fail - if it passes, then report fail
      test.abort(); //This stops and fails the test
      // Setup the handler.
      const cookieConsent = page.getByRole('heading', { name: 'Hej! You are in control of your cookies.' });
      await page.addLocatorHandler(
        cookieConsent, //Locator to watch out for
        async () => { //If spotted, what to do
          //console.log("Spotted cookie consent")
          await page.getByRole('button', { name: 'Accept' }).click();
        }
        , //Optional arguments - can be omitted
        {
          times: 10, //How many times the locator may appear before the handler should stop handling the locator
          //By default Playwright will wait for the locator to no longer be visible before continuing with the test.
          noWaitAfter: false //this can be overridden however
        }
      );

      // Now write the test as usual. If at any time the cookie consent form is shown it will be accepted.
      await page.goto('https://www.ikea.com/');
      await page.getByRole('link', { name: "Make space for what you love" }).click();
      await expect(page.getByText('Make space forwhat you love')).toBeVisible();

      //If you're confident the locator will no longer be found you can de-register the handler
      //await page.removeLocatorHandler(cookieConsent);
      //If the cookie consent form appears from here on it may cause issues with the test...
      await page.waitForTimeout(10000); //Big dumb wait before finishing the test
    })
  })


  test('Actions', async ({ page }) => {

    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/index.html');
    await page.getByRole('link', { name: 'Forms' }).click();
    await expect(page).toHaveURL(/forms\.html$/);
    await expect.soft(page).toHaveTitle('FormsX', { timeout: 10000 }); //Soft expects allow rest of test steps to continue but still ultimately fails the test
    //await expect(page).toHaveTitle(/Forms|FormsX/); //Use RegEx to allow multiple values

    const slowExpect = expect.configure({ timeout: 6000 }) //a slower expect just for this test
    await slowExpect.soft(page.locator('#notthere')).toBeVisible();
    await slowExpect.soft(page.locator('#notthere')).toBeVisible();
    await page.locator('#textInput').click();

    //ToDo: ariasnapshot from disk
    let title = "Forms"
    await expect(page.locator('#right-column')).toMatchAriaSnapshot(`
    - heading "${title}" [level=1]
    - paragraph: This form has an id of theForm.
    - table:
      - rowgroup:
        - row "Text Input with id/name textInput * Hello World":
          - cell "Text Input with id/name textInput *"
          - cell "Hello World":
            - textbox: Hello World
        - row "Text Area with id/name textArea was here":
          - cell "Text Area with id/name textArea"
          - cell "was here":
            - textbox: was here
        - row "Checkbox with id/name checkbox":
          - cell "Checkbox with id/name checkbox"
          - cell:
            - checkbox [checked]
        - row "Select with id/name select Selection One":
          - cell "Select with id/name select"
          - cell "Selection One":
            - combobox:
              - option "Selection One" [selected]
              - option "Selection Two"
              - option "Selection Three"
        - row "Radio buttons with id/name radio One Two Three":
          - cell "Radio buttons with id/name radio"
          - cell "One Two Three":
            - radio
            - text: ""
            - radio
            - text: ""
            - radio [checked]
            - text: ""
        - row "Password input with id/name password":
          - cell "Password input with id/name password"
          - cell:
            - textbox
        - row "File selector with id/name file Choose File":
          - cell "File selector with id/name file"
          - cell "Choose File":
            - button "Choose File"
        - row "Submit Clear":
          - cell
          - cell "Submit Clear":
            - link "Submit":
              - /url: "#"
            - link "Clear":
              - /url: "#"
        - row "* Mandatory field.":
          - cell "* Mandatory field."
    `);


    await page.locator('#textInput').pressSequentially('Steve Powell', { delay: 200 }); //Simulate real kepresses with slow typing
    await page.locator('#textInput').press('Control+A'); //"Real user" Select all keyboard shortcut
    await page.locator('#textInput').press('Backspace'); //"Real user" Delete selected text
    await page.locator('#textInput').fill('Steve Powell'); //Fill will instantly replace any and all text in the target. "Magic" - but may cause problems for some AUT JS
    await page.locator('#textArea').click({ position: { x: 0, y: 0 } }); //Click top left of element instead of centre
    await page.locator('#textArea').clear(); //You can clear textareas/inputs, but fill() does a clear before text entry anyway.
    await page.locator('#textArea').fill('was\nhere\n'); //Newline = \n
    await page.locator('#checkbox').check(); //Force on
    await page.locator('#checkbox').uncheck(); //force off
    await page.locator('#checkbox').click(); //Toggle on/off state
    await page.locator('#select').selectOption('Selection Two'); //Choose by text
    await page.locator('#select').selectOption({ index: 0 }); //or by index (0th option, 1st, 2nd...)
    await page.locator('#three').check();
    await page.getByRole('link', { name: 'Clear' }).click({ trial: true }); //FAKE. PW checks if it /could/ click, but doesn't actually click.

    await page.locator('#textInput').fill('Hello World');
    //await expect(page.locator('#textInput')).toHaveText('Hello World'); //Text inputs do not have inner text
    await expect(page.locator('#textInput')).toHaveValue('Hello World'); //use values instead

    await expect(page.locator('#textInput')).toHaveScreenshot('textbox.png', { //On first run a "golden sample" is captured and written to disc. Following runs cheack against that sample.
      threshold: 0.9, //Allowable colour variance 0-1
      // maxDiffPixelRatio: 0.3, //Allowable different pixels 0-1
      //maxDiffPixels: 100 //Exact number of pixel allowed to differ
    }) //Will still fail regardless if the image sizes don't match


    await page.getByRole('link', { name: 'Submit' }).click();
    await expect(page.locator('#textInputValue')).toContainText('Steve Powell');
  })

  test('Drag drop', async ({ page }) => {
    await page.goto('/webdriver2/docs/cssXPath.html');
    //Dragging and dropping one element to another is simple:
    //await page.locator('div#one').dragTo(page.locator('div#two'))

    //Dragging and dropping one element is a little trickier:
    await page.dragAndDrop('#slider a', //Source
      '#slider a', //Target (same)
      {
        targetPosition: { x: 100, y: 0 }, //How far to drag
        force: true, //Dont do actionability checks (don't worry that we are dragging the source "outside" of itself)
        steps: 20
      } //Smooth the movement over 20 steps
    )
  });


  test('Simple file chooser', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');
    const fileChooserPromise = page.waitForEvent('filechooser'); //Set up event wait - NO AWAIT
    await page.getByRole('button', { name: 'Choose File' }).click(); //Do action that triggers file chooser
    const fileChooser = await fileChooserPromise; //Wait for the file chooser to appear
    await fileChooser.setFiles('./tests/example.spec.ts');
  });

});


test('Drag drop files', async ({ page }) => {
  //test.abort('This test is currently failing due to a bug in Playwright. See');

  await page.goto('https://codyhouse.co/ds/components/app/drag-drop-file');
  await page.locator('iframe').contentFrame().locator('label').drop({
    files: { name: 'note.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') }, //tsconfig.json file added to root to fix VS Code being unable to find Buffer type info
    //files: './tests/example.spec.ts' //Can use real file or create a file on the fly with a buffer
  });
  //test.skip(true, 'This test is currently failing due to a bug in Playwright. See https://github.com/microsoft/playwright/issues/12345');
});

test('Capturing Text', async ({ page }) => {

  await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html");
  await page.locator('#textInput').fill("Hello World");

  let textPromise = page.locator('#right-column').textContent();
  console.log("Without 'await'ing textContent() you get a 'promise' of the future text, not the actual text");
  console.log(textPromise);

  let rightColText = await page.locator('#right-column').textContent(); //Includes whitespace in HTML file

  console.log("The right column text is with textContent is: " + rightColText);

  rightColText = await page.locator('#right-column').innerText(); //Captures text after browser layout has happened (eliminating most whitespace)

  console.log("The right column text is with innertext is: " + rightColText);

  let textBoxText: string = await page.locator('#textInput').textContent() ?? ""; //TS: if textContent() returns null, retuen empty string "" instead
  console.log("The text box contains" + textBoxText); //blank as <input> has no inner text

  //Using generic $eval to get the browser to return the INPUT text
  //This will *not* retry or wait
  textBoxText = await page.$eval('#textInput', (el: HTMLInputElement) => el.value); //el is an in browser HTML element - not a Playwright object at all.

  console.log("The text box actually contains: " + textBoxText);

  await page.$eval('#textInput', elm => {
    console.log(typeof (elm)); //Writes to browser's console! Not NodeJS console.
  });

  await page.locator('#textInput').evaluate(elm => { //using locator().evaluate() the locator will be retried if no element found
    console.log(elm); //Also outputs to browser console.
  });

  expect(textBoxText).toBe("Hello World");
  await expect(page).toHaveTitle("Forms", { timeout: 5000 }) //Override global config with a custom expect timeout
});

test('Generic methods', { tag: ['@Smoke', '@Regression'] }, async ({ page }) => {
  //A comment
  await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html")

  const menuLinks = await page.$$eval('#menu a', (links) => links.map((link) => link.textContent))
  console.log(`There are ${menuLinks.length} links`)

  console.log("The link texts are:")

  for (const iterator of menuLinks) {
    console.log(iterator!.trim())
  }
  //$eval and $$eval DONT retry. If the locator doesnt find a matching element(s) then you get null.

  //Preferred - using retry-able Playwright locators
  //expect(await page.locator('#menu a').all()).toHaveLength(5) //Collection should have 5 members - do not cotinue until that is true
  const preferredLinks = await page.locator('#menu a').all();
  for (const elm of preferredLinks) {
    // const elmtext = await elm.textContent();
    // const elmtexttrimmed = elmtext?.trim(); //Combine these two steps below
    console.log(`${await elm.textContent().then(text => { return text?.trim() })}`)
  }
});

test('Waits', async ({ page }) => {
  page.setDefaultTimeout(5000); //Override/set action timeout for this test only. No await.
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html');
  await page.locator('#delay').click();
  await page.locator('#delay').fill('10');
  await page.getByRole('link', { name: 'Load Content' }).click();
  await page.waitForSelector('#spinner-holder > img:nth-child(1)', { timeout: 12000, state: 'hidden' }); //Wait for loading spinner to go away
  await page.locator('img[src$="apple.jpg"]').click(); //Then click apple
  //await page.locator('img[src$="apple.jpg"]').click({timeout: 12000}); //or just wait for the apple to be there
  await page.getByRole('link', { name: 'Home' }).click();
});

test("Waiting for a pop up window", async ({ page, context }) => {

  await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html");

  //[a,b] = [10,20] - aray destructuring syntax will assign a=10 b=20
  //Below we discard the second promise return value - we only need the first which gets us a handle to the new page
  const [newSpawnedPage] = await Promise.all([ //When these two "future" actions complete return the new page fixture
    context.waitForEvent('page'), //Returns the new page instance when done
    page.locator("#right-column > a[onclick='return popUpWindow();']").click(), //promise returns void (nothing)
  ]);

  //await page.pause();
  await page.waitForTimeout(2000); //Pause for 2s - try to avoid this as other wait types can exit early if condition is met


  const closeBtn = newSpawnedPage.getByRole('link', { name: 'Close Window' });
  await closeBtn.click();

  await page.getByRole('link', { name: 'Load Content' }).click();

});