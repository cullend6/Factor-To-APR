import React, { useState } from 'react';
import convertFactorToAPR from './modules/apr'

function App() {

  const [factor, setFactor] = useState('.24')
  const [apr, setApr] = useState([])
 
  const handleChange = (e) => {
    setFactor(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(factor)
    setApr(convertFactorToAPR(factor))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} > 
        <input onChange={handleChange} placeholder='Factor Rate' value={factor}/>
        <input type='submit' value="Convert" />
      </form>
      {apr.map((type, index) => index === 0 ? <div>Weekly: {type}</div> : <div>Yearly: {type}</div>)}
    </div>
  );
}

export default App;
