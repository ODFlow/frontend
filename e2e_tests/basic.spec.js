import { test, expect } from "@playwright/test";

const cities = ["oulu", "rovaniemi", "espoo"];
const hiddenCities = ["stockholm", "tallin"];


// Test map page
test.describe("[Map]", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000");
	});

	test("Map should be visible", async ({ page }) => {
		const map = page.locator('div[class*="leaflet-container"]');
		await expect(map).toBeVisible();
	});

	test("Markers should work", async ({ page }) => {
		const marker1 = await page.getByRole("button", { name: "Marker" }).nth(1);
		const marker2 = await page.getByRole("button", { name: "Marker" }).nth(1);
		await expect(marker1).toBeVisible();
		await expect(marker2).toBeVisible();
	});
});


// Test main page buttons
test.describe("[City card buttons]", () => {
	test("Tampere button should be visible and enabled", async ({ page }) => {
		await page.goto("http://localhost:3000");
		const tampereButton = page.getByRole("button", { name: /tampere/i });
		await expect(tampereButton).toBeVisible();
		await expect(tampereButton).toBeEnabled();
		await tampereButton.click();
		await page.waitForURL("http://localhost:3000/tampere");
	});

	test("Oulu button should be visible and enabled", async ({ page }) => {
		await page.goto("http://localhost:3000");
		const ouluButton = page.getByRole("button", { name: /oulu/i });
		await expect(ouluButton).toBeVisible();
		await expect(ouluButton).toBeEnabled();
		await ouluButton.click();
		await page.waitForURL("http://localhost:3000/oulu");
	});

	test("Stockholm button should not be on page", async ({ page }) => {
		await page.goto("http://localhost:3000");
		const stockholmButton = page.getByRole("button", { name: /stockholm/i });
		await expect(stockholmButton).toHaveCount(0);
	});
});


const checkGeneralPage = async (page, url, shouldBeVisible) => {
	await page.goto(url);
	const divs = page.getByTestId("data-card");
	const nav_buttons = page.getByTestId("navigation-button");

	const home_button = nav_buttons.first();

	if (shouldBeVisible) {
		await expect(divs).toHaveCount(5);
		await expect(nav_buttons).toHaveCount(2);

		await home_button.click();
		await page.waitForURL("http://localhost:3000/");
	} else {
		await expect(divs).toHaveCount(0);
		await expect(nav_buttons).toHaveCount(0);
	}
};


const checkChartsVisibility = async (
	page,
	url,
	shouldBeVisible,
	timeout = 60000,
) => {
	await page.goto(url);

	const unemploymentChart = page.getByTestId("unemployment-chart");
	const safetyRatingChart = page.getByTestId("safety-rating-chart");
	const trafficAccidentsChart = page.getByTestId("traffic-accidents-chart");
	const populationStats = page.getByTestId("population-stats");

	if (shouldBeVisible) {
		await expect(safetyRatingChart).toBeVisible({ timeout: timeout });
		await expect(trafficAccidentsChart).toBeVisible({ timeout: timeout });
		await expect(unemploymentChart).toBeVisible({ timeout: timeout });
		await expect(populationStats).toHaveCount(2, { timeout: timeout });
	} else {
		await expect(safetyRatingChart).toHaveCount(0);
		await expect(trafficAccidentsChart).toHaveCount(0);
		await expect(unemploymentChart).toHaveCount(0);
		await expect(populationStats).toHaveCount(0);
	}
};

// Test general view cards and buttons (basic)
test.describe("[General view basic]", () => {
	for (const city of cities) {
		test(`There should be 5 cards and 2 working nav buttons on ${city} general page`, async ({
			page,
		}) => {
			await checkGeneralPage(page, `http://localhost:3000/${city}`, true);
		});
	}

	for (const city of hiddenCities) {
		test(`There should be nothing on ${city} general page`, async ({
			page,
		}) => {
			await checkGeneralPage(page, `http://localhost:3000/${city}`, false);
		});
	}
});

// Test general view cards data
test.describe("[General view cards]", () => {
	for (const city of cities) {
		test(`Charts should be visible and show some data for ${city} city`, async ({
			page,
		}) => {
			await checkChartsVisibility(page, `http://localhost:3000/${city}`, true);
		});
	}

	for (const city of hiddenCities) {
		test(`Should not be visible for ${city} city`, async ({ page }) => {
			await checkChartsVisibility(page, `http://localhost:3000/${city}`, false);
		});
	}
});
