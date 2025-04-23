# 🛍️ React Stripe Shop

A full-stack eCommerce web application built using **React**, **TypeScript**, **Tailwind CSS**, and **Express.js**, featuring **Stripe Checkout** for secure payments.

---

## 🚀 Features

- 🛒 Browse and add products to cart
- 🧮 Dynamic cart management with quantity updates
- 💸 Secure checkout using Stripe payment gateway
- ✅ Post-payment success and cancel flow
- ⚡ Responsive and clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Stripe.js (Client integration)
- React Router DOM

### Backend
- Node.js + Express.js
- Stripe SDK (Server integration)
- CORS + dotenv for config

---

## 📂 Project Structure
<pre><code>``` root/ ├── client/ # React frontend │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── ProductPage.tsx │ │ ├── ProductCart.tsx │ │ ├── CheckoutPage.tsx │ │ └── main.tsx │ └── tailwind.config.js ├── server/ # Express backend │ ├── index.js │ └── .env └── README.md ```</code></pre>

---

## 📦 Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/react-stripe-shop.git
cd react-stripe-shop
```

### 2. Setup Backend (Express + Stripe)
```bash
cd server
npm install
```
- Create a .env file inside /server and add your Stripe Secret Key:
```bash
STRIPE_SECRET_KEY=your_secret_key_here
```
- Run server:
```bash
node index.js
```
### 3. Setup Frontend (React + Tailwind)
```bash
cd ../client
npm install
```
- Add your Stripe Publishable Key in .env:
```bash
VITE_REACT_PUB_KEY=your_publishable_key_here
```
- Run App
```bash
npm run dev
```
# 💳 Stripe Test Cards
 - Use this card for testing:
```bash
Card: 4242 4242 4242 4242  
Exp: Any future date  
CVC: Any 3 digits  
Zip: Any 5 digits
```
### 🙌 Contributing
- Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 👨‍💻 Author
 - Awais Saddiqui 
   Portfolio: https://awaissaddiqui.web.app
