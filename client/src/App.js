import React, { useState } from 'react'
import { exportImage } from './polotnoactions'
import './App.css'

const App = () => {
  const process = () => {
    exportImage().then(res=>res.json())
      .then(res=>{
        console.log(res);
      })
  }
  return (
    <main>
      <div className='container'>
        <h1>Polotno Simulation</h1>
        <button type="button" className="btn btn-success" onClick={process}>Export to Image</button>
      </div>
      
    </main>
  )
}

export default App;