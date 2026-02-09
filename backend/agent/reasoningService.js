export function reasonOverResults({ products, articles, faqs }) {
  const bestProduct = products
    .sort((a, b) => b.rating - a.rating)[0];

  const mainArticle = articles[0];
  const relevantFaq = faqs[0];

  return {
    bestProduct,
    mainArticle,
    relevantFaq
  };
}