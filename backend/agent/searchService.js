import algoliasearch from "algoliasearch";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Debug: check if env variables are loaded
console.log("ALGOLIA_APP_ID:", process.env.ALGOLIA_APP_ID);
console.log("ALGOLIA_ADMIN_KEY:", process.env.ALGOLIA_ADMIN_KEY);

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

const productsIndex = client.initIndex("products");
const articlesIndex = client.initIndex("articles");
const faqsIndex = client.initIndex("faqs");

/**
 * Search across all Algolia indices
 */
export async function searchAllIndices(query) {
  const [products, articles, faqs] = await Promise.all([
    productsIndex.search(query),
    articlesIndex.search(query),
    faqsIndex.search(query),
  ]);

  return {
    products: products.hits,
    articles: articles.hits,
    faqs: faqs.hits,
  };
}