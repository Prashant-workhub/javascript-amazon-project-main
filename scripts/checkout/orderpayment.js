import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { delivery } from "../../utils/deliveryOption.js";
import { formatCurrency } from "../../utils/money.js";

export function renderPaymentSummary() {
  let totalItems = 0;
  let productsPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = products.find((product) => product.id === cartItem.ID);
    if (!matchingProduct) {
      return;
    }

    totalItems += cartItem.quant;
    productsPriceCents += matchingProduct.priceCents * cartItem.quant;

    const selectedDeliveryOption = delivery.find(
      (option) => option.id === cartItem.deliveryOptionId
    );
    if (selectedDeliveryOption) {
      shippingPriceCents += selectedDeliveryOption.priceCents;
    }
  });

  const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const totalCents = totalBeforeTaxCents + taxCents;

  const priceSummaryHtml = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${totalItems}):</div>
      <div class="payment-summary-money">$${formatCurrency(productsPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  const paymentSummary = document.querySelector(".payment-summary");
  paymentSummary.innerHTML = priceSummaryHtml;
}
