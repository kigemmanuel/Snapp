
import snapp from '../snapp'
import SnappHello from './components/Snapp';

const App = () => {

  return (
    <>
      <SnappHello />
    </>
  )
};

const snappBody = document.querySelector("#snapp-body");
snapp.render(snappBody, App());