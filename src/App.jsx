import logo from "./assets/logo.jpg"
import Header from "./components/Header.jsx";
import SuccessModal from "./components/SuccessModal.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import Menu from "./components/Menu.jsx";
import CartContextProvider from "./store/cart-context.jsx";
import {useState} from "react";


function App() {
    const [modalsState, setModalsState] = useState({
        isCartOpened: false,
        isCheckoutModalOpen: false,
        isSuccessModalOpen: false,

    })

    function handleOpenCart() {
        setModalsState(prevState => {
            return {...prevState, isCartOpened: true}
        })
    }

    function handleCloseCart() {
        setModalsState(prevState => {
            return {...prevState, isCartOpened: false}
        })
    }

    function handleCheckoutModalOpen() {
        setModalsState(prevState => {
            return {...prevState, isCartOpened: false, isCheckoutModalOpen: true}
        })
    }

    function handleCheckoutModalClose() {
        setModalsState(prevState => {
            return {...prevState, isCheckoutModalOpen: false}
        })
    }

    function handleSuccessModalOpen() {
        setModalsState(prevState => {
            return {...prevState, isCheckoutModalOpen: false, isSuccessModalOpen: true}
        })
    }



    function handleSuccessModalClose() {
        setModalsState(prevState => {
            return {...prevState, isSuccessModalOpen: false}
        })
    }
    return (
        <CartContextProvider>
            <Cart onClose={handleCloseCart} onCheckoutModalOpen={handleCheckoutModalOpen}
                isOpen={modalsState.isCartOpened}></Cart>
            <CheckoutModal onSuccessModalOpen={handleSuccessModalOpen} onClose={handleCheckoutModalClose} isOpen={modalsState.isCheckoutModalOpen}></CheckoutModal>

            <SuccessModal isOpen={modalsState.isSuccessModalOpen} onClose={handleSuccessModalClose}></SuccessModal>
            <Header onCartOpen={handleOpenCart}></Header>


            <Menu></Menu>
        </CartContextProvider>
    );
}

export default App;
