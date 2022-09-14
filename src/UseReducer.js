const initialState = {
    value: '',
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
}

/* different ways to create reducer  */

//Using a classic if else validation
const reducerIfElse = (state, action) => {
    if (action.type === 'ERROR') {
        return { ...state, error: true, loading: false }
    } else if (action.type === 'CONFIRM') {
        return { ...state, error: false, loading: false, confirmed: true }
    } else {
        /* set default state in case of action.type does not match */
        return { ...initialState }
    }
}

//using a Switch case validation
const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return { ...state, error: true, loading: false }
        //break is't necessary, return execute the same function and finished reducerSwitch function
        case 'CONFIRM':
            return { ...state, error: false, loading: false, confirmed: true }
        default:
            return { ...initialState }
    }
}

// Using a Reducer object - here we separete the object frome the validation
const reducerObject = state => ({
    ERROR: {
        ...state,
        error: true,
        loading: false,
    },
    CONFIRM: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
})

// validation
const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state)[action.type]
    } else {
        return state
    }
}
