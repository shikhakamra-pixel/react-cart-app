

  const ProductCard = ({ product, addToCart, wishlistData }) => {
      const { addToWishlist, removeFromWishlist, isInWishlist } = wishlistData;

      const isWishlisted = isInWishlist(product.id);
      
  const styles = {
    card: {
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "16px",
      width: "220px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      transition: "transform 0.2s ease",
    },
    image: {
      width: "150px",
      height: "150px",
      objectFit: "cover",
      marginBottom: "10px",
    },
    price: {
      fontWeight: "bold",
      color: "#2e7d32",
      marginBottom: "10px",
    },
    wishlistBtn: {
      padding: "8px 12px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      backgroundColor: isWishlisted ? "#ffebee" : "#fce4ec",
      color: isWishlisted ? "#c62828" : "#ad1457",
      marginBottom: "8px",
      width: "100%",
    },
    cartBtn: {
      padding: "8px 12px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#1976d2",
      color: "white",
      width: "100%",
    },
  };
    return (
      <div style={styles.card}>
        <img src={product.image} alt={product.name} width="150" />
        <h3>{product.name}</h3>

        <p style={styles.price}>₹{product.price}</p>
        <div>
          <button
            style={styles.wishlistBtn}
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
          style={styles.cartBtn}
          onClick={() => {
            console.log("clicked", product.id);
            addToCart(product);
          }}
        >
          Add To Cart
        </button>
      </div>
    );
  };

  export default ProductCard
