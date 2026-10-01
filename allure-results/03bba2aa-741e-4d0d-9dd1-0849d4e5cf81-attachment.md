# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: APITests.spec.ts >> Check GET response body
- Location: tests\APITests.spec.ts:27:5

# Error details

```
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
    "id": 1,
-   "name": "iPadX",
+   "name": "iPad",
    "price": 500,
  }
```

# Test source

```ts
  1  | import { request, test, expect } from '@playwright/test';
  2  | //Run against https://github.com/edgewords/EdgeAPIserver
  3  | // or https://github.com/eggz128/EdgeAPIserverNode
  4  | // npx github:eggz128/EdgeAPIserverNode
  5  | 
  6  | // test('Broser as rest client', async({page})=>{
  7  | //     await page.context().request.get()
  8  | // })
  9  | 
  10 | test('API web first', async ({request})=>{
  11 |   let response = await request.get('https://www.google.com');
  12 |   expect(response).toBeOK()
  13 | })
  14 | 
  15 | let baseRequestUrl = 'http://localhost:2002/api';
  16 | 
  17 | test('Simple Get', async ({ request }) => {
  18 |     const resp = await request.get('http://localhost:2002/api/products/1');
  19 |     try {
  20 |         expect(resp.status()).toBe(200);
  21 |     } catch (error) {
  22 |         console.log(`Simple GET failed with ${resp.statusText()}`);
  23 |         throw error;
  24 |     }
  25 | });
  26 | 
  27 | test('Check GET response body', async ({ request }) => {
  28 |     const resp = await request.get(baseRequestUrl + '/products/1')
  29 |     try {
  30 |         expect.soft(resp.status()).toEqual(200) //soft asserts to allow multiple checks
  31 |         expect.soft(await resp.json()).toHaveProperty('price')
> 32 |         expect.soft(await resp.json()).toMatchObject({
     |                                        ^ Error: expect(received).toMatchObject(expected)
  33 |             "id": 1,
  34 |             "name": "iPadX",
  35 |             "price": 500
  36 |         })
  37 | 
  38 |     } catch (error) {
  39 |         console.log("Simple GET request failed with status :" + resp.statusText())
  40 |         throw error
  41 |     }
  42 | })
  43 | 
  44 | test('URL query params', async ({ request }) => {
  45 |     const searchParams = new URLSearchParams();
  46 |     searchParams.set('id', '1');
  47 |     const response = await request.get(
  48 |         'http://localhost:2002/api/products',
  49 |         {
  50 |             params: searchParams, 
  51 |             //params: 'id=1' // or as a string
  52 |         } //Creates http://localhost:2002/api/products/?id=1
  53 |     );
  54 |     console.log((await response.body()).toString());
  55 | })
  56 | 
  57 | test('Basic auth', async ({ playwright }) => {
  58 |     const request = await playwright.request.newContext({ //new context required (different from norm without basic auth)
  59 |         baseURL: baseRequestUrl,
  60 |         httpCredentials: {
  61 |             username: 'edge',
  62 |             password: 'edgewords'
  63 |         }
  64 |     });
  65 |     const resp = await request.get(baseRequestUrl + '/users');
  66 |     expect(resp.status()).toEqual(200);
  67 |     console.log((await resp.body()).toString());
  68 | });
  69 | 
  70 | test('POST a new product', async ({ request }) => {
  71 |     const newProd = await request.post(baseRequestUrl + '/products', {
  72 |         data: {
  73 |             name: 'RazorMouse',
  74 |             price: 20,
  75 |         },
  76 |     });
  77 |     expect(newProd.status()).toEqual(201);
  78 | 
  79 |     const jsonData = await newProd.json();
  80 |     console.log('New product created with id: ' + jsonData.id);
  81 |     
  82 | })
  83 | 
```