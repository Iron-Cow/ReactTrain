import {createContext, useReducer, useState} from 'react';


export const CartContext = createContext({
    menuItems: [],
    cartItems: [],
    setMenuItems: () => {
    },
    addItemToCart: () => {
    },
    updateItemQuantity: () => {
    },
});


function menuCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        console.log(state)
        const updatedItems = [...state.cartItems];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        console.log("ADD_ITEM", existingCartItem, existingCartItem)
        if (existingCartItemIndex !== -1) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = state.menuItems.find(
                (product) => product.id === action.payload
            );
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state, // not needed here because we have only one value
            cartItems: updatedItems,
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.cartItems];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        if (updatedItemIndex === -1) {
            return {...state}
        }

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            cartItems: updatedItems,
        };
    }
    if (action.type === 'SET_MENU') {
        console.log("SET_MENU -> ", action)
        return {
            ...state,
            menuItems: action.payload.menuItems,
        };
    }
    return state;
}

export default function CartContextProvider({children}) {
    const [menuCartState, menuCartDispatch] = useReducer(
        menuCartReducer,
        {
            menuItems: [],
            cartItems: [],
        }
    );

    function handleAddItemToCart(id) {
        menuCartDispatch({
            type: 'ADD_ITEM',
            payload: id,
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        menuCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,
                amount
            }
        });
    }

    function handleSetMenu(menuItems) {
        console.log("handleSetMenu", menuItems)
        menuCartDispatch({
            type: 'SET_MENU',
            payload: {
                menuItems
            }
        });
    }


    const ctxValue = {
        menuItems: menuCartState.menuItems,
        cartItems: menuCartState.cartItems || [],
        setMenuItems: handleSetMenu,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return (
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}
