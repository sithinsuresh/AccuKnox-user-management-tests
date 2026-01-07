import { test, expect, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

let basePage: BasePage;
let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  basePage = new BasePage(page);
  await page.goto('/web/index.php/auth/login');
  await basePage.fill('[name="username"]', 'Admin');
  await basePage.fill('[name="password"]', 'admin123');
  await basePage.click('button[type="submit"]');
  await page.waitForURL('**/dashboard/index', { timeout: 10000 });
});

test.afterEach(async () => {
  await page.close();
});

test('TC-001: Navigate to Admin Module', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.assertElementVisible('h6:has-text("User Management")');
  await basePage.assertElementVisible('button:has-text("Add")');
});

test('TC-002: Add New User', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.click('button:has-text("Add")');
  await page.waitForURL('**/admin/saveSystemUser', { timeout: 5000 });
  await basePage.selectOption('[data-testid="userRole"]', 'Admin');
  await basePage.selectOption('[data-testid="status"]', 'Enabled');
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.fill('[data-testid="password"]', 'TestPass123!');
  await basePage.fill('[data-testid="confirmPassword"]', 'TestPass123!');
  await basePage.click('button:has-text("Save")');
  await page.waitForTimeout(2000);
  await page.waitForURL('**/admin/viewSystemUsers', { timeout: 5000 });
});

test('TC-003: Search User', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.click('button:has-text("Search")');
  await page.waitForTimeout(2000);
  const userRow = page.locator('text=testuser_001');
  await expect(userRow).toBeVisible();
});

test('TC-004: Edit User Status', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.click('button:has-text("Search")');
  await page.waitForTimeout(2000);
  await basePage.click('[data-testid="editButton"]');
  await page.waitForURL('**/admin/saveSystemUser/**', { timeout: 5000 });
  await basePage.selectOption('[data-testid="status"]', 'Disabled');
  await basePage.click('button:has-text("Save")');
  await page.waitForTimeout(2000);
});

test('TC-005: Verify Status Update', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.click('button:has-text("Search")');
  await page.waitForTimeout(2000);
  await basePage.click('[data-testid="editButton"]');
  await page.waitForURL('**/admin/saveSystemUser/**', { timeout: 5000 });
  const statusField = page.locator('[data-testid="status"]');
  await expect(statusField).toContainText('Disabled');
});

test('TC-006: Edit Password', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.click('button:has-text("Search")');
  await page.waitForTimeout(2000);
  await basePage.click('[data-testid="editButton"]');
  await page.waitForURL('**/admin/saveSystemUser/**', { timeout: 5000 });
  await basePage.click('[data-testid="changePassword"]');
  await basePage.fill('[data-testid="password"]', 'NewPass456!');
  await basePage.fill('[data-testid="confirmPassword"]', 'NewPass456!');
  await basePage.click('button:has-text("Save")');
  await page.waitForTimeout(2000);
});

test('TC-007: Edit User Role', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.click('button:has-text("Search")');
  await page.waitForTimeout(2000);
  await basePage.click('[data-testid="editButton"]');
  await page.waitForURL('**/admin/saveSystemUser/**', { timeout: 5000 });
  await basePage.selectOption('[data-testid="userRole"]', 'ESS');
  await basePage.click('button:has-text("Save")');
  await page.waitForTimeout(2000);
});

test('TC-008: Add User without Employee Name', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.click('button:has-text("Add")');
  await page.waitForURL('**/admin/saveSystemUser', { timeout: 5000 });
  await basePage.selectOption('[data-testid="userRole"]', 'Admin');
  await basePage.selectOption('[data-testid="status"]', 'Enabled');
  await basePage.fill('[data-testid="username"]', 'testuser_002');
  await basePage.fill('[data-testid="password"]', 'TestPass123!');
  await basePage.fill('[data-testid="confirmPassword"]', 'TestPass123!');
  await basePage.click('button:has-text("Save")');
  await page.waitForTimeout(2000);
  await page.waitForURL('**/admin/viewSystemUsers', { timeout: 5000 });
});

test('TC-009: Delete User', async () => {
  await basePage.click('a:has-text("Admin")');
  await page.waitForURL('**/admin/viewAdminModule', { timeout: 5000 });
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.click('button:has-text("Search")');
  await page.waitForTimeout(2000);
  await basePage.click('[data-testid="deleteButton"]');
  await page.waitForTimeout(1000);
  await basePage.click('button:has-text("Yes"), button:has-text("Delete")');
  await page.waitForTimeout(2000);
  await basePage.fill('[data-testid="username"]', 'testuser_001');
  await basePage.click('button:has-text("Search")');
  await page.waitForTimeout(2000);
  const noResults = page.locator('text=No records');
  await expect(noResults).toBeVisible();
});
