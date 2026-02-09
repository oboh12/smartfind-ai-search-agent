// backend/agent/algoliaClient.js
import algoliasearch from "algoliasearch";
import dotenv from "dotenv";

dotenv.config();

// Initialize Algolia client
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

// Initialize indices
export const productsIndex = client.initIndex("products");
export const articlesIndex = client.initIndex("articles");
export const faqsIndex = client.initIndex("faqs");