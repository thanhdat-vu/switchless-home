import { shopifyClient } from "@/lib/shopify";
import { GetServerSideProps } from "next";

export default function Home(json: any) {
  console.log(json);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

const GRAPHQL_QUERY = `
  query {
    shop {
      name
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(shopifyClient.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
    }),
    headers: shopifyClient.getPrivateTokenHeaders(),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  return { props: json };
};
