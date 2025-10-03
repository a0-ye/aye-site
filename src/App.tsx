import { useState } from 'react'
import './App.css'

import PageCard from './assets/components/PageCard/PageCard'

function App() {
  const [count, setCount] = useState(0)
  const [activeCard, setActiveCard] = useState(-1)


  return (
    <>
      <div className='nav'>
        <button onClick={ () => setActiveCard(-1)}>RESET</button>
        {/* <button>projects</button>
        <button>aboutme</button>
        <button>contact</button> */}
      </div>
      
      <div className='cardrow'>
        <PageCard content={<div> Hello World!</div>}    id={0} expanded={activeCard === 0}
          onClick={() => setActiveCard(0)}
        />
        <PageCard content={<div> This is my life</div>} id={1} expanded={activeCard === 1}
          onClick={() => setActiveCard(1)}
        />
        <PageCard content={<div> dang it sucks</div>}   id={2} expanded={activeCard === 2}
          onClick={() => setActiveCard(2)}
        />
      </div>
      <h1></h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
