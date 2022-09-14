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

    const onError = () =>
        setState({
            ...state,
            error: true,
            loading: false,
        })
    const onConfirm = () =>
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        })
    const onWrite = target =>
        setState({
            ...state,
            value: target.value,
        })
    const onCheck = () =>
        setState({
            ...state,
            loading: !loading,
        })
    const onDeleted = () =>
        setState({
            ...state,
            confirmed: false,
            deleted: true,
        })
    const onRecover = () =>
        setState({
            ...state,
            value: '',
            confirmed: false,
            deleted: false,
        })

    //executes the code when it fulfills the conditions given in the second argument
    useEffect(() => {
        //validation to avoid execution on page loading
        loading &&
            setTimeout(() => {
                //it is necessary to specify that the rest of the properties must also be saved when any of them is changed,
                //to make sure not to overwrite only this change losing the rest of the states
                // setState({ ...state, loading: false })
                value !== SECURITY_CODE ? onError() : onConfirm()
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
                    onChange={({ target }) => onWrite(target)}
                />
                <button onClick={() => onCheck()}>Check it</button>
            </div>
        )
    } else if (confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>
                <p>Are you sure you want to delete UseState?</p>

                <button onClick={() => onDeleted()}>Yes, delete.</button>
                <button onClick={() => onRecover()}>No, go back.</button>
            </div>
        )
    } else if (deleted) {
        return (
            <div>
                <h2>{name} was deleted</h2>
                <p>Do you want to recover UseState?</p>

                <button onClick={() => onRecover()}>Yes, recover.</button>
            </div>
        )
    }
}

export { UseState }
