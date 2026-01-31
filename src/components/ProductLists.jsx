import ProductCard from './ProductCards.jsx'
// import Products from '../data/Products.js';
import product from '../data/Products'
// import { useState } from 'react';

function ProductList({ addToCart, wishlistData }) {
  const data = product.Products;

  // console.log(data);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {data.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          wishlistData={wishlistData}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
