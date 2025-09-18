
import snapp from '../snapp'

const App = () => {

  return (
    <>
      <h2>Hello Snapp</h2>
    </>
  )
};

const snappBody = document.querySelector("#snapp-body");
snapp.render(snappBody, App());