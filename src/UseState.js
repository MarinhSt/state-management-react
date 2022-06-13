import React, { useState, useEffect } from 'react'

const SECURITY_CODE = 'confirm'

function UseState({ name }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    //executes the code when it fulfills the conditions given in the second argument
    useEffect(() => {
        //validation to avoid execution on page loading
        loading &&
            setTimeout(() => {
                setLoading(false)
                value !== SECURITY_CODE ? setError(true) : setError(false)
            }, 1000)
    }, [loading, value])

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
                onChange={({ target }) => setValue(target.value)}
            />
            <button onClick={() => setLoading(!loading)}>Check it</button>
        </div>
    )
}

export { UseState }
