import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      {/* <ShoppingIcon className="shopping-icon" /> */}
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;