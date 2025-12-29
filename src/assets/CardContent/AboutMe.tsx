import type { ReactNode } from 'react'
import './AboutMe.css'
import { motion } from 'motion/react';
import MotionCard from '../components/DraggableCardKit/MotionCard';
import { BLANK_CARD_DATA } from '../components/DraggableCardKit/CardKitFunctions';
import StickyNote from '../StickyNote/StickyNote';


// more professional. More consice / straight to the point
const section1Text = {
    type1: <p className='content'>
        I'm an Alumni from UC San Diego with a B.S. in Computer Science & Engineering.
        I have a passion for programming and technology; From web development, to embedded software, to virtualization and homelabbing,
        I love learning new technologies and writing software!
    </p>,
    type2: <div>
        <p className='content'>
            BS Computer Science & Engineering from UC San Diego.
        </p>
        {/* <br/> */}
        <p className='content'>

        </p>
        <p>

        </p>
    </div>
}

interface AboutMeProps {
    children?: ReactNode;
    currSettings: { beSerious: boolean };
}
export default function AboutMe(props: AboutMeProps) {

    return (
        <motion.div id='main'>

            <div id='aboutme-header'>
                About Me
            </div>
            {/* TODO: if minimized beyond a certain size, Flip the grid to be Vertical instead of Horizontal */}
            <div className='profile-grid' style={{ marginBottom: '75px' }}>
                <div className='profile-desc' style={{ gridArea: 'desc' }}>
                    <div id='profile-description'>
                        Experienced with a wide variety of technologies ranging from web development,
                        to embedded software, virtualization, computer networks and more, I'm confident in my ability to
                        adapt, rise to, and excel at any opportunity
                    </div>
                    <button onClick={() => { alert('fuck you.') }}> resume download button </button>


                </div>
                <div id='profile-img' style={{ gridArea: 'img' }}>
                    <div className='profile-img-cardbox' style={{
                        width: 360,
                        height: 320,
                    }}>
                        <div className='profile-img-cardbox' style={{
                            width: 335,
                            height: 300,
                            borderColor: 'transparent',
                            backgroundColor: '#00000011'
                        }}>
                            <div className='profile-img-cardbox' style={{
                                width: 315,
                                height: 280,
                                borderColor: 'transparent',
                                backgroundColor: '#00000025'
                            }}>
                            <div className='profile-img-cardbox' style={{
                                width: 295,
                                height: 250,
                                borderColor: 'transparent',
                                backgroundColor: '#0000002a'
                            }}>
                            <div className='profile-img-cardbox' style={{
                                width: 250,
                                height: 210,
                                borderColor: 'transparent',
                                backgroundColor: '#00000036'
                            }}>
                                <div>
                                    <MotionCard
                                        cardData={BLANK_CARD_DATA}
                                        cardContent={{ cardBack: 'img/gradsmile.jpg' }}
                                        style={{
                                            // make this the size of the image somehow?
                                            width: 335,
                                            height: 300,
                                        }}
                                    >
                                    </MotionCard>

                                </div>
                                </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div id='profile-plaque'>
                        Software Developer with a BS Computer Science & Engineering from UC San Diego.
                    </div>
                </div>

                <div className='stickyWrap' style={{ top: '100%', left: '10%', rotate: '5deg' }}>
                    <StickyNote>
                        I also like writing code.
                    </StickyNote>
                </div>
                <div className='stickyWrap' style={{ top: '100%', left: '80%', rotate: '-3deg' }}>
                    <StickyNote>
                        Avid computer and videogame enthusiast. Also mediocre on the piano.
                    </StickyNote>
                </div>
            </div>

            <p> Throw a cool line divider here or something. Maybe the morphing background would suffice? </p>
            <div className='tri-grid' style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                <div className='padded-col-box'>
                    <ul style={{ textAlign: 'left' }}>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Tech Deck [Use Card Carousel]:
                        </p>
                        <li><div className='padded-col-box'> test div</div></li>
                        <li> Git & Github </li>
                        <li> Github Actions </li>
                        <li> React </li>
                        <li> CSS </li>
                        <li> C++ </li>
                        <li> Java </li>
                        <li> JS/TSX </li>
                        <li> Debuggers at large. apparently a lot of people dont know how to use them???</li>
                    </ul>
                </div>
                <div className='padded-col-box'>
                    <ul style={{ textAlign: 'left' }}>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Education Stats:
                        </p>
                        <li>B.S. in Computer Science & Engineering! </li>
                        <li>GPA of 3.65! not too shabby </li>
                        <li>4 years? </li>
                        <li>2 hackathons? </li>
                        <li> </li>
                    </ul>
                </div>
                <div className='padded-col-box'>
                    <ul style={{ textAlign: 'left' }}>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Interests:
                        </p>
                        <li>Building and talking about PCs</li>
                        <li>Videogames</li>
                        <li>Piano</li>
                        <li>In depth discussions of new and innovative topics</li>
                        <li>Feedback and opinions of others.</li>
                        <li>Challenging ideas and having my ideas challenged. Discussion and new perspectives are important!</li>
                        <li>TODO: ADD MORE</li>
                    </ul>
                </div>

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
            <p />
            { }

        </motion.div>

    )

}