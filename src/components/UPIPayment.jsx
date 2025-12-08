import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UPIPayment = () => {
  const cartTotal = useSelector((state) => state.cart?.cartTotal);
  const amount = cartTotal || 0;

  // ---------------- GOOGLE PAY -------------------
  const handleGPayPayment = async () => {

    // window.location.href = `https://gpay.app.goo.gl/pay?pa=0792852A0230948.bqr@kotak&pn=Flipkarta&am=${amount}&cu=INR` 
  //     const openGpay = () => {
    const upi = "0792852A0230948.bqr@kotak"
    let url =
      "gpay://upi/pay?pa=" +
      upi +
      "&pn=Shop&am=" +
      Number(amount)+
      "&cu=INR&tn=Payment";
    window.location.href = url;
  

  //      try {
  //     const backend = await axios.post("/api/payment/gpay", { amount });
  //     const upi = backend?.data?.upiLink;
  //     if (!upi) return alert("No UPI link!");

  //     const isAndroid = /Android/i.test(navigator.userAgent);
  //     const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  //     if (isAndroid) {
  //       const gpayIntent =
  //         upi.replace("upi://pay", "intent://pay") +
  //         "#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end";
  //       window.location.href = gpayIntent;
  //     } else if (isIOS) {
  //        window.location.href =`https://gpay.app.goo.gl/pay?pa=0792852A0230948.bqr@kotak&pn=Flipkarta&am=${amount}&cu=INR&mode=02`;
  // // window.location.href = `https://pay.google.com/gp/p/ui/pay?pa=0792852A0230948.bqr@kotak&pn=Flipkart&cu=INR`;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Payment failed");
  //   }
  };

  // ---------------- PHONEPE -------------------
  const handlePhonePePayment = async () => {
    try {
      const backend = await axios.post("/api/payment/phonepe", { amount });
      const upi = backend?.data?.upiLink;
      if (!upi) return alert("No UPI link!");

      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isAndroid) {
        const phonePeIntent =
          upi.replace("upi://pay", "intent://pay") +
          "#Intent;scheme=upi;package=com.phonepe.app;end";
        window.location.href = phonePeIntent;
      } else if (isIOS) {
           window.location.href = `phonepe://upi/pay?pa=0792852A0230948.bqr@kotak&pn=Flipkarta&am=${amount}&cu=INR`

      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  // ---------------- PAYTM -------------------
  const handlePaytmPayment = async () => {
    try {
      const backend = await axios.post("/api/payment/paytm", { amount });
      const upi = backend?.data?.upiLink;
      if (!upi) return alert("No UPI link!");

      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isAndroid) {
        const paytmIntent =
          upi.replace("upi://pay", "intent://pay") +
          "#Intent;scheme=upi;package=net.one97.paytm;end";
        window.location.href = paytmIntent;
      } else if (isIOS) {
        window.location.href = `paytm://upi/pay?pa=0792852A0230948.bqr@kotak&pn=Flipkarta&am=${amount}&cu=INR`;
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };


  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Choose UPI Payment Method
      </h2>

      <div className="flex flex-col gap-4">

        {/* Google Pay */}
        <button
          onClick={handleGPayPayment}
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwKcB10hDUH9iwbbfKEkjxB3XrOHsFyAGYMw&s"
            className="h-10 w-10"
            alt="GPay"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">Google Pay</p>
            <p className="text-sm text-gray-500">₹{cartTotal}</p>
          </div>
        </button>

        {/* PhonePe */}
        <button
          onClick={handlePhonePePayment}
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <img
            src="https://wp.logos-download.com/wp-content/uploads/2021/01/PhonePe_Logo.png?dl"
            className="h-10 w-10"
            alt="PhonePe"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">PhonePe</p>
            <p className="text-sm text-gray-500">₹{cartTotal}</p>
          </div>
        </button>

        {/* Paytm */}
        <button
          onClick={handlePaytmPayment}
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <img
            src="https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/6509eb67755ac-ptm.png"
            className="h-10 w-10"
            alt="Paytm"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">Paytm</p>
            <p className="text-sm text-gray-500">₹{cartTotal}</p>
          </div>
        </button>

      </div>
    </div>
  );

};

export default UPIPayment;
