import React, { useState, useEffect } from 'react'

const SECURITY_CODE = 'confirm'

function UseState({ name }) {
    // const [value, setValue] = useState('')
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)

    //composite state
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false,
    })
    const { value, error, loading } = state

    //executes the code when it fulfills the conditions given in the second argument
    useEffect(() => {
        //validation to avoid execution on page loading
        loading &&
            setTimeout(() => {
                //it is necessary to specify that the rest of the properties must also be saved when any of them is changed,
                //to make sure not to overwrite only this change losing the rest of the states
                // setState({ ...state, loading: false })
                value !== SECURITY_CODE
                    ? setState({ ...state, error: true, loading: false })
                    : setState({ ...state, error: false, loading: false })
            }, 1000)
        console.log(state)
    }, [loading])

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
                onChange={({ target }) =>
                    setState({ ...state, value: target.value })
                }
            />
            <button onClick={() => setState({ ...state, loading: !loading })}>
                Check it
            </button>
        </div>
    )
}

export { UseState }
