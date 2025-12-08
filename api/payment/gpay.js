export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { amount } = req.body;

  const upiId = "0792852A0230948.bqr@kotak";
  const merchantName = "Flipkart";  // your store name

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    merchantName
  )}&am=${amount}&cu=INR&tn=Order%20Payment`;

  return res.status(200).json({ 
    upiLink 
  });
}
