import React, { useState } from 'react';
import convertFactorToAPR from './modules/apr'
import './App.css'

function App() {

  const [factor, setFactor] = useState('.24')
  const [apr, setApr] = useState()
 
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
      Factor Rate to Weekly APR
      <form className='form' onSubmit={handleSubmit} > 
        <input className='input' onChange={handleChange} placeholder='Factor Rate' value={factor}/>
        <input className='button' type='submit' value="Convert" />
      </form>
      <div className='result'>{apr}</div>
    </div>
  );
}

export default App;
