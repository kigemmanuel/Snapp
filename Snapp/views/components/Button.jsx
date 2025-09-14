
const Button = (props) => {

    snapp.on("DOM", () => {
        console.log("Call Button")
    })

    return (
       <input type="text" value={props.props} />
    )
}

export { Button }