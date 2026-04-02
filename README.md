# SAP UI5 Demo Apps Playwright

Playwright E2E and API contract suite for SAP UI5 demo applications hosted on `https://ui5.sap.com`.

## Scope

- UI smoke coverage for the core demo flow set
- Broader UI regression coverage for additional SAP-hosted demo apps
- API contract checks for `manifest.json`, `metadata.xml` and primary mock datasets
- GitHub Actions workflow split into API, UI smoke and scheduled/manual UI regression

## Stack

- `@playwright/test`
- TypeScript
- Chromium

## Project Layout

```text
.
|-- src/
|   |-- api/               # API contract definitions
|   |-- components/ui5/    # Reusable UI5 component objects
|   |-- data/              # Demo app registry
|   |-- diagnostics/       # Known console/network noise filters
|   |-- fixtures/          # Shared Playwright fixtures
|   |-- pages/             # Page objects by app
|   |-- support/           # Global setup and test diagnostics
|   `-- ui5/               # Low-level UI5 locators and waits
|-- tests/
|   |-- api/               # API contract tests
|   `-- *.spec.ts          # UI specs
|-- .github/workflows/     # CI pipeline
|-- playwright.config.ts
|-- playwright.api.config.ts
`-- package.json
```

## Covered UI Apps

- `Demo Apps` catalog
- `Shopping Cart`
- `Browse Orders`
- `Manage Products`
- `Employee Directory`
- `Walkthrough`
- `Shop Administration Tool`

## Scripts

- `npm test`
  Runs UI suite and API suite.
- `npm run test:ui`
  Runs all UI tests.
- `npm run test:smoke`
  Runs only fast smoke UI tests.
- `npm run test:regression`
  Runs broader UI regression tests.
- `npm run test:api`
  Runs API contract tests only.
- `npm run test:headed`
  Runs UI tests headed.
- `npm run test:ui:app`
  Opens Playwright UI mode for the UI suite.
- `npm run report`
  Opens the UI HTML report.
- `npm run report:api`
  Opens the API HTML report.

## Local Setup

```bash
npm install
npx playwright install chromium
```

Run the fast path first:

```bash
npm run test:smoke
npm run test:api
```

## Reports

UI report output:

```text
playwright-report/ui
```

API report output:

```text
playwright-report/api
```

The project is configured to retain trace, screenshot and video artifacts for UI failures or retries.

## CI

Workflow file:

`.github/workflows/playwright.yml`

Current pipeline behavior:

- `api`
  Runs API contract tests on normal CI runs.
- `ui-smoke`
  Runs fast smoke UI coverage on `push` and `pull_request`.
- `ui-regression`
  Runs broader UI regression on `workflow_dispatch` and scheduled execution.

## Notes

- Browser locale is fixed to `en-US` to reduce selector and text instability.
- Known noisy console/network issues from specific SAP demos are filtered in diagnostics so failure attachments focus on unexpected problems.
- `package-lock.json` should be committed.
