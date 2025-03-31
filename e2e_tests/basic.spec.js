import { test, expect } from '@playwright/test';



test.describe('Map', () => {

  test('Map should be visible', async ({page}) => {
    await page.goto(`http://localhost:3000`);
    const map = page.locator('div[class*="leaflet-container"]');



    await expect(map).toBeVisible()
  })

  test('Markers should work', async ({page}) => {
    await page.goto(`http://localhost:3000`);

    const marker1 = await page.getByRole('button', { name: 'Marker' }).nth(1);
    const marker2 = await page.getByRole('button', { name: 'Marker' }).nth(1);

    await expect(marker1).toBeVisible();
    await expect(marker2).toBeVisible();

  })


})

test.describe('City card buttons', () => {

  test('Tampere button should be visible and enabled', async ({page}) => {

    await page.goto('localhost:3000');

    const tampereButton = page.getByRole('button', { name: /tampere/i });
    await expect(tampereButton).toBeVisible();
    await expect(tampereButton).toBeEnabled();

    await tampereButton.click();
    await page.waitForURL('http://localhost:3000/tampere');

  })

  test('Oulu button should be visible and enabled', async ({page}) => {

    await page.goto('localhost:3000');

    const ouluButton = page.getByRole('button', { name: /oulu/i });
    await expect(ouluButton).toBeVisible();
    await expect(ouluButton).toBeEnabled();

    await ouluButton.click();
    await page.waitForURL('http://localhost:3000/oulu');
  })

  test('Stockholm button should not be on page', async ({page}) => {

    await page.goto('localhost:3000');

    const stockholmButton = page.getByRole('button', { name: /stockholm/i });
    await expect(stockholmButton).toBeHidden();


  })


})

test.describe('General view tests', () => {
  test('There should be 6 cards on a page', async ({page}) => {

    await page.goto('localhost:3000/oulu');
    const divs = page.getByTestId('data-card');
    await expect(divs).toHaveCount(5)
  })

  test('There should be 2 navigation buttons on a page', async ({page}) => {
    await page.goto('localhost:3000/oulu');
    const btns = page.locator('a[class*="flex items-center gap-2 text-[#D5D5D5]"]');

    await expect(btns).toHaveCount(2);
  })

})






