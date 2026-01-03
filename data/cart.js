export const cart = [
  {
    ID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quant: 1,
  },
  {
    ID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quant: 2,
  },
];
export function addtocart(productID) {
  let matchingItem = true;
  cart.forEach((item) => {
    if (productID == item.ID) {
      item.quant += 1;
      matchingItem = false;
    }
  });
  if (matchingItem) {
    cart.push({ ID: productID, quant: 1 });
  }
}
