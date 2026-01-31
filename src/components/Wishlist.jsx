
const Wishlist = ({ wishlist }) => {
  if (wishlist.length === 0) {
    return <h2>❤️ Your wishlist is empty</h2>;
  }

  return (
    <div>
      <h2>Your Wishlist</h2>

      {wishlist.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
          }}
        >
          <img src={item.image} width="100" />
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
