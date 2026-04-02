type KnownNoiseProfile = {
  name: string;
  urlIncludes: string[];
  consolePatterns?: RegExp[];
  requestFailurePatterns?: RegExp[];
  httpErrorPatterns?: RegExp[];
  pageErrorPatterns?: RegExp[];
};

const profiles: KnownNoiseProfile[] = [
  {
    name: 'demoappsCatalog',
    urlIncludes: ['/#/demoapps'],
    consolePatterns: [
      /Failed to load resource: net::ERR_NAME_NOT_RESOLVED/i,
      /failed to load library docu from 'resources\/sap\/sac\/df/i,
      /failed to load library docu from 'resources\/sap\/zen\/dsh/i,
      /Failed to load resource: the server responded with a status of 404 \(\)/i,
    ],
    httpErrorPatterns: [
      /test-resources\/sap\/sac\/df\/demokit\/docuindex\.json/i,
      /test-resources\/sap\/zen\/dsh\/demokit\/docuindex\.json/i,
      /people\.wdf\.sap\.corp\/favicon\.ico/i,
    ],
  },
  {
    name: 'browseOrders',
    urlIncludes: ['/orderbrowser/webapp/'],
    consolePatterns: [/Failed to load resource: the server responded with a status of 404 \(\)/i],
    httpErrorPatterns: [
      /orderbrowser\/webapp\/localService\/mockdata\/Customers\.json/i,
      /orderbrowser\/webapp\/localService\/mockdata\/Employees\.json/i,
      /orderbrowser\/webapp\/localService\/mockdata\/Products\.json/i,
    ],
  },
  {
    name: 'manageProducts',
    urlIncludes: ['/tutorial/worklist/07/webapp/'],
    consolePatterns: [
      /Failed to load resource: the server responded with a status of 404 \(\)/i,
      /failed to load JavaScript resource: mycompany\/myapp\/MyWorklistApp\/Component-preload\.js/i,
      /could not find any translatable text for key 'TableNameColumnTitle'/i,
    ],
    httpErrorPatterns: [
      /tutorial\/worklist\/07\/webapp\/localService\/mockdata\/(Categories|Category|CustomerDemographics|CustomerDemographic|Customers|Customer|Employees|Employee|Order_Details|Order_Detail|Orders|Order|Regions|Region|Shippers|Shipper|Territories|Territory)\.json/i,
      /tutorial\/worklist\/07\/webapp\/Component-preload\.js/i,
    ],
  },
  {
    name: 'employeeDirectory',
    urlIncludes: ['/tutorial/navigation/17/webapp/'],
    consolePatterns: [
      /Failed to load resource: the server responded with a status of 404 \(\)/i,
      /failed to load JavaScript resource: sap\/ui\/demo\/nav\/Component-preload\.js/i,
    ],
    httpErrorPatterns: [/tutorial\/navigation\/17\/webapp\/Component-preload\.js/i],
  },
  {
    name: 'walkthrough',
    urlIncludes: ['/tutorial/walkthrough/38/webapp/'],
    consolePatterns: [
      /Failed to load resource: the server responded with a status of 404 \(\)/i,
      /failed to load JavaScript resource: ui5\/walkthrough\/Component-preload\.js/i,
    ],
    httpErrorPatterns: [/tutorial\/walkthrough\/38\/webapp\/Component-preload\.js/i],
  },
  {
    name: 'shopAdministrationTool',
    urlIncludes: ['/sap/tnt/demokit/toolpageapp/webapp/'],
    consolePatterns: [
      /Failed to load resource: the server responded with a status of 404 \(\)/i,
      /failed to load JavaScript resource: sap\/ui\/demo\/toolpageapp\/Component-preload\.js/i,
    ],
    httpErrorPatterns: [/sap\/tnt\/demokit\/toolpageapp\/webapp\/Component-preload\.js/i],
  },
];

export function knownNoiseProfileForUrl(url: string): KnownNoiseProfile | undefined {
  return profiles.find((profile) => profile.urlIncludes.some((fragment) => url.includes(fragment)));
}

export function filterKnownNoise<T>(
  items: T[],
  patterns: RegExp[] | undefined,
  toText: (item: T) => string
): T[] {
  if (!patterns?.length) {
    return items;
  }

  return items.filter((item) => !patterns.some((pattern) => pattern.test(toText(item))));
}
