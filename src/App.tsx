import { useState } from 'react'
import './App.css'

import PageCard from './assets/components/PageCard/PageCard'
import SpringPageCard from './assets/components/SpringPageCard/SpringPageCard'
import AboutMeContent from './assets/CardContent/AboutMe'
import { AboutMeThumbnail } from './assets/CardContent/AboutMe'

import MotionCard from './assets/components/framerCard/FramerCard'

import Tilt from 'react-parallax-tilt';


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

      <div className='framerRow'>
          <MotionCard></MotionCard>
      </div>

      <div style={{
        width:500,
        height:200,
        backgroundColor:"#d3d6beff"
        }}>boudning1
          <MotionCard></MotionCard>
        </div>
      
      <div style={{
        width:500,
        height:200,
        backgroundColor:"#d6bed1ff"
        }}>bounding2</div>

      <div className='SpringRow'> 
        <SpringPageCard 
          id={0} 
          activeCard={activeCard}
          content={AboutMeContent}
          thumbnail={0}
          onClick={() => setActiveCard(0)}
          />
        <SpringPageCard 
          id={1} 
          activeCard={activeCard}
          content={<img src='src/assets/img/cow.png'/>}
          thumbnail={1}
          onClick={() => setActiveCard(1)}
          />
      </div>

      <h1>gurt</h1>
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
