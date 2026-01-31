

  const ProductCard = ({ product, addToCart, wishlistData }) => {
      const { addToWishlist, removeFromWishlist, isInWishlist } = wishlistData;

      const isWishlisted = isInWishlist(product.id);
    return (
      <div>
        <img src={product.image} alt={product.name} width="150" />
        <h3>{product.name}</h3>

        <p>₹{product.price}</p>
        <div>
          <h3>{product.name}</h3>

          <button
            onClick={() =>
              isWishlisted
                ? removeFromWishlist(product.id)
                : addToWishlist(product)
            }
          >
            {isWishlisted ? "💔 Remove Wishlist" : "❤️ Add Wishlist"}
          </button>
        </div>
        <button
          onClick={() => {
            console.log("clicked", product.id);
            addToCart(product);
          }}
        >
          Add To Cart 🛒
        </button>
      </div>
    );
  };

  export default ProductCard
