// PaymentPage.jsx
import React from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartTotalAction } from "../redux/actions/AddTocart.action";

export default function PaymentPage() {
  const { buydata } = useSelector((state) => state?.buydata);

  const toNumber = (v) => Number(String(v).replace(/[^\d.-]/g, "")) || 0;

  const mainProduct = buydata?.[0];
  const price = toNumber(mainProduct?.price);
  const qty = toNumber(mainProduct?.qty || 1);
  const checkoutItems = mainProduct?.checkoutItems || [];
  // Send Facebook Pixel custom event
const trackFbEvent = (eventName, data = {}) => {
  if (typeof fbq !== "undefined") {
    fbq("trackCustom", eventName, data);
  } else {
    console.warn("FB Pixel not loaded yet");
  }
};

  // Total of checkoutItems
  const checkoutTotal = checkoutItems.reduce((acc, item) => {
    const itemPrice = toNumber(item.price);
    const itemQty = toNumber(item.qty || 1);
    return acc + itemPrice * itemQty;
  }, 0);
    const navigate = useNavigate();
  

  // Final total = main product + checkoutItems
  const totalAmount = price * qty + checkoutTotal;
  const dispatch = useDispatch();

  const handleCashfreePayment = async () => {
     trackFbEvent("CashfreePaymentInitiated", {
    amount: totalAmount,
    productTitle: mainProduct?.title,
    productId: mainProduct?.id,
    checkoutItemsCount: checkoutItems?.length,
  });
    try {
      const backend = await axios.post("/api/payment/cashfree", {
        amount: totalAmount,
        customerId: "web_user_" + Date.now(),
        customerName: "Guest User",
        customerEmail: "guest@example.com",
        customerPhone: "9999999999",
      });

      const sessionId =
        backend?.data?.payment_session_id ||
        backend?.data?.order_token ||
        backend?.data?.orderToken;

      if (!sessionId) return alert("No payment session ID!");

      const cashfree = await load({ mode: "sandbox" });

      await cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_self",
        onSuccess: () => (window.location.href = "/payment-success"),
        onFailure: () => (window.location.href = "/payment-failed"),
      });
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }
  };

  const handleUPIPayment = async () => {
     // 🔥 Facebook Pixel event
  // trackFbEvent("UPIPaymentInitiated", {
  //   amount: totalAmount,
  //   productTitle: mainProduct?.title,
  //   productId: mainProduct?.id,
  //   checkoutItemsCount: checkoutItems?.length,
  // });
      dispatch(setCartTotalAction(totalAmount));
     navigate("/upi");
  };


  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">

        {/* Main Product */}
        {mainProduct && (
          <div className="flex gap-4 items-center border-b pb-4 mb-4">
            <img
              src={mainProduct?.image?.[0]}
              alt={mainProduct?.title}
              className="w-28 h-28 rounded-lg object-cover border"
            />
            <div>
              <h2 className="font-semibold text-lg">{mainProduct?.title}</h2>
              <p className="text-sm text-gray-500">{mainProduct?.desc?.slice(0, 60)}...</p>
              <div className="mt-2 flex items-center gap-3">
                <p className="font-bold text-xl text-black">₹{price}</p>
                <p className="line-through text-gray-400 text-sm">{mainProduct?.cancelprice}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Qty: <span className="font-semibold">{qty}</span></p>
            </div>
          </div>
        )}

        {/* Checkout Items */}
        {checkoutItems?.length > 0 && (
          <div className="mb-4 border-b pb-4">
            <h3 className="font-semibold text-lg mb-3">Additional Items</h3>
            {checkoutItems.map((item, idx) => {
              const itemPrice = toNumber(item.price);
              const itemQty = toNumber(item.qty || 1);
              return (
                <div key={idx} className="flex gap-4 items-center border-b pb-4 mb-4">
                  <img
                    src={item?.image?.[0]}
                    alt={item?.title}
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-md">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc?.slice(0, 60)}...</p>
                    <div className="mt-2 flex items-center gap-3">
                      <p className="font-bold text-lg text-black">₹{itemPrice}</p>
                      {item.cancelprice && (
                        <p className="line-through text-gray-400 text-sm">{item.cancelprice}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Qty: <span className="font-semibold">{itemQty}</span></p>
                  </div>
                  <div className="font-semibold text-lg">
                    ₹{itemPrice * itemQty}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Price Summary */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">Order Summary</h3>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Main Product</span>
            <span>₹{price * qty}</span>
          </div>

          {checkoutItems?.length > 0 && (
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Additional Items</span>
              <span>₹{checkoutTotal}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping</span>
            <span className="font-semibold text-green-600">FREE</span>
          </div>

          <div className="flex justify-between text-black font-semibold text-lg border-t pt-3">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Button */}


        <button
          onClick={handleCashfreePayment}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition-all"
        >
          Pay Now
        </button>


          {/* <button
          onClick={handleUPIPayment}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition-all"
        >
          Pay Now
        </button> */}


        {/* <p className="text-center mt-3 text-sm text-gray-500">
          Powered by <span className="font-semibold">Cashfree</span>
        </p> */}
      </div>
    </div>
  );
}
