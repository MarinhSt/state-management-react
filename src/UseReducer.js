import React, { useEffect } from 'react'

const SECURITY_CODE = 'confirm'

function UseReducer({ name }) {
    // const [value, setValue] = useState('')
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)

    //composite state
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const { value, error, loading, confirmed, deleted } = state

    //executes the code when it fulfills the conditions given in the second argument
    useEffect(() => {
        //validation to avoid execution on page loading
        loading &&
            setTimeout(() => {
                //it is necessary to specify that the rest of the properties must also be saved when any of them is changed,
                //to make sure not to overwrite only this change losing the rest of the states
                // setState({ ...state, loading: false })
                value !== SECURITY_CODE
                    ? dispatch({ type: 'ERROR' })
                    : dispatch({ type: 'CONFIRM' })
            }, 1000)
        console.log(state)
    }, [loading])

    if (!confirmed && !deleted) {
        return (
            <div>
                <h2>Delete {name}</h2>
                {!!loading ? (
                    <p>Loading...</p>
                ) : !error ? (
                    <p>Please, insert your security code</p>
                ) : (
                    <p>Error: incorrect code</p>
                )}

                <input
                    placeholder="security code"
                    value={value}
                    onChange={
                        ({ target }) =>
                            dispatch({ type: 'WRITE', payload: target.value })
                        // onWrite(target)
                    }
                />
                <button onClick={() => dispatch({ type: 'CHECK' })}>
                    Check it
                </button>
            </div>
        )
    } else if (confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>
                <p>Are you sure you want to delete UseState?</p>

                <button onClick={() => dispatch({ type: 'DELETED' })}>
                    Yes, delete.
                </button>
                <button onClick={() => dispatch({ type: 'RECOVER' })}>
                    No, go back.
                </button>
            </div>
        )
    } else if (deleted) {
        return (
            <div>
                <h2>{name} was deleted</h2>
                <p>Do you want to recover UseState?</p>

                <button onClick={() => dispatch({ type: 'RECOVER' })}>
                    Yes, recover.
                </button>
            </div>
        )
    }
}

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
const reducerObject = (state, payload) => ({
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
    WRITE: {
        ...state,
        value: payload,
    },
    CHECK: {
        ...state,
        loading: !initialState.loading,
    },
    DELETED: {
        ...state,
        confirmed: false,
        deleted: true,
    },
    RECOVER: {
        ...state,
        value: '',
        confirmed: false,
        deleted: false,
    },
})

// validation
const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}

export { UseReducer }
