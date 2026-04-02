export type DemoAppKey =
  | 'shoppingCart'
  | 'browseOrders'
  | 'manageProducts'
  | 'employeeDirectory'
  | 'walkthrough'
  | 'shopAdministrationTool';

export interface DemoAppDefinition {
  key: DemoAppKey;
  name: string;
  url: string;
  readyExpectation: {
    heading: RegExp;
    urlFragment?: string;
  };
  tags: string[];
}

export const demoApps: Record<DemoAppKey, DemoAppDefinition> = {
  shoppingCart: {
    key: 'shoppingCart',
    name: 'Shopping Cart',
    url: '/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon',
    readyExpectation: {
      heading: /product catalog/i,
      urlFragment: '/cart/webapp/index.html',
    },
    tags: ['@smoke', '@shopping-cart'],
  },
  browseOrders: {
    key: 'browseOrders',
    name: 'Browse Orders',
    url: '/test-resources/sap/m/demokit/orderbrowser/webapp/test/mockServer.html?sap-ui-theme=sap_horizon',
    readyExpectation: {
      heading: /orders \(\d+\)/i,
      urlFragment: '/orderbrowser/webapp/test/mockServer.html',
    },
    tags: ['@smoke', '@browse-orders'],
  },
  manageProducts: {
    key: 'manageProducts',
    name: 'Manage Products',
    url: '/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon',
    readyExpectation: {
      heading: /manage products/i,
      urlFragment: '/tutorial/worklist/07/webapp/test/mockServer.html',
    },
    tags: ['@smoke', '@manage-products'],
  },
  employeeDirectory: {
    key: 'employeeDirectory',
    name: 'Employee Directory',
    url: '/test-resources/sap/ui/core/demokit/tutorial/navigation/17/webapp/index.html?sap-ui-theme=sap_horizon',
    readyExpectation: {
      heading: /home/i,
      urlFragment: '/tutorial/navigation/17/webapp/index.html',
    },
    tags: ['@regression', '@employee-directory'],
  },
  walkthrough: {
    key: 'walkthrough',
    name: 'Walkthrough',
    url: '/test-resources/sap/m/demokit/tutorial/walkthrough/38/webapp/test/mockServer.html?sap-ui-theme=sap_horizon',
    readyExpectation: {
      heading: /walkthrough/i,
      urlFragment: '/tutorial/walkthrough/38/webapp/test/mockServer.html',
    },
    tags: ['@regression', '@walkthrough'],
  },
  shopAdministrationTool: {
    key: 'shopAdministrationTool',
    name: 'Shop Administration Tool',
    url: '/test-resources/sap/tnt/demokit/toolpageapp/webapp/index.html?sap-ui-theme=sap_horizon',
    readyExpectation: {
      heading: /customized shop administration tool/i,
      urlFragment: '/sap/tnt/demokit/toolpageapp/webapp/index.html',
    },
    tags: ['@regression', '@shop-administration-tool'],
  },
};
