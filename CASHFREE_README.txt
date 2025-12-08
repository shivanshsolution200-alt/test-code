
Cashfree integration added.

What I changed:
- src/components/PaymentPage.jsx : simplified UI, removed UPI options, kept Cashfree drop-in button & handler.
- cashfree_server.js : a simple Express server endpoint POST /api/payment/create-order that calls Cashfree /pg/orders.
- package.json : added script "start-cashfree" to run the helper server.

IMPORTANT:
1) Add Cashfree SDK script to public/index.html:
   <script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js"></script>

2) Set your keys in environment variables before starting server:
   export CF_APP_ID="your_app_id"
   export CF_SECRET_KEY="your_secret_key"
   export CF_ENV="sandbox"   # or "production"

   Then run:
   npm run start-cashfree

3) The frontend posts to "/api/payment/create-order". If your frontend is served on a different port than the helper server (e.g., dev server on 3000 and helper on 4000),
   ensure to proxy requests or update axios base URL accordingly (or run both on same host).

4) After starting the server and ensuring the SDK script is present, clicking "Pay Now (Cashfree)" will create an order and initialise Cashfree drop-in.

If you want, I can also adapt the frontend axios URL to call http://localhost:4000/api/payment/create-order directly.
