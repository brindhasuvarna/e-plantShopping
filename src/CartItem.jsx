import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../assets/CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Total amount for all items
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.substring(1)); // convert "$15" to 15
      return total + cost * item.quantity;
    }, 0).toFixed(2);
  };

  // Total cost for single item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Continue shopping
  const handleContinueShopping = () => {
    if (onContinueShopping) onContinueShopping();
  };

  // Checkout placeholder
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Price: {item.cost}</p>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Subtotal: ${calculateTotalCost(item)}</p>
            <button onClick={() => handleRemove(item)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
