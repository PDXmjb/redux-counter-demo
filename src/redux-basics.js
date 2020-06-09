console.log("Hello!");

const redux = require('redux'); // soon back to import {} from blah
const createStore = redux.createStore;

// State doesn't have to be an object, just usually is as we usually have more than one field we care about.
const initialState = {
    counter: 0
}

// Reducer
// Takes in current state and the action trying to be done, then returns updated state.
// Simplest case returns current state.
// state = initialState is a default value (if state is called with undefined)
const rootReducer = (state = initialState, action) => { 
    if (action.type === 'INCREMENT_COUNTER') {
        // DO NOT UPDATE STATE COUNTER. NOT IMMUTABLE.
        // DON'T DO: state.counter = state.counter + 1;

        return {
            ...state,
            counter: state.counter + 1 // this is fine, only reading value, not changing it.
        }
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value 
        }
    }

    return state;
}

// Store
const store = createStore(rootReducer); // Initializes store. Needs to be created with a reducer. Reducer only thing that can update state.

console.log(store.getState()); // pulls out state from the store.

// Subscription
// Takes a function that will be executed whenever the state changes.
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
})

// Dispatching Action
// Takes an action as a param. Includes type key, which is used universally. Convention all uppercase string
// Can add any other properties, but NEED type. Can pass however you want - group of keys, single key for whole payload
// with another object under it, w/e.
store.dispatch({type: 'INCREMENT_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());

