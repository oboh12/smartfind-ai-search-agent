// backend/scripts/seedAlgolia.js
import dotenv from "dotenv";
dotenv.config();

import { productsIndex, articlesIndex, faqsIndex } from "../agent/algoliaClient.js";
import { products, articles, faqs } from "../sampleData.js";

async function seed() {
  try {
    // Seed products
    await productsIndex.saveObjects(products, { autoGenerateObjectIDIfNotExist: true });
    console.log("Products indexed ✅");

    // Seed articles
    await articlesIndex.saveObjects(articles, { autoGenerateObjectIDIfNotExist: true });
    console.log("Articles indexed ✅");

    // Seed FAQs
    await faqsIndex.saveObjects(faqs, { autoGenerateObjectIDIfNotExist: true });
    console.log("FAQs indexed ✅");

    console.log("All sample data pushed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seed();