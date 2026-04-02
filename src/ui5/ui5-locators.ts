import type { Locator, Page } from '@playwright/test';
import { escapeRegExp } from '../support/strings';

type Scope = Page | Locator;

export function regionByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('region', { name }).first();
}

export function regionByHeading(scope: Scope, heading: string | RegExp): Locator {
  const headingPattern = typeof heading === 'string' ? new RegExp(escapeRegExp(heading), 'i') : heading;
  return scope
    .locator('[role="region"], article, section, main, nav')
    .filter({ hasText: headingPattern })
    .first();
}

export function buttonByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('button', { name });
}

export function searchboxByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('searchbox', { name });
}

export function listByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('list', { name });
}

export function listItemByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('listitem', { name });
}

export function linkByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('link', { name });
}

export function tabByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('tab', { name });
}

export function gridByName(scope: Scope, name: string | RegExp): Locator {
  return scope.getByRole('grid', { name });
}

export function rowByText(scope: Scope, text: string | RegExp): Locator {
  return scope
    .locator('[role="row"], tr')
    .filter({
      hasText: typeof text === 'string' ? new RegExp(escapeRegExp(text), 'i') : text,
    })
    .first();
}
