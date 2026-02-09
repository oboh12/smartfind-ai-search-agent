export function composeResponse(reasonedData) {
  const { bestProduct, mainArticle, relevantFaq } = reasonedData;

  let response = "";

  if (bestProduct) {
    response += `I found a strong option for you. 
${bestProduct.name} costs $${bestProduct.price} and has a ${bestProduct.rating} rating.\n\n`;
  }

  if (mainArticle) {
    response += `Here’s a helpful guide that explains what to consider: 
"${mainArticle.title}".\n\n`;
  }

  if (relevantFaq) {
    response += `Quick answer to a common question:\n${relevantFaq.answer}\n\n`;
  }

  response += "Would you like me to compare options or refine your search?";

  return response;
}