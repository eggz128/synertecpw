# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-2.spec.ts >> Aria snapshot match from file
- Location: tests\test-2.spec.ts:22:5

# Error details

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('#right-column')
  Expected an image 760px by 618px, received 761px by 618px. 7476 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: formsscreenshot.png

Call log:
  - Expect "toHaveScreenshot(formsscreenshot.png)" locator('#right-column') with timeout 10000ms
    - verifying given screenshot expectation
  - waiting for locator('#right-column')
    - locator resolved to <div id="right-column">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - Expected an image 760px by 618px, received 761px by 618px. 7476 pixels (ratio 0.02 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('#right-column')
    - locator resolved to <div id="right-column">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - Expected an image 760px by 618px, received 761px by 618px. 7476 pixels (ratio 0.02 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=f14e1]:
  - generic [ref=f14e4]:
    - list [ref=f14e7]:
      - listitem [ref=f14e8]:
        - link "Home" [ref=f14e9] [cursor=pointer]:
          - /url: index.html
      - listitem [ref=f14e10]:
        - link "Basic HTML" [ref=f14e11] [cursor=pointer]:
          - /url: basicHtml.html
      - listitem [ref=f14e12]:
        - link "Forms" [ref=f14e13] [cursor=pointer]:
          - /url: forms.html
      - listitem [ref=f14e14]:
        - link "Dynamic Content" [ref=f14e15] [cursor=pointer]:
          - /url: dynamicContent.html
      - listitem [ref=f14e16]:
        - link "CSS/XPath" [ref=f14e17] [cursor=pointer]:
          - /url: cssXPath.html
    - generic [ref=f14e18]:
      - heading "Forms" [level=1] [ref=f14e19]
      - paragraph [ref=f14e20]: This form has an id of theForm.
      - table [ref=f14e22]:
        - rowgroup [ref=f14e23]:
          - row [ref=f14e24]:
            - cell "Text Input with id/name textInput *" [ref=f14e25]
            - cell [ref=f14e26]:
              - textbox [ref=f14e27]
          - row [ref=f14e28]:
            - cell "Text Area with id/name textArea" [ref=f14e29]
            - cell [ref=f14e30]:
              - textbox [ref=f14e31]
          - row [ref=f14e32]:
            - cell "Checkbox with id/name checkbox" [ref=f14e33]
            - cell [ref=f14e34]:
              - checkbox [ref=f14e35]
          - row [ref=f14e36]:
            - cell "Select with id/name select" [ref=f14e37]
            - cell "Selection One" [ref=f14e38]:
              - combobox [ref=f14e39]:
                - option "Selection One" [selected]
                - option "Selection Two"
                - option "Selection Three"
          - row [ref=f14e40]:
            - cell "Radio buttons with id/name radio" [ref=f14e41]
            - cell "One Two Three" [ref=f14e42]:
              - radio [checked] [ref=f14e43]
              - text: One
              - radio [ref=f14e44]
              - text: Two
              - radio [ref=f14e45]
              - text: Three
          - row [ref=f14e46]:
            - cell "Password input with id/name password" [ref=f14e47]
            - cell [ref=f14e48]:
              - textbox [ref=f14e49]
          - row [ref=f14e50]:
            - cell "File selector with id/name file" [ref=f14e51]
            - cell [ref=f14e52]:
              - button "Choose File" [ref=f14e53]
          - row [ref=f14e54]:
            - cell [ref=f14e55]
            - cell [ref=f14e56]:
              - link "Submit" [ref=f14e57] [cursor=pointer]:
                - /url: "#"
              - link "Clear" [ref=f14e58] [cursor=pointer]:
                - /url: "#"
          - row [ref=f14e59]:
            - cell "* Mandatory field." [ref=f14e60]
  - generic [ref=f14e61]: ©2012 Edgewords Limited
```

# Test source

```ts
  1   | import {  expect } from '@playwright/test';
  2   | import { test } from './globalbeforeafter'
  3   | 
  4   | test('ecommerce @smoke', async ({ page }) => {
  5   |   await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  6   |   await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
  7   |   await test.step('Search for a cap', async () => {
  8   |     await page.locator('#woocommerce-product-search-field-0').click();
  9   |     await page.locator('#doesnotexist').click();
  10  |     await page.locator('#woocommerce-product-search-field-0').fill('cap');
  11  |   },{box: true}) //If there is an error in the combined step group, don't include the erronious test code at the top of the test report
  12  | 
  13  |   await page.pause();
  14  | 
  15  |   await page.locator('#woocommerce-product-search-field-0').press('Enter');
  16  |   await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  17  |   await page.locator('#content').getByRole('link', { name: 'View ca' }).click();
  18  |   await page.getByRole('button', { name: 'Remove Cap from cart' }).click();
  19  |   await page.getByRole('link', { name: 'Return to shop' }).click();
  20  | });
  21  | 
  22  | test('Aria snapshot match from file', async({page})=>{
  23  |   await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');
  24  |   //Just like with screenshots, if the 'golden' snapshot doesn't currently exist, it will be generated on first run
> 25  |   await expect(page.locator('#right-column')).toHaveScreenshot('formsscreenshot.png');
      |                                               ^ Error: expect(locator).toHaveScreenshot(expected) failed
  26  |   await expect(page.locator('#right-column')).toMatchAriaSnapshot({name: 'formssnapshot.yml'})
  27  | });
  28  | 
  29  | test('Screenshots', {annotation: [{type: "custom anotation", description: "This is an annotation"}] },async({page, browserName}, testInfo)=>{
  30  |     await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/basicHtml.html');
  31  |     const screenshot = await page.screenshot(); //Capture screenshot bitmap in variable. Note there is not an easy way to assert on this currently. See workaround test.
  32  |     await page.screenshot({ path: './manualscreenshots/screenshot-viewport.png' });
  33  |     await page.screenshot({ path: './manualscreenshots/screenshot-fullpage.png', fullPage: true });
  34  | 
  35  | 
  36  |     await page.locator('#doesnotexist').click();
  37  | 
  38  |     const htmlTable = page.locator('#htmlTable');
  39  |     await htmlTable.screenshot({ path: './manualscreenshots/screenshot-table.png' }); //Just the table, not the whole page
  40  | 
  41  |     await page.locator('#htmlTable').screenshot({
  42  |       path: './manualscreenshots/highlight-htmltable.png',
  43  |       mask: [page.locator('#TableVal2')], //Redact or highlight this element
  44  |       maskColor: 'rgba(214, 21, 179,0.5)', //default mask colour is magenta #ff00ff
  45  |       style: ` #htmlTable tr:nth-child(3) {border: 10px solid red}
  46  |             table#htmlTable {border-collapse: collapse}
  47  |     ` //HTML table rows cannot have a border unless the table's border collapse model is set to collapse
  48  |     })
  49  | 
  50  |     if (browserName === "chromium") { //PDF generation only works on Chromium browsers, and can be headless/headed (error is misleading)
  51  |       await page.pdf({ path: './manualscreenshots/printed.pdf' })
  52  |     }
  53  | 
  54  |     console.log("Appears in std out section of the report") //In report at bottom, displayed in terminal at run time
  55  |     //Attaching arbitary data to the report.
  56  |     await testInfo.attach('Write some arbitary text to the report', { body: 'Hello World', contentType: 'text/plain' });
  57  |     await testInfo.attach('Masked Screenshot', { path: './manualscreenshots/highlight-htmltable.png', contentType: 'image/png' });
  58  |     await testInfo.attach('Screenshot from variable', { body: screenshot, contentType: 'image/png' });
  59  |     testInfo.annotations.push({type: 'Runtime annotation',description:'Added during the test run'});
  60  | })
  61  | 
  62  | test("compare runtime images",  async ({ page, browserName }, testInfo) => {
  63  |     await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html");
  64  | 
  65  |     await page.locator('#textInput').fill("Hello World"); //Set intial state
  66  | 
  67  |     //ToDo: capture screenshot of text box in memory
  68  |     //Capture in mem is easy - doing the expect on it after, not so much as PlayWright expect .toMatchSnapshot() expects the screenshot to be on disk
  69  |     //See https://github.com/microsoft/playwright/issues/18937
  70  | 
  71  |     //const originalimage = await page.locator('#textInput').screenshot();
  72  |     //originalimage is now a buffer object with the screenshot. You could use a 3rd party js lib to do the comparison... but if we're sticking to Playwright only...
  73  | 
  74  |     //await expect(page.locator('#textInput')).toHaveScreenshot('textbox')
  75  |     //No good as PW wants to capture the screenshot on the first run and use that screenshot for following runs. We want to capture and use on this run. So...
  76  | 
  77  |     await page.locator('#textInput').screenshot({ path: `${testInfo.snapshotDir}/textbox2-${browserName}-${testInfo.snapshotSuffix}.png` })
  78  |     //screenshots will need to vary by browser and OS, and be saved in to the test snapshot directory for .toMatchSnapshot() to find them
  79  | 
  80  | 
  81  |     //Change element text
  82  |     await page.locator('#textInput').fill("Hello world"); //Alter the state (right now this is the same as initially set so following expect *should* pass)
  83  |     //change to e.g. "Hello world"
  84  | 
  85  |     //Recapture screenshot, compare to previous (on disk) version.
  86  |     expect(await page.locator('#textInput').screenshot()).toMatchSnapshot('textbox2.png')
  87  | 
  88  |     //Now go look at the html report
  89  | });
  90  | 
  91  | test('Manual videos', async ({ page }) => {
  92  |     test.slow();
  93  |     page.setDefaultTimeout(0);
  94  |     await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  95  |     //Manually start a video recording (instead of having it turned on for all tests in playwright.config.ts )
  96  |     await page.screencast.start({ path: './manualvideos/video.webm'}); //Options object also has properties for setting video size and quality
  97  | 
  98  |     let overlay = await page.screencast.showOverlay( //Inject some HTML (and style) for display during the recording
  99  |         `<div style="
  100 |             position: fixed;
  101 |             top: 50%;
  102 |             left: 50%;
  103 |             transform: translate(-50%, -50%);
  104 |             background: red;
  105 |             color: white;
  106 |             padding: 12px 24px;
  107 |             border-radius: 8px;
  108 |             font-weight: 600;
  109 |             font-size: 16px;
  110 |             animation: fadeInOut 1.5s infinite;
  111 |         ">
  112 |         Recording
  113 |         </div>
  114 |         <style>
  115 |             @keyframes fadeInOut {
  116 |                 0%, 100% { opacity: 1; }
  117 |                 50% { opacity: 0.3; }
  118 |             }
  119 |         </style>`
  120 |     ); //This (along with action annotations, chapters etc) is injected in to the page using a custom pw HTML element and shadow-dom. It shouldn't interfere with the AUT.
  121 |     
  122 |     //All PW actions performed are captioned on-screen
  123 |     await page.screencast.showActions({ position: 'top-left' }); //You can also do this when starting the recording with the 'annotate' property on the options object
  124 |     
  125 |     await page.screencast.showChapter('Adding a cap to the cart', { //Create "chapters" to inform the viewer what they are about to see.
```