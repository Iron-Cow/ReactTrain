import {useContext, useState} from "react";
import {fetchMeals} from "./Menu.jsx";
import {CartContext} from "../store/cart-context.jsx";

export default function CheckoutModal({isOpen, onClose, onSuccessModalOpen}) {
    const {cartItems} = useContext(CartContext);

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [validations, setValidations] = useState({
        name: null, email: null, street: null, zip: null, city: null
    })

    async function sendOrder(cartItems, customer) {
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST', body: JSON.stringify({
                order: {
                    items: cartItems, customer: customer
                }
            }), headers: {
                'Content-Type': 'application/json',
            },
        });

        const status = response.status;

        if (!(status >= 200 && status < 300)) {
            // Handle HTTP errors
            throw await response.json()
        }
    }


    function publishOrder(customer) {
        async function _publishOrder() {
            setIsFetching(true);

            try {
                await sendOrder(cartItems, customer)
                setIsFetching(false);
                onSuccessModalOpen()


            } catch (error) {
                setError({
                    message: error.message || 'Could not publish order.',
                });
                setIsFetching(false);
            }
        }

        _publishOrder()
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError(null)
        setIsFetching(true)

        const fd = new FormData(event.target);
        const controls = fd.getAll('control_input');
        const data = Object.fromEntries(fd.entries());
        data.controls = controls;
        let [name, email, street, zip, city] = data.controls

        publishOrder({
            name, email, street, 'postal-code': zip, city
        })

        setIsFetching(false)
    }

    function validateRequired(event, key) {
        if (event.target.value === "") {
            setValidations(prevState => {
                const p = {
                    ...prevState
                }
                p[key] = false
                return {
                    ...p,
                }
            })
        } else {
            setValidations(prevState => {
                const p = {
                    ...prevState
                }
                p[key] = true
                return {
                    ...p,
                }
            })
        }
    }

    function validateMinSymbols(event, key, minSybmolsNumber) {
        if (event.target.value.length < minSybmolsNumber) {
            setValidations(prevState => {
                const p = {
                    ...prevState
                }
                p[key] = false
                return {
                    ...p,
                }
            })
        } else {
            setValidations(prevState => {
                const p = {
                    ...prevState
                }
                p[key] = true
                return {
                    ...p,
                }
            })
        }
    }

    function validateEmail(event, key) {
        const atIdx = event.target.value.indexOf("@");
        if (atIdx === -1 || atIdx === (event.target.value.length - 1)) {
            setValidations(prevState => {
                const p = {
                    ...prevState
                }
                p[key] = false
                return {
                    ...p,
                }
            })
        } else {
            setValidations(prevState => {
                const p = {
                    ...prevState
                }
                p[key] = true
                return {
                    ...p,
                }
            })
        }
    }

    function resetOnFocusValidation(event, key) {
        setValidations(prevState => {
            const p = {
                ...prevState
            }
            p[key] = null
            return {
                ...p,
            }
        })
    }


    function getValidationClass(isValid) {
        if (isValid === true) {
            return "valid"
        } else if (isValid === false) {
            return "invalid"
        }
        return undefined
    }


    return <dialog className="modal" open={isOpen}>
        <h2>Checkout</h2>
        <p>Total Amount: $89.95</p>
        <form onSubmit={handleSubmit} action="">

            <div className="control">
                <label htmlFor="">Full Name</label>
                <input
                    onFocus={event => resetOnFocusValidation(event, "name")}
                    onBlur={event => validateMinSymbols(event, "name", 6)}
                    className={getValidationClass(validations.name)}
                    name="control_input"
                    type="text"
                    placeholder="at least 6 symbols"
                />
            </div>
            <div className="control">
                <label htmlFor="">E-mail Address</label>
                <input
                    onFocus={event => resetOnFocusValidation(event, "email")}
                    onBlur={event => validateEmail(event, "email")}
                    name="control_input" type="email"
                    className={getValidationClass(validations.email)}
                />
            </div>
            <div className="control">
                <label htmlFor="">Street</label>

                <input

                    onFocus={event => resetOnFocusValidation(event, "street")}
                    onBlur={event => validateMinSymbols(event, "street", 4)}
                    className={getValidationClass(validations.street)}
                    placeholder="at least 4 symbols"
                    name="control_input" type="text"/>
            </div>
            <div className="control-row">
                <div className="control">
                    <label

                        htmlFor="">Postal Code</label>
                    <input
                        onFocus={event => resetOnFocusValidation(event, "zip")}
                        onBlur={event => validateMinSymbols(event, "zip", 5)}
                        className={getValidationClass(validations.zip)}
                        placeholder="02001"
                        name="control_input"
                        required
                        type="number"/>
                </div>
                <div className="control">
                    <label htmlFor="">City</label>
                    <input
                        onFocus={event => resetOnFocusValidation(event, "city")}
                        onBlur={event => validateMinSymbols(event, "city", 1)}
                        className={getValidationClass(validations.city)}
                        name="control_input" type="text"/>
                </div>
            </div>
            {error && <p>{error.message}</p>}
            <p className="modal-actions">
                <button type="button" onClick={onClose} className="button text-button">
                    Close
                </button>
                <button className="button">
                    Go to Checkout
                </button>
            </p>
        </form>
    </dialog>
}