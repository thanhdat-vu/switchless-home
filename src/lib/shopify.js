import { createStorefrontClient } from "@shopify/hydrogen-react";

export const shopifyClient = createStorefrontClient({
  storeDomain: `https://${process.env.PUBLIC_STORE_NAME}.myshopify.com`,
  storefrontApiVersion: process.env.PUBLIC_STOREFRONT_API_VERSION || "2023-04",
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_TOKEN,
});
