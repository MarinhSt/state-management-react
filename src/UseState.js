import React, { useState, useEffect } from 'react'

function UseState({ name }) {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    //executes the code when it fulfills the conditions given in the second argument
    useEffect(() => {
        //validation to avoid execution on page loading
        loading &&
            setTimeout(() => {
                setLoading(false)
            }, 1000)
    }, [loading])

    return (
        <div>
            <h2>Delete {name}</h2>
            {!error ? (
                <p>Please, insert your security code</p>
            ) : (
                <p>Error: incorrect code</p>
            )}
            {!!loading && <p>Loading...</p>}

            <input placeholder="security code" />
            <button onClick={() => setLoading(!loading)}>Check it</button>
        </div>
    )
}

export { UseState }
