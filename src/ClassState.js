import React from 'react'

class ClassState extends React.Component {
    constructor() {
        super()

        this.state = {
            error: false,
        }
    }
    render() {
        const { error } = this.state
        return (
            <div>
                <h2>Delete {this.props.name}</h2>
                {!error ? (
                    <p>Please, insert your security code</p>
                ) : (
                    <p>Error: incorrect code</p>
                )}
                <input placeholder="security code" />
                <button onClick={() => this.setState({ error: !error })}>
                    Check it
                </button>
            </div>
        )
    }
}

export { ClassState }
