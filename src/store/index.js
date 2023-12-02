// import {createStore} from "redux";
import {
    // createSlice,
    configureStore
} from "@reduxjs/toolkit";


import authReducer from "./auth";
import counterReducer from "./counter";


// const counterReducer = (state = initialState, action) => {
//     if (action.type === "increment") {
//         return { // forbiden do mutate
//             ...state,
//             counter: state.counter + 1
//         };
//     }
//     if (action.type === "increase") {
//         return {
//             ...state,
//             counter: state.counter + action.value
//         };
//     }
//     if (action.type === "decrement") {
//         return {
//             ...state,
//             counter: state.counter - 1
//         };
//     }
//     if (action.type === "toggle") {
//         return {
//             ...state,
//             showCounter: !state.showCounter
//         };
//     }
//     return state;
// };

// const store = createStore(counterReducer);
// const store = createStore(counterSlice.reducer);
const store = configureStore({
    reducer: {
        counter: counterReducer, // way to have multiple reducers
        auth: authReducer,
    }
})

export default store;
