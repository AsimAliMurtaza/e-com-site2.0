import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cart.context";

// import Button from "../button/button.component";
// import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const nav = useNavigate();

  const goToCheckoutHandle = ()=>{
    nav('/checkout');
  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {/* {cartItems.map((item) => (
          <CartItem cartItem={item} />
        ))} */}
      </div>
      {/* <Button onClick={goToCheckoutHandle} >CHECKOUT</Button> */}
    </div>
  );
};

export default CartDropdown;