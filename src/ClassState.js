import React from 'react'

class ClassState extends React.Component {
    render() {
        return (
            <div>
                <h2>Delete ClassState</h2>
                <p>Please, insert your security code</p>
                <input placeholder="security code" />
                <button>Check it</button>
            </div>
        )
    }
}

export { ClassState }
