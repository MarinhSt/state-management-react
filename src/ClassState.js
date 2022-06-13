import React from 'react'

class ClassState extends React.Component {
    constructor() {
        super()

        this.state = {
            error: false,
            loading: false,
        }
    }

    // This lifecycle method is only called later updating the component.
    componentDidUpdate() {
        const { loading } = this.state
        //validation to avoid execution on page loading
        loading &&
            setTimeout(() => {
                this.setState({ loading: false })
            }, 1000)
    }

    render() {
        const { error, loading } = this.state
        return (
            <div>
                <h2>Delete {this.props.name}</h2>
                {!error ? (
                    <p>Please, insert your security code</p>
                ) : (
                    <p>Error: incorrect code</p>
                )}
                {!!loading && <p>Loading...</p>}
                <input placeholder="security code" />
                <button onClick={() => this.setState({ loading: !loading })}>
                    Check it
                </button>
            </div>
        )
    }
}

export { ClassState }
