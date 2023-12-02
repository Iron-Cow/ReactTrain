import logo from "../assets/logo.jpg";
import {useContext} from "react";
import {CartContext} from "../store/cart-context.jsx";

export default function Header({onCartOpen}) {
const {cartItems} = useContext(CartContext);

    return <header id="main-header">
        <div id="title">
            <img src={logo} alt=""/>
            <h1>ReactFood</h1>
        </div>
        <button onClick={onCartOpen} className="button">Cart ({cartItems.length})</button>
    </header>
}