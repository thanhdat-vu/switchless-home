import { shopifyClient } from "@/lib/shopify";
import { GetServerSideProps } from "next";
import Image from "next/image";

export default function Home({ featuredProducts }: any) {
  console.log(featuredProducts);
  return (
    <div className="py-5">
      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
}

function FeaturedProducts({ featuredProducts }: any) {
  return (
    <>
      <section className="mx-0 lg:mx-10 xl:mx-20 relative">
        <Image
          src={featuredProducts[0].image}
          alt={featuredProducts[0].title_text}
          width={1920}
          height={960}
          className="lg:rounded-2xl h-[400px] lg:h-auto object-cover object-[80%]"
        />
        <div className="lg:absolute lg:top-1/2 lg:left-20 lg:-translate-y-1/2 lg:w-[36rem] lg:text-white bg-blue-50 lg:bg-transparent p-10 lg:p-0">
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
      <section className="min-w-screen overflow-x-scroll lg:overflow-auto mt-5 xl:mt-10 pb-5">
        <div className="flex space-x-5 xl:space-x-10 px-10 xl:px-20">
          {featuredProducts.slice(1).map((product: any) => (
            <div key={product.index} className="relative text-white">
              <Image
                src={product.image}
                alt={product.title_text}
                width={600}
                height={600}
                className="min-w-[320px] h-auto object-cover object-[80%] rounded-2xl"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-2xl"></div>
              <div className="absolute bottom-5 lg:bottom-auto lg:top-1/2 left-0 lg:-translate-y-1/2 px-5 xl:px-8 2xl:px-10">
                <div className="space-y-3 xl:space-y-3 2xl:space-y-6">
                  <p className="text-xs lg:text-sm font-medium uppercase tracking-widest">
                    {product.title_text}
                  </p>
                  <p className="text-xl xl:text-2xl 2xl:text-4xl font-semibold sm:font-bold">
                    {product.secondary_text}
                  </p>
                  <p className="lg:h-[120px] text-justify">
                    {product.tertiary_text}
                  </p>
                  <button className="w-full sm:w-[280px] bg-blue-600 p-4 rounded-[32px] font-bold text-white uppercase hover:bg-blue-500 active:bg-blue-600">
                    Buy now - {product.product.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
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
