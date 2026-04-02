import type { Page, Request, Response, TestInfo } from '@playwright/test';
import { filterKnownNoise, knownNoiseProfileForUrl } from '../diagnostics/known-noise';

type ConsoleEntry = {
  type: string;
  text: string;
  location?: {
    url?: string;
    lineNumber?: number;
    columnNumber?: number;
  };
};

type RequestFailureEntry = {
  url: string;
  method: string;
  resourceType: string;
  failureText: string | null;
};

type HttpErrorEntry = {
  url: string;
  status: number;
  statusText: string;
  method: string;
};

type PageStateEntry = {
  url: string;
  title: string;
};

export class TestDiagnosticsCollector {
  private readonly consoleEntries: ConsoleEntry[] = [];
  private readonly requestFailures: RequestFailureEntry[] = [];
  private readonly httpErrors: HttpErrorEntry[] = [];
  private readonly pageErrors: string[] = [];

  constructor(private readonly page: Page) {}

  attach(): void {
    this.page.on('console', (message) => {
      this.consoleEntries.push({
        type: message.type(),
        text: message.text(),
        location: message.location(),
      });
    });

    this.page.on('pageerror', (error) => {
      this.pageErrors.push(error.message);
    });

    this.page.on('requestfailed', (request) => {
      this.requestFailures.push(this.serializeRequestFailure(request));
    });

    this.page.on('response', (response) => {
      const status = response.status();
      if (status >= 400) {
        this.httpErrors.push(this.serializeHttpError(response));
      }
    });
  }

  async attachOnFailure(testInfo: TestInfo): Promise<void> {
    if (testInfo.status === testInfo.expectedStatus) {
      return;
    }

    const knownNoiseProfile = knownNoiseProfileForUrl(this.page.url());
    const unexpectedConsoleEntries = filterKnownNoise(
      this.consoleEntries,
      knownNoiseProfile?.consolePatterns,
      (entry) => entry.text
    );
    const unexpectedRequestFailures = filterKnownNoise(
      this.requestFailures,
      knownNoiseProfile?.requestFailurePatterns,
      (entry) => `${entry.url} ${entry.failureText ?? ''}`
    );
    const unexpectedHttpErrors = filterKnownNoise(
      this.httpErrors,
      knownNoiseProfile?.httpErrorPatterns,
      (entry) => `${entry.url} ${entry.status} ${entry.statusText}`
    );
    const unexpectedPageErrors = filterKnownNoise(
      this.pageErrors,
      knownNoiseProfile?.pageErrorPatterns,
      (entry) => entry
    );

    const pageState: PageStateEntry = {
      url: this.page.url(),
      title: await this.page.title().catch(() => ''),
    };

    await testInfo.attach('page-state', {
      body: Buffer.from(JSON.stringify(pageState, null, 2)),
      contentType: 'application/json',
    });

    await testInfo.attach('diagnostics-profile', {
      body: Buffer.from(
        JSON.stringify(
          {
            profile: knownNoiseProfile?.name ?? null,
            consoleEntries: this.consoleEntries.length,
            unexpectedConsoleEntries: unexpectedConsoleEntries.length,
            requestFailures: this.requestFailures.length,
            unexpectedRequestFailures: unexpectedRequestFailures.length,
            httpErrors: this.httpErrors.length,
            unexpectedHttpErrors: unexpectedHttpErrors.length,
            pageErrors: this.pageErrors.length,
            unexpectedPageErrors: unexpectedPageErrors.length,
          },
          null,
          2
        )
      ),
      contentType: 'application/json',
    });

    await testInfo.attach('unexpected-console-log', {
      body: Buffer.from(JSON.stringify(unexpectedConsoleEntries, null, 2)),
      contentType: 'application/json',
    });

    await testInfo.attach('unexpected-page-errors', {
      body: Buffer.from(JSON.stringify(unexpectedPageErrors, null, 2)),
      contentType: 'application/json',
    });

    await testInfo.attach('unexpected-request-failures', {
      body: Buffer.from(JSON.stringify(unexpectedRequestFailures, null, 2)),
      contentType: 'application/json',
    });

    await testInfo.attach('unexpected-http-errors', {
      body: Buffer.from(JSON.stringify(unexpectedHttpErrors, null, 2)),
      contentType: 'application/json',
    });
  }

  private serializeRequestFailure(request: Request): RequestFailureEntry {
    return {
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      failureText: request.failure()?.errorText ?? null,
    };
  }

  private serializeHttpError(response: Response): HttpErrorEntry {
    return {
      url: response.url(),
      status: response.status(),
      statusText: response.statusText(),
      method: response.request().method(),
    };
  }
}
