import { test, expect } from '@playwright/test';
import { apiContracts } from '../../src/api/demo-app-api-contracts';

for (const contract of apiContracts) {
  test.describe(`${contract.key} API contract`, () => {
    test(`serves manifest and metadata for ${contract.key}`, async ({ request }) => {
      const manifestResponse = await request.get(contract.manifestPath);
      expect(manifestResponse.ok()).toBeTruthy();

      const manifest = await manifestResponse.json();
      expect(manifest['sap.app']?.id).toBe(contract.expectedAppId);
      expect(Object.keys(manifest['sap.app']?.dataSources ?? {})).toContain('mainService');

      const metadataResponse = await request.get(contract.metadataPath);
      expect(metadataResponse.ok()).toBeTruthy();

      const metadata = await metadataResponse.text();
      for (const marker of contract.metadataMustContain) {
        expect(metadata).toContain(marker);
      }
    });

    test(`serves primary mock dataset for ${contract.key}`, async ({ request }) => {
      const datasetResponse = await request.get(contract.primaryDataset.path);
      expect(datasetResponse.ok()).toBeTruthy();

      const dataset = (await datasetResponse.json()) as Array<Record<string, unknown>>;
      expect(Array.isArray(dataset)).toBeTruthy();
      expect(dataset.length).toBeGreaterThanOrEqual(contract.primaryDataset.expectedLengthAtLeast);

      const firstItem = dataset[0];
      expect(firstItem).toBeTruthy();

      for (const field of contract.primaryDataset.requiredKeys) {
        expect(firstItem).toHaveProperty(field);
      }
    });
  });
}

