import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Wait for element to be visible
  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  // Click on element with waits
  async click(selector: string) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    await this.page.click(selector);
  }

  // Fill input with waits
  async fill(selector: string, text: string) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    await this.page.fill(selector, text);
  }

  // Get text from element
  async getText(selector: string): Promise<string> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    return await this.page.textContent(selector) || '';
  }

  // Assert element is visible
  async assertElementVisible(selector: string) {
    const element = this.page.locator(selector);
    await expect(element).toBeVisible();
  }

  // Select option from dropdown
  async selectOption(selector: string, optionText: string) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    // Click to open dropdown
    await this.page.click(selector);
    // Wait and click the option
    await this.page.waitForTimeout(500); // Small wait for dropdown animation
    const optionLocator = this.page.locator(`text=${optionText}`).first();
    await expect(optionLocator).toBeVisible();
    await optionLocator.click();
  }
}
