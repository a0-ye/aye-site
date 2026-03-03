import type { ReactNode } from 'react'
import './AboutMe.css'
import { motion } from 'motion/react';
import MotionCard from '../components/DraggableCardKit/MotionCard';
import { BLANK_CARD_DATA } from '../components/DraggableCardKit/CardKitFunctions';
import StickyNote from '../components/StickyNote/StickyNote';
// import { div } from 'motion/react-client';


// more professional. More consice / straight to the point

interface AboutMeProps {
    children?: ReactNode;
}

function makeSquiggleBorder() {
    return <div className='squiggle-border' style={{ position: 'absolute', width: '99%', height: '99%', borderColor: '#ecd6b1ff' }}>
        <svg>
            <defs>
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="4" />
                    <feDisplacementMap in="SourceGraphic" scale="2" />
                </filter>
            </defs>
        </svg>
    </div>
}
const color1 = '#a7d4ffff'
const color2 = '#dcff9cff'
const color3 = '#fdb7ffff'
// const color4 = '#b8b7ffff'
// const color5 = 'rgba(183, 255, 195, 1)'
// const color6 = '#b7ffe1ff'

const randomColor = () => {
    const value = Math.random()
    if (value <= 0.333) return color1
    if (value >= 0.666) return color2
    return color3
}

export function makeChad(label: string, contents: string[], newlineFlag?: boolean, color?:string) {

    return <motion.div
        key={label + contents}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        className='chad'>
        <div style={{ textDecoration: 'underline', margin: 0 }}>{label}</div>
        {contents.length > 1 ? <div>
            {contents.map((val, idx) => {
                return <span key={idx} style={{
                    minWidth: 30,
                    margin: 6, padding: '0.25em', display: newlineFlag ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 12, backgroundColor: color || randomColor()
                }}>
                    {val} </span>
            })}
        </div> : <div
            style={{
                minWidth: 30,
                margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 12, backgroundColor: 'color-mix(in srgb, #d1fff7ff, ' + randomColor() + ' 20% )'
            }}
        >
            {contents[0]} </div>}
    </motion.div>
}

export default function AboutMe(props: AboutMeProps) {

    return (
        <motion.div id='main'>
            <div id='aboutme-header'>
                About Me
            </div>
            {/* TODO: if minimized beyond a certain size, Flip the grid to be Vertical instead of Horizontal */}
            <motion.div className='profile-grid' style={{ marginBottom: '75px' }}
                initial={{ opacity: 0, y: '30%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ delay: 1 }}
            >
                <motion.div className='profile-desc' style={{ gridArea: 'desc' }}
                    initial={{ opacity: 0, scale: 2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 }}
                >
                    <motion.div id='profile-desc-content'
                        whileHover={{ boxShadow: '#000000d0 3px 3px 7px' }}
                    // style={{fontFamily:'sans'}}
                    // transition={{type:'spring',duration:0.75}}
                    >
                        <div className='tape' style={{ width: 75, height: 25, backgroundColor: '#9e9d91ff', top: '0%', left: '2%', rotate: '-45deg', position: 'absolute', zIndex: 2 }} />
                        <div className='tape' style={{ width: 75, height: 25, backgroundColor: '#9e9d91ff', top: '100%', left: '100%', rotate: '-45deg', position: 'absolute', zIndex: 2 }} />
                        {makeSquiggleBorder()}
                        <img src='img/stamp.png' alt='stamp here!' style={{ position: 'absolute', top: '5%', right: '5%' }} />
                        <p
                        // style={{ textDecoration:'underline solid #c7c4aa 2px'}}
                        >
                            Experienced with a wide variety of technologies ranging from web development,
                            to embedded software, virtualization, computer networks and more, I'm confident in my ability to
                            adapt, rise to, and excel at any opportunity
                        </p>
                        <p
                            style={{ position: 'absolute', right: '5%', bottom: '0%' }}
                        > - Me, Adrian!</p>
                    </motion.div>
                    {/* <button onClick={() => { alert('oops this isnt done yet... sorry') }}> view resume </button> */}


                </motion.div>
                <div id='profile-img' style={{ gridArea: 'img' }}>
                    <div className='profile-img-cardbox' style={{
                        width: 360,
                        height: 360,
                    }}>
                        <div className='profile-img-cardbox' style={{
                            width: 335,
                            height: 335,
                            borderColor: 'transparent',
                            backgroundColor: '#00000011'
                        }}>
                            <div className='profile-img-cardbox' style={{
                                width: 315,
                                height: 315,
                                borderColor: 'transparent',
                                backgroundColor: '#00000025'
                            }}>
                                <div className='profile-img-cardbox' style={{
                                    width: 295,
                                    height: 295,
                                    borderColor: 'transparent',
                                    backgroundColor: '#0000002a'
                                }}>
                                    <div className='profile-img-cardbox' style={{
                                        width: 250,
                                        height: 250,
                                        borderColor: 'transparent',
                                        backgroundColor: '#00000036'
                                    }}>
                                        <div>
                                            <MotionCard
                                                cardData={{ ...BLANK_CARD_DATA, cardContent: { cardBack: 'img/gradsmile.jpg' } }}
                                                style={{
                                                    // make this the size of the image somehow?
                                                    width: 300,
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

                    <motion.div className='notecard'
                        style={{ rotate: '3deg' }}
                        initial={{ y: '-90%' }}
                        animate={{ y: '0%' }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.div className='notecard'
                            style={{
                                position: 'absolute', width: '100%', height: '100%', rotate: '-6deg',
                                fontFamily: '"Courier New", Courier, monospace', fontSize: 'large',
                                paddingTop: '1.3em'
                            }}
                            initial={{ y: '-90%' }}
                            animate={{ y: '-10%' }}
                            transition={{ delay: 1.2 }}
                        >
                            Software Developer with a BS Computer Science & Engineering from UC San Diego.
                        </motion.div>
                        <p style={{}}>Software Developer with a BS Computer Science & Engineering from UC San Diego.</p>
                    </motion.div>
                </div>

                <div className='stickyWrap' style={{ top: '100%', left: '10%', rotate: '5deg' }}>
                    <StickyNote>
                        I also like writing code.
                    </StickyNote>
                </div>
                <div className='stickyWrap' style={{ top: '100%', left: '80%', rotate: '-3deg' }}>
                    <StickyNote>
                        Computer and videogame enthusiast. Also mediocre on the piano!
                    </StickyNote>
                </div>
            </motion.div>
            <div id='aboutme-header'>
                Stats n' Facts
            </div>

            <motion.div className='padded-chad-box'
                initial={{ opacity: 0, y: '30%' }}
                layout
                whileInView={{ opacity: 1, y: '0%' }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                style={{ width: 'auto' }}
            >
                <p style={{ textDecoration: 'underline', margin: 0, fontSize: 'xx-large' }}>
                    Values:
                </p>

                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    className='chad'
                    style={{
                        fontSize:'x-large', color:'#2f4958ff'
                    }}>
                    <p style={{ textDecoration: 'underline', margin: 0 , color:'black' }}>
                        Ground-up Approach:
                    </p>
                    I approach problems and new ideas from a ground-up mindset: Breaking them
                    down into their core fundamentals and ground truth facts to ensure
                    solutions and opinions are built on a solid foundation.
                </motion.div>
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    className='chad'
                    style={{
                        fontSize:'x-large', color:'#2f5849ff'
                    }}>
                    <p style={{ textDecoration: 'underline', margin: 0 , color:'black' }}>
                        Intellectual Openness:
                    </p>
                    It is easy to get entrenched in one's own beliefs, but shielding oneself
                    from new ideas limits growth. I value genuine discussion and diverse
                    perspectives, not just for the sake of debate, but because they are
                    essential for achieving a truly well-rounded understanding of complex systems.
                </motion.div>
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    className='chad'
                    style={{
                        fontSize:'x-large', color:'#482f58ff'
                    }}>
                    <p style={{ textDecoration: 'underline', margin: 0 , color:'black'}}>
                        Prioritizing the Right Conclusion over Being Right:
                    </p>
                    Ideas and beliefs are best improved through critical analysis rather than ego.
                    There is no shame in being incorrect; There is immense value in being able
                    to admit when you are wrong. While personal bias can be difficult
                    to overcome, looking past it is essential to finding the most robust and objective solution.
                </motion.div>

                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    className='chad'
                    style={{
                        fontSize:'x-large', color:'#52582fff'
                    }}>
                    <p style={{ textDecoration: 'underline', margin: 0 , color:'black'}}>
                        Listening & learning from feedback:
                    </p>
                    Taking feedback is a practiced skill that I prioritize. Although it is a difficult thing to hear that you are wrong or doing something incorrectly,
                    listening to others provides the necessary insights for personal and professional improvement.
                </motion.div>

                <p style={{ textDecoration: 'underline', margin: 0 }}>
                    Interests & Hobbies:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                        <motion.div
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            className='chad'>
                            <p style={{ textDecoration: 'underline', margin: 0 }}>
                                Learning New Tech:
                            </p>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color2
                            }}>
                                Torrenting Protocols
                            </span>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color2
                            }}>
                                Proxmox Virtualization
                            </span>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color2
                            }}>
                                PC hardware specs
                            </span>
                        </motion.div>
                        <motion.div
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            className='chad'>
                            <p style={{ textDecoration: 'underline', margin: 0 }}>
                                Gaming:
                            </p>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color1
                            }}>
                                Deadlock
                            </span><span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color1
                            }}>
                                Deltarune
                            </span>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color1
                            }}>
                                Balatro
                            </span>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color1
                            }}>
                                Dungeons & Dragons
                            </span>
                        </motion.div>
                    </div>
                    <div>
                        <motion.div
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            className='chad'>
                            <p style={{ textDecoration: 'underline', margin: 0 }}>
                                Piano:
                            </p>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color3
                            }}>
                                Ruder Buster
                            </span>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color3
                            }}>
                                My Castle Town
                            </span>
                        </motion.div>
                        <motion.div
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            className='chad'>
                            <p style={{ textDecoration: 'underline', margin: 0 }}>
                                Scripts
                            </p>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color2
                            }}>
                                Simple Webscrapers
                            </span>
                            <span style={{
                                minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: 12, backgroundColor: color2
                            }}>
                                Silly Automation Tools
                            </span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {props.children}
        </motion.div >

    )

}