const savedCart = JSON.parse(localStorage.getItem("Lcart"));

function normalizeCart(rawCart) {
  if (!Array.isArray(rawCart)) {
    return null;
  }

  return rawCart
    .map((item) => ({
      ID: item.ID || item.productId,
      quant: Number(item.quant ?? item.quantity ?? 1),
      deliveryOptionId: String(item.deliveryOptionId || "1"),
    }))
    .filter((item) => item.ID && Number.isFinite(item.quant) && item.quant > 0);
}

export let cart = normalizeCart(savedCart);
if (!cart || cart.length === 0) {
  cart = [
    {
      ID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quant: 1,
      deliveryOptionId: "1",
    },
    {
      ID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quant: 2,
      deliveryOptionId: "3",
    },
    {
      ID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quant: 2,
      deliveryOptionId: "2",
    },
  ];
}
storeCart();
export function addtocart(productID) {
  let matchingItem = true;
  cart.forEach((item) => {
    if (productID == item.ID) {
      item.quant += 1;
      matchingItem = false;
    }
  });
  if (matchingItem) {
    cart.push({ ID: productID, quant: 1, deliveryOptionId: "1" });
  }

  storeCart();
}

export function storeCart() {
  localStorage.setItem("Lcart", JSON.stringify(cart));
}

export function removeProduct(productID) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.ID !== productID) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  storeCart();
}

export function updateDeliveryOption(productID, deliveryOptionId) {
  cart.forEach((item) => {
    if (item.ID === productID) {
      item.deliveryOptionId = deliveryOptionId;
    }
  });

  storeCart();
}
