
import snapp from "../../src/snapp.js"

const Button = ({props, count}) => {

  const hover = snapp.dynamic(false)

  const btnStyle = {
    "background-color": () => hover.value ? '#357abd' : '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 18px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.2s',
    "transform": () => hover.value ? 'translateY(-2px)' : 'none'
    
  };

  return (
    <button 
      style={btnStyle}
      onClick={() => count.update(count.value + 1)}
      onMouseEnter={() => hover.update(true)}
      onMouseLeave={() => hover.update(false)}
    >
    {props}
    </button>
  )
}

export default Button