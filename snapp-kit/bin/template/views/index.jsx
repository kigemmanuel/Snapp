
import snapp from "../src/snapp.js"
import Button from "./components/Button.jsx"

const App = () => {

  const centerDiv = {
    position: "absolute",
    display: "grid",
    "place-items": "center",
    top: "50%",
    left: "50%",
    width: "100%",
    transform: "translate(-50%, -50%)"
  }

  const aHref = {
    marginTop:  "10px",
    color: "#4a90e2",
    textDecoration: "none",
    "font-weight": "bold"
  }

  const count = snapp.dynamic(0)

  return (
    <div style={centerDiv}>
      <img style={{width: "auto", height: "200px"}} src="assets/snapp.png" alt="" />
      <h2>Welcome to snapp: {() => count.value}</h2>
      <Button count={count}>Click To Count</Button>
      <br />
      <a style={aHref} target="_blank" href="https://github.com/kigemmanuel/Snapp">Learn Snapp</a>
      <span style={{...aHref, color: '#0C2340'}}>Please star and follow</span>
    </div>
  )
}

const SnappBody = document.querySelector("#snapp-body");
snapp.render(SnappBody, App())