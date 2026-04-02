import { test, expect } from '@playwright/test';
import { apiContracts } from '../../src/api/demo-app-api-contracts';

for (const contract of apiContracts) {
  test.describe(`${contract.key} API contract`, () => {
    test('serves manifest and metadata', async ({ request }) => {
      const manifestResponse = await test.step('fetch manifest.json', async () => {
        const response = await request.get(contract.manifestPath);
        expect(response.ok()).toBeTruthy();
        return response;
      });

      await test.step('validate manifest app ID and dataSources', async () => {
        const manifest = await manifestResponse.json();
        expect(manifest['sap.app']?.id).toBe(contract.expectedAppId);
        expect(Object.keys(manifest['sap.app']?.dataSources ?? {})).toContain('mainService');
      });

      await test.step('fetch and validate metadata.xml', async () => {
        const metadataResponse = await request.get(contract.metadataPath);
        expect(metadataResponse.ok()).toBeTruthy();

        const metadata = await metadataResponse.text();
        for (const marker of contract.metadataMustContain) {
          expect(metadata).toContain(marker);
        }
      });
    });

    test('serves primary mock dataset', async ({ request }) => {
      const dataset = await test.step('fetch dataset', async () => {
        const datasetResponse = await request.get(contract.primaryDataset.path);
        expect(datasetResponse.ok()).toBeTruthy();
        return (await datasetResponse.json()) as Array<Record<string, unknown>>;
      });

      await test.step('validate dataset structure and length', async () => {
        expect(Array.isArray(dataset)).toBeTruthy();
        expect(dataset.length).toBeGreaterThanOrEqual(contract.primaryDataset.expectedLengthAtLeast);
      });

      await test.step('validate required fields on first item', async () => {
        const firstItem = dataset[0];
        expect(firstItem).toBeTruthy();

        for (const field of contract.primaryDataset.requiredKeys) {
          expect(firstItem).toHaveProperty(field);
        }
      });
    });
  });
}
