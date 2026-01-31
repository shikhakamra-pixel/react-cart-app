import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductLists';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Cart from './components/cart';
import useWishlist from "./hooks/useWishlist";
import Wishlist from './components/Wishlist';


function App() {
// cart state lives in App.jsx
// So only App.jsx is allowed to update it-increase/decrease qty
  const [cart, setCart] = useState([]);
  const wishlistData = useWishlist();
  const { wishlist } = wishlistData;

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + 1, 0);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };


  const decreaseQty = (id)=>{
    setCart(
      cart.map((item)=>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item)=> item.quantity > 0)
    );
  };
const removeItem = (id) => {
  setCart(cart.filter((item) => item.id !== id));
};




  return (
    <>
      <BrowserRouter>
        <Navbar cartCount={totalItems} wishlistCount={wishlist.length} />
        <Routes>
          <Route
            path="/"
            element={
              <ProductList addToCart={addToCart} wishlistData={wishlistData} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />
          <Route
            path="/wishlist"
            element={<Wishlist wishlist={wishlist} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
