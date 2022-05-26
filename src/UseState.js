import React, { useState } from 'react'

function UseState({ name }) {
    const [error, setError] = useState(false)
    return (
        <div>
            <h2>Delete {name}</h2>
            {!error ? (
                <p>Please, insert your security code</p>
            ) : (
                <p>Error: incorrect code</p>
            )}

            <input placeholder="security code" />
            <button onClick={() => setError(!error)}>Check it</button>
        </div>
    )
}

export { UseState }
