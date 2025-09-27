import snapp from "../snapp.js"

const App = () => {
    return <h2>{{PAGE_NAME}}</h2>
}

const SnappBody = document.querySelector("#snapp-body");
snapp.render(SnappBody, App())