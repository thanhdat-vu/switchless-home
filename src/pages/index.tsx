import { shopifyClient } from "@/lib/shopify";
import { GetServerSideProps } from "next";
import Image from "next/image";

export default function Home({ featuredProducts }: any) {
  console.log(featuredProducts);
  return (
    <div className="py-5">
      <section className="px-0 lg:px-20 relative">
        <Image
          src={featuredProducts[0].image}
          alt={featuredProducts[0].title_text}
          width={1920}
          height={960}
          className="lg:rounded-2xl h-[400px] lg:h-auto object-cover object-[80%]"
        />
        <div className="lg:absolute lg:top-1/2 lg:left-36 lg:-translate-y-1/2 lg:w-[36rem] lg:text-white bg-blue-50 lg:bg-transparent p-8 lg:p-0">
          <div className="space-y-3 lg:space-y-6 mb-8 lg:mb-16">
            <p className="text-sm font-medium uppercase tracking-widest">
              {featuredProducts[0].title_text}
            </p>
            <p className="text-2xl lg:text-4xl font-bold">
              {featuredProducts[0].secondary_text}
            </p>
            <p>{featuredProducts[0].tertiary_text}</p>
          </div>
          <button className="w-[280px] bg-blue-600 p-4 rounded-[32px] font-bold text-white uppercase hover:bg-blue-500 active:bg-blue-600">
            Buy now - {featuredProducts[0].product.price}
          </button>
        </div>
      </section>
    </div>
  );
}

function FeaturedProducts(featuredProducts: any) {
  return (
    <section>
      <Image
        src={featuredProducts[0].image}
        alt={featuredProducts[0].title_text}
        width={1280}
      />
    </section>
  );
}

const GRAPHQL_QUERY = `
  query getFeaturedProducts {
    metaobjects(type: "featured_product", first: 4) {
      nodes {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
              }
            }
            ... on Product {
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
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

  console.log(json);

  const featuredProducts = json.data.metaobjects.nodes
    .map((node: any) => {
      const fields = node.fields.reduce((acc: any, field: any) => {
        if (
          field.key === "image" &&
          field.reference &&
          field.reference.image &&
          field.reference.image.url
        ) {
          acc[field.key] = field.reference.image.url;
        } else if (
          field.key === "product" &&
          field.reference &&
          field.reference.priceRange &&
          field.reference.priceRange.minVariantPrice
        ) {
          acc[field.key] = {
            id: field.value,
            price:
              field.reference.priceRange.minVariantPrice.amount +
              " " +
              field.reference.priceRange.minVariantPrice.currencyCode,
          };
        } else if (field.key === "index") {
          acc[field.key] = parseInt(field.value, 10);
        } else {
          acc[field.key] = field.value;
        }
        return acc;
      }, {});
      return fields;
    })
    .sort((a: any, b: any) => a.index - b.index);

  return { props: { featuredProducts } };
};
