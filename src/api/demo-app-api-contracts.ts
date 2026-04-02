export type ApiContractDefinition = {
  key: 'shoppingCart' | 'browseOrders' | 'manageProducts';
  manifestPath: string;
  metadataPath: string;
  expectedAppId: string;
  metadataMustContain: string[];
  primaryDataset: {
    path: string;
    requiredKeys: string[];
    expectedLengthAtLeast: number;
  };
};

export const apiContracts: ApiContractDefinition[] = [
  {
    key: 'shoppingCart',
    manifestPath: '/test-resources/sap/m/demokit/cart/webapp/manifest.json',
    metadataPath: '/test-resources/sap/m/demokit/cart/webapp/localService/metadata.xml',
    expectedAppId: 'sap.ui.demo.cart',
    metadataMustContain: ['EntityContainer', 'Products'],
    primaryDataset: {
      path: '/test-resources/sap/m/demokit/cart/webapp/localService/mockdata/Products.json',
      requiredKeys: ['ProductId', 'Name', 'Category', 'Price', 'CurrencyCode'],
      expectedLengthAtLeast: 100,
    },
  },
  {
    key: 'browseOrders',
    manifestPath: '/test-resources/sap/m/demokit/orderbrowser/webapp/manifest.json',
    metadataPath: '/test-resources/sap/m/demokit/orderbrowser/webapp/localService/metadata.xml',
    expectedAppId: 'sap.ui.demo.orderbrowser',
    metadataMustContain: ['EntityContainer', 'Orders', 'Products'],
    primaryDataset: {
      path: '/test-resources/sap/m/demokit/orderbrowser/webapp/localService/mockdata/Orders.json',
      requiredKeys: ['OrderID', 'CustomerID', 'CustomerName', 'OrderDate', 'ShipCountry'],
      expectedLengthAtLeast: 10,
    },
  },
  {
    key: 'manageProducts',
    manifestPath: '/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/manifest.json',
    metadataPath: '/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/localService/metadata.xml',
    expectedAppId: 'mycompany.myapp.MyWorklistApp',
    metadataMustContain: ['EntityContainer', 'Products'],
    primaryDataset: {
      path: '/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/localService/mockdata/Products.json',
      requiredKeys: ['ProductID', 'ProductName', 'UnitsInStock', 'UnitPrice', 'SupplierID'],
      expectedLengthAtLeast: 10,
    },
  },
];

