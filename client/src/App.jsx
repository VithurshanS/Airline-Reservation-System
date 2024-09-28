import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./login"
import Signup from './signup'




function App() {
  const [count, setCount] = useState(0)
  const [comp,setComponent] = useState()

  const handlelo = () =>{
    setComponent(<Login/>);
  }

  const handlesi = () =>{
    setComponent(<Signup/>);
  }




  return (
    <>
      <div className='ima'>
        <h1>welcome to ARS</h1>
        <button onClick={handlelo}>login</button>
        <button onClick={handlesi}>signup</button>
        {comp}
      </div>
    </>
  )
}

export default App
