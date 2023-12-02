import {useContext} from "react";
import {CartContext} from "../store/cart-context.jsx";

// const cartItems = [
//     {
//         id: "a1",
//         name: "item1",
//         quantity: 1,
//         price: 19.99
//     },
//     {
//         id: "a3",
//         name: "item3",
//         quantity: 3,
//         price: 22.99
//     },
// ]

export default function Cart({isOpen, onClose, onCheckoutModalOpen}) {
    const {cartItems, updateItemQuantity} = useContext(CartContext);

    return <dialog className="cart modal" open={isOpen}>
        <h2>Your Cart</h2>
        {!cartItems.length && <p>No items </p>}
        {(cartItems.length > 0) &&
            <ul>
                {cartItems.map(item => {
                    return <li key={item.id} className="cart-item">
                        <p>
                            {item.name} - {item.quantity} x ${item.price}
                        </p>
                        <p className="cart-item-actions">
                            <button onClick={()=>updateItemQuantity(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={()=>updateItemQuantity(item.id, +1)}>+</button>
                        </p>
                    </li>
                })}

            </ul>
        }
        <p className="cart-total">
            ${cartItems.reduce((sum, item) => sum += item.price * item.quantity, 0).toFixed(2)}
        </p>
        <p className="modal-actions">
            <button onClick={onClose} className="button text-button">
                Close
            </button>
            {cartItems.length > 0  && <button onClick={onCheckoutModalOpen} className="button">
                Go to Checkout
            </button>}
        </p>
    </dialog>
}