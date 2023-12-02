import classes from "./Counter.module.css";
import {useSelector, useDispatch} from "react-redux";
import {counterActions} from "../store/counter"

const Counter = () => {
    const dispatch = useDispatch()
    // const counter = useSelector((state) => state.counter);
    const counter = useSelector((state) => state.counter.counter);
    const isCounterShown = useSelector((state) => state.counter.showCounter);
    const toggleCounterHandler = () => {
        // dispatch({
        //     type: "toggle"
        // })
        dispatch(counterActions.toggleCounter())
    };
    const incrementHandler = () => {
        dispatch(counterActions.increment())
    }
    const decrementHandler = () => {
        dispatch(counterActions.decrement())
    }

    const increaseBy5Handler = () => {
        dispatch(counterActions.increase(5)) // {type: SOME_UNIQUE_ID, payload: 5}
    }
    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {isCounterShown && <div className={classes.value}>{counter}</div>}
            <div className="">
                <button onClick={decrementHandler}>Decrement</button>
                <button onClick={increaseBy5Handler}>Increase by 5</button>
                <button onClick={incrementHandler}>Incerment</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
