import { useMemo } from "react";


function Cart({ cart, increaseQty, decreaseQty, removeItem }) {
  if (cart.length === 0) {
    return <h3>🛒 Cart is empty</h3>;
  }

  // Memoized total bill
  const totalBill = useMemo(() => {
    console.log("Calculating total bill...");
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <img src={item.image} width="100" />
          <h4>{item.name}</h4>
          <p>Price: ₹{item.price}</p>
          <div>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>
          <p>Total: ₹{item.price * item.quantity}</p>
          <button onClick={() => removeItem(item.id)}>Remove</button>

          <button>Purchase Now</button>
        </div>
      ))}

      <div>
        <h2>Total Bill: ₹{totalBill}</h2>
      </div>
    </div>
  );
};

export default Cart;

// The component that OWNS the state
// is the ONLY component that should MODIFY it

// In your app:

// App.jsx
//  ├── Navbar
//  ├── ProductList
//  └── Cart


// 👉 cart state lives in App.jsx
// 👉 So only App.jsx is allowed to update it

// 🔍 What happens if you write functions in Cart.jsx?

// Let’s imagine you do this 👇

// function Cart({ cart }) {
//   const increaseQty = (id) => {
//     // ❌ WHERE will setCart come from?
//   };
// }

// Problem #1: Cart DOES NOT have setCart

// cart is coming as a prop

// Props are read-only

// React will NOT allow:

// cart.push(...)
// cart[0].quantity++


// ❌ This breaks React’s data flow

// 🔥 Very Important Concept: Props are READ-ONLY

// Props = data given by parent
// State = data owned by component

// Cart only receives data.
// It does not control data.

//useMemo hook 
// CASE 1: Page load / Route change

// Jab user /cart pe aata hai:

// 1️⃣ App.jsx render
// 2️⃣ Cart.jsx render
// 3️⃣ Cart function execute hota hai
// 4️⃣ Total bill calculation chalti hai

// ✅ Normal behaviour

// CASE 2: Quantity increase (+ button)

// Button click:

// increaseQty(item.id)

// Kya hota hai internally?

// 1️⃣ setCart(...) call hota hai
// 2️⃣ cart state change hoti hai
// 3️⃣ App.jsx re-render hota hai
// 4️⃣ App ke saare children re-render:

// Navbar

// Cart
// 5️⃣ Cart function poora dobara execute hota hai


// CASE A: useMemo NAHI hai (tumhara current reduce)

// Tumhara code:

// const totalItems = cart.reduce((sum, item) => sum + 1, 0);

// Important rule:

// ❗ Component re-render hua = ye line dobara chalegi
// Chahe cart same ho ya change ho — React ko farak nahi padta.

// 🔁 Route change → Wishlist page

// User goes from /cart → /wishlist

// Kya hota hai internally?

{/* <BrowserRouter> state change karta hai

App component re-render hota hai

App ke andar saari JS lines upar se niche dobara run hoti hain

👉 React ye nahi dekhta:

“cart same hai kya?”

React simply bolta hai:

“Component function fir se chalao”

Is line ka fate 👇
const totalItems = cart.reduce((sum, item) => sum + 1, 0);


cart SAME hai ✔️

phir bhi reduce chalega ❌

📌 No reuse at all */}


// 1️⃣ Sabse pehle ek BAAT clear kar lo 🔥

// 👉 useMemo render ko ROKTA nahi hai
// 👉 useMemo sirf calculation ko ROKTA hai

// 💡 Render ≠ Calculation

// 2️⃣ Tumhara scenario (Cart Total Bill)

// Assume tum Cart component mein ye likhti ho:

// const totalBill = useMemo(() => {
//   console.log("💰 Total bill calculated");
//   return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
// }, [cart]);

// 3️⃣ CASE BY CASE — KYA HOGA?
// ✅ Case 1: User adds item to cart
// addToCart → setCart → cart NEW


// ✔️ App re-render
// ✔️ Cart re-render
// ✔️ cart reference change

// ➡️ useMemo bolega:
// ❌ SAME nahi → recalculate

// 🟢 reduce chalega
// 🟢 total bill update hoga

// ✅ Case 2: User + / - quantity
// increaseQty / decreaseQty → setCart → cart NEW


// ✔️ cart change
// ✔️ reference change

// ➡️ useMemo:
// ❌ SAME nahi → recalculate

// 🟢 total bill chalega

// ✅ Case 3: User removes item
// removeItem → setCart → cart NEW


// ✔️ cart new
// ➡️ recalculate

// 🔄 Case 4: User CART → WISHLIST route change
// /cart → /wishlist

// Internally kya hota hai?

// ✔️ Route change
// ✔️ App component re-render hota hai
// ✔️ Cart component UNMOUNT ho jata hai

// ⚠️ Important
// Cart component visible hi nahi hai,
// to total bill UI render hi nahi hota

// BUT logic-wise:

// ➡️ useMemo dekhta hai:

// cart === previousCart ? ✅ SAME


// 🟢 old total reused
// 🛑 reduce NAHI chalega

// 🧠 Simple words:

// Render hua? → HAAN
// Total bill calculate hua? → ❌ NAHI