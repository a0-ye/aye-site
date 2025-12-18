import type { ReactNode } from 'react'
import './AboutMe.css'
import { motion } from 'motion/react';


// more professional. More consice / straight to the point
const section1Text = {
    type1:  <p className='content'>
                I'm an Alumni from UC San Diego with a B.S. in Computer Science & Engineering.
                I have a passion for programming and technology; From web development, to embedded software, to virtualization and homelabbing, 
                I love learning new technologies and writing software!
            </p>,
    type2:  <p className='content'>
                Graduated from UC San Diego with a BS in Computer Science & Engineering. Experienced in 
                a wide range of [technologies. be more specific?] ranging from web development, 
                to embedded software, to virtualization and homelabbing, I'm confident in my ability to
                adapt, rise, and excel at any opportunity.
                {/* I excel in writing effective, well structured code. */}
            </p>
}

interface AboutMeProps {
    children?:ReactNode;
    currSettings:{beSerious:boolean};
}
export default function AboutMe(props:AboutMeProps){

return (
    <motion.div id='main'>

        <h1 id='banner'>
            About Me
        </h1>
        <div className='content-grid'>
            {props.currSettings.beSerious ? section1Text.type2 : section1Text.type1}
            <button style={{backgroundColor: props.currSettings.beSerious? 'blue' : 'orange'}}></button>
            <img className='about-img' src='img/all-in.jpg'></img>

        </div>

        <p>
            Avid computer and videogame enthusiast. Also mediocre on the piano.
        </p>

        <div className='content-grid'>


            <ul style={{textAlign:'left'}}>
                <p style={{textDecoration:'underline', margin:0}}>
                    Values:
                </p>
                <li>In depth discussions of cool/new topics</li>
                <li>Feedback and opinions of others.</li>
                <li>Challenging ideas and having my ideas challenged. Discussion and new perspectives are important! :tenna-aside: especially in todays economy ama'rite</li>
            </ul>

            <ul style={{textAlign:'left'}}>
                <p style={{textDecoration:'underline', margin:0}}>
                    Interests:
                </p>
                <li>Building and talking about PCs</li>
                <li>Videogames</li>
                <li>Piano</li>
            </ul>
        </div>
        

        what am I interested in doing:
        - tech
        - videogames
        
        Who am i
            personable section: name, where Im from, where I graduated from
            my interestests
            how is my code related to interests

        My experience
            - B.S. CSE
        what am i interested in doing!


        <p>This is my epic website that is inspired by one of my favorite games, Balatro! I hope you also think it is epic.</p>
        <p></p>
        <p/>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>
        <img src='img/all-in.jpg'></img>

        {}
    </motion.div>

    )

}