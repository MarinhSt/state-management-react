import React from 'react'

const SECURITY_CODE = 'confirm'

class ClassState extends React.Component {
    constructor() {
        super()

        this.state = {
            value: '',
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
                this.state.value !== SECURITY_CODE
                    ? this.setState({ error: true })
                    : this.setState({ error: false })
            }, 1000)
    }

    render() {
        const { value, error, loading } = this.state
        return (
            <div>
                <h2>Delete {this.props.name}</h2>
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
                        this.setState({ value: target.value })
                    }
                />
                <button onClick={() => this.setState({ loading: !loading })}>
                    Check it
                </button>
            </div>
        )
    }
}

export { ClassState }
