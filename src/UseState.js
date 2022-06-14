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
        confirmed: false,
        deleted: false,
    })
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
                    ? setState({ ...state, error: true, loading: false })
                    : setState({
                          ...state,
                          error: false,
                          loading: false,
                          confirmed: true,
                      })
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
                    onChange={({ target }) =>
                        setState({ ...state, value: target.value })
                    }
                />
                <button
                    onClick={() => setState({ ...state, loading: !loading })}
                >
                    Check it
                </button>
            </div>
        )
    } else if (confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>
                <p>Are you sure you want to delete UseState?</p>

                <button
                    onClick={() =>
                        setState({ ...state, confirmed: false, deleted: true })
                    }
                >
                    Yes, delete.
                </button>
                <button
                    onClick={() =>
                        setState({ ...state, value: '', confirmed: false })
                    }
                >
                    No, go back.
                </button>
            </div>
        )
    } else if (deleted) {
        return (
            <div>
                <h2>{name} was deleted</h2>
                <p>Do you want to recover UseState?</p>

                <button
                    onClick={() =>
                        setState({
                            ...state,
                            value: '',
                            confirmed: false,
                            deleted: false,
                        })
                    }
                >
                    Yes, recover.
                </button>
            </div>
        )
    }
}

export { UseState }
