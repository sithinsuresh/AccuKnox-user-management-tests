# AccuKnox-user-management-tests

OrangeHRM User Management Module E2E automation tests using Playwright with Page Object Model pattern.

## Project Overview

This project contains comprehensive automated tests for the OrangeHRM User Management module, covering:
- User creation with various fields
- User search functionality
- User editing (status, role, password)
- User deletion
- Validation of user details

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## Project Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/sithinsuresh/AccuKnox-user-management-tests.git
cd AccuKnox-user-management-tests
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- **@playwright/test**: v1.40.0 - Playwright testing framework
- **typescript**: v5.3.2 - TypeScript compiler
- **ts-node**: Development dependency for running TypeScript files

### 3. Configure Test Environment

Create a `.env` file in the project root:

```
BASE_URL=https://opensource-demo.orangehrmlive.com
USERNAME=Admin
PASSWORD=admin123
HEADLESS=true
```

## Project Structure

```
AccuKnox-user-management-tests/
├── tests/
│   ├── pages/
│   │   ├── BasePage.ts              # Base page object with common methods
│   │   ├── LoginPage.ts             # Login page object
│   │   ├── AdminPage.ts             # Admin/User Management page object
│   │   └── UserFormPage.ts          # User form (Add/Edit) page object
│   └── specs/
│       └── userManagement.spec.ts   # Test specifications
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## How to Run the Test Cases

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (View Browser)

```bash
npm run test:headed
```

### Run Specific Test File

```bash
npx playwright test tests/specs/userManagement.spec.ts
```

### Run Specific Test Case

```bash
npx playwright test -g "test case name"
```

### Run Tests with Debug Mode

```bash
npm run test:debug
```

### Generate and View Test Report

```bash
npx playwright show-report
```

## Test Cases Covered

### TC-001: Navigate to Admin Module
- Navigate to Admin Module and verify User Management page loads

### TC-002: Add a New User with Mandatory Fields
- Create a new user with all required fields
- Username: testuser_001
- Password: TestPass123!
- User Role: Admin
- Status: Enabled

### TC-003: Search for Newly Created User
- Search for the newly created user
- Verify user appears in search results with correct details

### TC-004: Edit User Status
- Edit user status from Enabled to Disabled
- Verify changes are saved

### TC-005: Verify Updated User Status
- Verify that status changes are reflected in the system

### TC-006: Edit User Password
- Change password using "Change Password" checkbox
- Password: NewPass456!

### TC-007: Edit User Role
- Modify user role from Admin to another role

### TC-008: Add User without Employee Name
- Create user without Employee Name field (optional field)
- Username: testuser_002

### TC-009: Delete a User
- Delete a user from the system
- Verify user no longer appears in search results

## Page Object Model Structure

### BasePage
- Contains common methods used across pages
- Methods for waits, clicks, fills, and assertions

### LoginPage
- Handles login functionality
- Methods: login(username, password)

### AdminPage
- Manages User Management page navigation
- Methods: navigateToAdmin(), clickAddButton(), searchUser()

### UserFormPage
- Manages user creation and editing forms
- Methods: fillUserDetails(), selectRole(), setStatus(), changePassword()

## Playwright Version Used

- **Playwright**: v1.40.0 (or latest stable version)

## Test Execution Flow

1. **Setup**: Before each test, the browser launches and navigates to login page
2. **Login**: User logs in with Admin credentials
3. **Test Execution**: Specific test case is executed
4. **Teardown**: Browser closes after test completion

## Features

- ✅ Page Object Model pattern for maintainability
- ✅ Explicit waits for element stability
- ✅ Meaningful selectors (data-* attributes and visible text)
- ✅ Comprehensive error handling
- ✅ Detailed test reporting
- ✅ Parallel test execution support
- ✅ Screenshot on test failure

## CI/CD Integration

To integrate with CI/CD pipelines:

```bash
# GitHub Actions example
- name: Run Playwright Tests
  run: npx playwright install && npm test
```

## Troubleshooting

### Common Issues

1. **Playwright browser not found**
   ```bash
   npx playwright install
   ```

2. **Tests timing out**
   - Increase timeout in playwright.config.ts
   - Check network connectivity to test environment

3. **Selectors not found**
   - Run in debug mode to inspect elements
   - Update selectors in page objects if UI changes

## Manual Test Cases Documentation

See `OrangeHRM User Management Test Cases - Google Sheets` for detailed manual test case documentation with:
- Test Scenario
- Pre-conditions
- Test Steps
- Test Data
- Expected Results
- Actual Results
- Test Status

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure they pass
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Contact

For questions or issues related to this automation project, please create an issue in the repository.

---

**Last Updated**: January 2026
**Automation Framework**: Playwright with TypeScript
**Test Environment**: OrangeHRM Open Source Demo
