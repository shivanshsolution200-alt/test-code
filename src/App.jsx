import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowHeader from "./components/ShowHeader";
import Loading from "./components/Loading";
import UPIPayment from "./components/UPIPayment";

function App() {
  const HomePage = lazy(() => import('./components/HomePage'));
  const Productpage = lazy(() => import('./components/Productpage'));
  const AddAddresspage = lazy(() => import('./components/AddAddresspage'));
  const CheckOutpage = lazy(() => import('./components/CheckOutpage'));
  const PaymentPage = lazy(() => import('./components/PaymentPage'));
  const Cartpage = lazy(() => import('./components/Cartpage'));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products data from JSON
    fetch('/products.json')
      .then(response => response.json())
      .then(productdata => {
        // Add random rate and ratenum like the original dress.js
        const dataWithRatings = productdata.map((datar) => {
          return {
            ...datar,
            rate: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
            ratenum: Math.floor(Math.random() * (100000 - 100 + 1) + 100),
          };
        });
        setData(dataWithRatings);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent F12 key (Developer Tools)
      if (e.keyCode === 123) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+J (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
        e.preventDefault();
      }
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', (err) => { err?.preventDefault() })
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', (err) => { err?.preventDefault() })
    }
  }, [])
  useEffect(() => {
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i)
    ) {
      console.log("ios")
    } else {
      function isInstagramBrowser() {
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        return (ua.indexOf('Instagram') > -1) || (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
      }

      function redirectToChrome() {
        var androidUrl = "intent://" + window.location.host + "/#Intent;scheme=https;package=com.android.chrome;end;";
        var fallbackUrl = "https://" + window.location.host + "/";

        if (/android/i.test(navigator.userAgent)) {
          window.location.href = androidUrl;
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          alert('To complete your payment, please open this link in Safari or Chrome.');
        } else {
          window.location.href = fallbackUrl;
        }
      }

      if (isInstagramBrowser()) {
        redirectToChrome();
      }
    }

  }, [])

  if (loading) {
    return <Loading />;
  }

  return (
    <>

      <Routes>

        {/* MAIN LAYOUT */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <ShowHeader />
            </Suspense>
          }
        >

          {/* Home */}
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <HomePage data={data} />
              </Suspense>
            }
          />

          {/* Product Details */}
          <Route
            path="productdetails/:id/:name"
            element={
              <Suspense fallback={<Loading />}>
                <Productpage data={data} />
              </Suspense>
            }
          />

          {/* Add Address */}
          <Route
            path="addaddress"
            element={
              <Suspense fallback={<Loading />}>
                <AddAddresspage />
              </Suspense>
            }
          />

        </Route>

        {/* Cart (no header) */}
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <Cartpage data={data} />
            </Suspense>
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loading />}>
              <CheckOutpage data={data} />
            </Suspense>
          }
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={
            <Suspense fallback={<Loading />}>
              <PaymentPage data={data} />
            </Suspense>
          }
        />

        <Route
          path="/upi"
          element={
            <Suspense fallback={<Loading />}>
              <UPIPayment data={data} />
            </Suspense>
          }
        />

      </Routes>


      <ToastContainer
        className={"!bottom-[80px]"}
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
