import React from "react"

interface Props {
  name: string
}

interface State {
  name: string
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { name: this.props.name }
  }

  updateName = (name: string) => {
    this.setState({ name })
  }

  render() {
    return (
      <div>
        <h3>Hello, {this.state.name}!</h3>
        <hr />
        <form>
          <label htmlFor="name">Say hello to:</label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={e => this.updateName(e.target.value)}
          />
        </form>
      </div>
    )
  }
}
