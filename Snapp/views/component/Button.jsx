
const FullButton = (props) => {
    return (
        <>
          {props.props}
          <h1>Ok</h1>
          Hello World
          <button>HEy</button>
        </>
    )
}

const Button = (props) => {
    return (
        <button>ggg{props.type}</button>
    )
}

export { Button, FullButton }