import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
export function renderPaymentSummary() {}

let priceSummaryHtml = "";
let matchingProduct = "";
let total = 0;
cart.foreach((Element) => {
  products.forEach((item) => {
    if (Element.ID === item.id) {
      matchingProduct = item;
    }
    total += item.quant;
  });
  priceSummaryHtml += `
  
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${total}):</div>
            <div class="payment-summary-money">$42.75</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;
});

const cartGrid = document.querySelector(".payment-summary");
cartGrid.innerHTML = priceSummaryHtml;
