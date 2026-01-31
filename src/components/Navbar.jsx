import { Link } from "react-router-dom";
const Navbar = ({ cartCount, wishlistCount }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: "olive",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h1 style={{ margin: 0 }}>Shop App</h1>
      {/* Right section */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <h3>🛒Cart: {cartCount}</h3>
        </Link>
        <Link to="/wishlist" style={{ textDecoration: "none" }}>
          <h3>❤️Wishlist: {wishlistCount}</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
