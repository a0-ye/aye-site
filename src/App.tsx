import { useState } from 'react'
import './App.css'

import PageCard from './assets/components/PageCard/PageCard'
import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'


function App() {
  const [count, setCount] = useState(0)
  const [activeCard, setActiveCard] = useState(-1)
  const closeCard = <button onClick={ () => setActiveCard(-1)}>close card</button>;

  return (
    <>
      <div className='nav'>
        {/* {closeCard} */}
        {/* <button>projects</button>
        <button>aboutme</button>
        <button>contact</button> */}
      </div>
      
      <div className='cardrow'>
        <PageCard 
        content=<> {closeCard} {AboutMeContent}</> 
        thumbnail=<>  {AboutMeThumbnail}  </>
        id={0} 
        activeCard={activeCard}
        onClick={() => setActiveCard(0)}
        />
        
        <PageCard 
        content=<> {closeCard}{} <p></p> <img src='src/assets/img/cow.png'/> </>
        thumbnail= <>  {}{}  </>
        id={1} 
        activeCard={activeCard}
        onClick={() => setActiveCard(1)}
        />

        <PageCard 
        content=<>{closeCard}{}</>
        thumbnail=<>  none of your business  </>
        id={2} 
        activeCard={activeCard}
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
