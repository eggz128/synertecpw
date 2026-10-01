# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-2.spec.ts >> Aria snapshot match from file
- Location: tests\test-2.spec.ts:21:5

# Error details

```
Error: expect(locator).toMatchAriaSnapshot(expected) failed

Locator: locator('#right-column')
Timeout: 10000ms
- Expected  - 4
+ Received  + 4

@@ -5,11 +5,11 @@
      - row "Text Input with id/name textInput *":
        - cell "Text Input with id/name textInput *"
        - cell:
          - textbox
      - row "Text Area with id/name textArea":
-       - cell "Text Area with id/nameXXX textArea"
+       - cell "Text Area with id/name textArea"
        - cell:
          - textbox
      - row "Checkbox with id/name checkbox":
        - cell "Checkbox with id/name checkbox"
        - cell:
@@ -23,15 +23,15 @@
            - option "Selection Three"
      - row "Radio buttons with id/name radio One Two Three":
        - cell "Radio buttons with id/name radio"
        - cell "One Two Three":
          - radio [checked]
-         - text: ""
+         - text: One
          - radio
-         - text: ""
+         - text: Two
          - radio
-         - text: ""
+         - text: Three
      - row "Password input with id/name password":
        - cell "Password input with id/name password"
        - cell:
          - textbox
      - row "File selector with id/name file Choose File":

Call log:
  - Expect "toMatchAriaSnapshot" locator('#right-column') with timeout 10000ms
  - waiting for locator('#right-column')
    23 × locator resolved to <div id="right-column">…</div>
       - unexpected value "- heading "Forms" [level=1]
- paragraph: This form has an id of theForm.
- table:
  - rowgroup:
    - row "Text Input with id/name textInput *":
      - cell "Text Input with id/name textInput *"
      - cell:
        - textbox
    - row "Text Area with id/name textArea":
      - cell "Text Area with id/name textArea"
      - cell:
        - textbox
    - row "Checkbox with id/name checkbox":
      - cell "Checkbox with id/name checkbox"
      - cell:
        - checkbox
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
        - radio [checked]
        - text: One
        - radio
        - text: Two
        - radio
        - text: Three
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
      - cell "* Mandatory field.""

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: index.html
      - listitem [ref=e10]:
        - link "Basic HTML" [ref=e11] [cursor=pointer]:
          - /url: basicHtml.html
      - listitem [ref=e12]:
        - link "Forms" [ref=e13] [cursor=pointer]:
          - /url: forms.html
      - listitem [ref=e14]:
        - link "Dynamic Content" [ref=e15] [cursor=pointer]:
          - /url: dynamicContent.html
      - listitem [ref=e16]:
        - link "CSS/XPath" [ref=e17] [cursor=pointer]:
          - /url: cssXPath.html
    - generic [ref=e18]:
      - heading "Forms" [level=1] [ref=e19]
      - paragraph [ref=e20]: This form has an id of theForm.
      - table [ref=e22]:
        - rowgroup [ref=e23]:
          - row [ref=e24]:
            - cell "Text Input with id/name textInput *" [ref=e25]
            - cell [ref=e26]:
              - textbox [ref=e27]
          - row [ref=e28]:
            - cell "Text Area with id/name textArea" [ref=e29]
            - cell [ref=e30]:
              - textbox [ref=e31]
          - row [ref=e32]:
            - cell "Checkbox with id/name checkbox" [ref=e33]
            - cell [ref=e34]:
              - checkbox [ref=e35]
          - row [ref=e36]:
            - cell "Select with id/name select" [ref=e37]
            - cell "Selection One" [ref=e38]:
              - combobox [ref=e39]:
                - option "Selection One" [selected]
                - option "Selection Two"
                - option "Selection Three"
          - row [ref=e40]:
            - cell "Radio buttons with id/name radio" [ref=e41]
            - cell "One Two Three" [ref=e42]:
              - radio [checked] [ref=e43]
              - text: One
              - radio [ref=e44]
              - text: Two
              - radio [ref=e45]
              - text: Three
          - row [ref=e46]:
            - cell "Password input with id/name password" [ref=e47]
            - cell [ref=e48]:
              - textbox [ref=e49]
          - row [ref=e50]:
            - cell "File selector with id/name file" [ref=e51]
            - cell [ref=e52]:
              - button "Choose File" [ref=e53]
          - row [ref=e54]:
            - cell [ref=e55]
            - cell [ref=e56]:
              - link "Submit" [ref=e57] [cursor=pointer]:
                - /url: "#"
              - link "Clear" [ref=e58] [cursor=pointer]:
                - /url: "#"
          - row [ref=e59]:
            - cell "* Mandatory field." [ref=e60]
  - generic [ref=e61]: ©2012 Edgewords Limited
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('ecommerce @smoke', async ({ page }) => {
  4   |   await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  5   |   await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
  6   |   await test.step('Search for a cap', async () => {
  7   |     await page.locator('#woocommerce-product-search-field-0').click();
  8   |     await page.locator('#doesnotexist').click();
  9   |     await page.locator('#woocommerce-product-search-field-0').fill('cap');
  10  |   },{box: true}) //If there is an error in the combined step group, don't include the erronious test code at the top of the test report
  11  | 
  12  |   await page.pause();
  13  | 
  14  |   await page.locator('#woocommerce-product-search-field-0').press('Enter');
  15  |   await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  16  |   await page.locator('#content').getByRole('link', { name: 'View ca' }).click();
  17  |   await page.getByRole('button', { name: 'Remove Cap from cart' }).click();
  18  |   await page.getByRole('link', { name: 'Return to shop' }).click();
  19  | });
  20  | 
  21  | test('Aria snapshot match from file', async({page})=>{
  22  |   await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');
  23  |   //Just like with screenshots, if the 'golden' snapshot doesn't currently exist, it will be generated on first run
  24  |   await expect(page.locator('#right-column')).toHaveScreenshot('formsscreenshot.png');
> 25  |   await expect(page.locator('#right-column')).toMatchAriaSnapshot({name: 'formssnapshot.yml'})
      |                                               ^ Error: expect(locator).toMatchAriaSnapshot(expected) failed
  26  | });
  27  | 
  28  | test('Screenshots', {annotation: [{type: "custom anotation", description: "This is an annotation"}] },async({page, browserName}, testInfo)=>{
  29  |     await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/basicHtml.html');
  30  |     const screenshot = await page.screenshot(); //Capture screenshot bitmap in variable. Note there is not an easy way to assert on this currently. See workaround test.
  31  |     await page.screenshot({ path: './manualscreenshots/screenshot-viewport.png' });
  32  |     await page.screenshot({ path: './manualscreenshots/screenshot-fullpage.png', fullPage: true });
  33  | 
  34  | 
  35  |     await page.locator('#doesnotexist').click();
  36  |     
  37  |     const htmlTable = page.locator('#htmlTable');
  38  |     await htmlTable.screenshot({ path: './manualscreenshots/screenshot-table.png' }); //Just the table, not the whole page
  39  | 
  40  |     await page.locator('#htmlTable').screenshot({
  41  |       path: './manualscreenshots/highlight-htmltable.png',
  42  |       mask: [page.locator('#TableVal2')], //Redact or highlight this element
  43  |       maskColor: 'rgba(214, 21, 179,0.5)', //default mask colour is magenta #ff00ff
  44  |       style: ` #htmlTable tr:nth-child(3) {border: 10px solid red}
  45  |             table#htmlTable {border-collapse: collapse}
  46  |     ` //HTML table rows cannot have a border unless the table's border collapse model is set to collapse
  47  |     })
  48  | 
  49  |     if (browserName === "chromium") { //PDF generation only works on Chromium browsers, and can be headless/headed (error is misleading)
  50  |       await page.pdf({ path: './manualscreenshots/printed.pdf' })
  51  |     }
  52  | 
  53  |     console.log("Appears in std out section of the report") //In report at bottom, displayed in terminal at run time
  54  |     //Attaching arbitary data to the report.
  55  |     await testInfo.attach('Write some arbitary text to the report', { body: 'Hello World', contentType: 'text/plain' });
  56  |     await testInfo.attach('Masked Screenshot', { path: './manualscreenshots/highlight-htmltable.png', contentType: 'image/png' });
  57  |     await testInfo.attach('Screenshot from variable', { body: screenshot, contentType: 'image/png' });
  58  |     testInfo.annotations.push({type: 'Runtime annotation',description:'Added during the test run'});
  59  | })
  60  | 
  61  | test("compare runtime images",  async ({ page, browserName }, testInfo) => {
  62  |     await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html");
  63  | 
  64  |     await page.locator('#textInput').fill("Hello World"); //Set intial state
  65  | 
  66  |     //ToDo: capture screenshot of text box in memory
  67  |     //Capture in mem is easy - doing the expect on it after, not so much as PlayWright expect .toMatchSnapshot() expects the screenshot to be on disk
  68  |     //See https://github.com/microsoft/playwright/issues/18937
  69  | 
  70  |     //const originalimage = await page.locator('#textInput').screenshot();
  71  |     //originalimage is now a buffer object with the screenshot. You could use a 3rd party js lib to do the comparison... but if we're sticking to Playwright only...
  72  | 
  73  |     //await expect(page.locator('#textInput')).toHaveScreenshot('textbox')
  74  |     //No good as PW wants to capture the screenshot on the first run and use that screenshot for following runs. We want to capture and use on this run. So...
  75  | 
  76  |     await page.locator('#textInput').screenshot({ path: `${testInfo.snapshotDir}/textbox2-${browserName}-${testInfo.snapshotSuffix}.png` })
  77  |     //screenshots will need to vary by browser and OS, and be saved in to the test snapshot directory for .toMatchSnapshot() to find them
  78  | 
  79  | 
  80  |     //Change element text
  81  |     await page.locator('#textInput').fill("Hello world"); //Alter the state (right now this is the same as initially set so following expect *should* pass)
  82  |     //change to e.g. "Hello world"
  83  | 
  84  |     //Recapture screenshot, compare to previous (on disk) version.
  85  |     expect(await page.locator('#textInput').screenshot()).toMatchSnapshot('textbox2.png')
  86  | 
  87  |     //Now go look at the html report
  88  | });
  89  | 
  90  | test('Manual videos', async ({ page }) => {
  91  |     test.slow();
  92  |     page.setDefaultTimeout(0);
  93  |     await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  94  |     //Manually start a video recording (instead of having it turned on for all tests in playwright.config.ts )
  95  |     await page.screencast.start({ path: './manualvideos/video.webm'}); //Options object also has properties for setting video size and quality
  96  | 
  97  |     let overlay = await page.screencast.showOverlay( //Inject some HTML (and style) for display during the recording
  98  |         `<div style="
  99  |             position: fixed;
  100 |             top: 50%;
  101 |             left: 50%;
  102 |             transform: translate(-50%, -50%);
  103 |             background: red;
  104 |             color: white;
  105 |             padding: 12px 24px;
  106 |             border-radius: 8px;
  107 |             font-weight: 600;
  108 |             font-size: 16px;
  109 |             animation: fadeInOut 1.5s infinite;
  110 |         ">
  111 |         Recording
  112 |         </div>
  113 |         <style>
  114 |             @keyframes fadeInOut {
  115 |                 0%, 100% { opacity: 1; }
  116 |                 50% { opacity: 0.3; }
  117 |             }
  118 |         </style>`
  119 |     ); //This (along with action annotations, chapters etc) is injected in to the page using a custom pw HTML element and shadow-dom. It shouldn't interfere with the AUT.
  120 |     
  121 |     //All PW actions performed are captioned on-screen
  122 |     await page.screencast.showActions({ position: 'top-left' }); //You can also do this when starting the recording with the 'annotate' property on the options object
  123 |     
  124 |     await page.screencast.showChapter('Adding a cap to the cart', { //Create "chapters" to inform the viewer what they are about to see.
  125 |         description: 'Adding a cap via search',
```