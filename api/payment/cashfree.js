// api/create-order.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { amount, customerId, customerName, customerEmail, customerPhone } =
    req.body;

  try {
    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: customerId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },
        order_meta: {
          return_url: "https://flipkart-client-eight.vercel.app/", // <-- this
        },
      }),
    });


    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Cashfree error:", err);
    return res.status(500).json({ message: "Cashfree order error" });
  }
}
