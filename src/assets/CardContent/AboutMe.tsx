import type { ReactNode } from 'react'
import './AboutMe.css'
import { motion } from 'motion/react';
import MotionCard from '../components/DraggableCardKit/MotionCard';
import { BLANK_CARD_DATA } from '../components/DraggableCardKit/CardKitFunctions';
import StickyNote from '../StickyNote/StickyNote';
// import { div } from 'motion/react-client';


// more professional. More consice / straight to the point

interface AboutMeProps {
    children?: ReactNode;
    currSettings: { beSerious: boolean };
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
const color1 = '#ffa7a7ff'
const color2 = '#dcff9cff'
const color3 = '#fdb7ffff'
const randomColor = () => {
    const value = Math.random()
    if (value <= 0.333) return color1
    if (value >= 0.666) return color2
    return color3
}

function makeChad(label: string, contents: string[], newlineFlag?: boolean) {

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
                    borderRadius: 12, backgroundColor: 'color-mix(in srgb, #ebfffcff, ' + randomColor() + ' 20% )'
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
                    <button onClick={() => { alert('oops this isnt done yet... sorry') }}> resume download button </button>


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
                                                cardData={BLANK_CARD_DATA}
                                                cardContent={{ cardBack: 'img/gradsmile.jpg' }}
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
                            style={{ position: 'absolute', width: '100%', height: '100%', rotate: '-6deg', }}
                            initial={{ y: '-90%' }}
                            animate={{ y: '-10%' }}
                            transition={{ delay: 1.2 }}
                        >
                        <p>Software Developer with a BS Computer Science & Engineering from UC San Diego.</p>
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
            <motion.div className='tri-grid' style={{ paddingLeft: '5%', paddingRight: '5%' }}
                initial={{ opacity: 0, y: '30%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ delay: 1 }}
            >
                <motion.div className='padded-chad-box'
                    initial={{ opacity: 0, y: '30%' }}
                    whileInView={{ opacity: 1, y: '0%' }}
                    // transition={{ delay: 0.1 }}
                >
                    <p style={{ textDecoration: 'underline', margin: 0 }}>
                        Tech Deck [Use Card Carousel]:
                    </p>
                    {makeChad('Languages & Packages', ['Python', 'Javascript', 'Typescript', 'Java', 'C/C++', 'C#', 'MATLAB', 'Markdown', 'SQLite'])}
                    {makeChad('Frontend & Design', ['React', 'CSS3', 'Framer Motion', 'Responsive UI'])}
                    {makeChad('Tools & DevOps', ['Git/GitHub', 'Github Actions', 'Linux/Unix (Ubuntu/Debian)', 'Bash', 'systemd.service'])}
                    {makeChad('Hardware & Systems', ['SystemVerilog', 'Assembly', 'RISC-V Architecture', 'OS Architecture & Scheduling'])}
                    {makeChad('Advanced Debugging', ['GDB', 'Valgrind', 'Chrome/Firefox DevTools', 'PDB', 'Memory Management'])}
                    {makeChad('Specialized', ['NumPy', 'Pandas', 'Librosa', 'PyTorch'])}

                </motion.div>

                <motion.div className='padded-chad-box'
                    initial={{ opacity: 0, y: '30%' }}
                    whileInView={{ opacity: 1, y: '0%' }}
                    transition={{ delay: 0.2 }}
                >
                    <p style={{ textDecoration: 'underline', margin: 0 }}>
                        Values:
                    </p>

                    <motion.div
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        className='chad'>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Challenging ideas and having my ideas challenged:
                        </p>
                        I believe ideas and belief are best improved through critical analysis. It is important to look past personal bias to find
                        the most robust solution.
                    </motion.div>
                    <motion.div
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        className='chad'>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Intellectual Openness:
                        </p>
                        It's easy to get entrenched in one's own beliefs. I value genuine discussions and new perspectives,
                        as they are essential for a well rounded understanding!
                    </motion.div>
                    <motion.div
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        className='chad'>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Listening & learning from feedback:
                        </p>
                        Taking feedback is a practiced skill that I prioritize. While it's sometimes difficult,
                        listening to others provides the necessary insights for personal and professional improvement.
                    </motion.div>
                    <motion.div
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        className='chad'>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Having in-depth discussions of new and innovative topics:
                        </p>
                        I love diving deep into the 'how' and 'why' of emerging tech or unconventional ideas.
                        Nothing beats sharing a conversation that gets down to the minute and specific details
                        of a complex concept.
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
                                    borderRadius: 12, backgroundColor: color2
                                }}>
                                    MHGU
                                </span><span style={{
                                    minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 12, backgroundColor: color2
                                }}>
                                    Deltarune
                                </span>
                                <span style={{
                                    minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 12, backgroundColor: color2
                                }}>
                                    Balatro
                                </span>
                                <span style={{
                                    minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 12, backgroundColor: color2
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
                                    borderRadius: 12, backgroundColor: color2
                                }}>
                                    Ruder Buster
                                </span>
                                <span style={{
                                    minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 12, backgroundColor: color2
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
                <motion.div className='padded-chad-box'
                    initial={{ opacity: 0, y: '30%' }}
                    whileInView={{ opacity: 1, y: '0%' }}
                    transition={{ delay: 0.3 }}
                // style={{ display: 'grid', gridTemplateRows: ' 1.5em 1fr 1fr' }}
                >
                    <p style={{ textDecoration: 'underline', margin: 0 }}>
                        My Foundation:
                    </p>
                    {makeChad('Education & Academic Excellence:', ['B.S. in Computer Science & Engineering', 'GPA: 3.65', '9x UCSD Provost Honors Recipient'], true)}
                    {makeChad('Technical Experience & Project Highlights:', ['Software Engineering Intern @ UH Manoa: Developed AvaSpec bridge for the VIA-SEEs Satellite Project',
                        'Architected a Single-Cycle CPU and custom ISA using SystemVerilog',
                        'Machine Learning and Data Processing w/ specialty in audio',
                    ], true)}
                    <motion.div
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        className='chad'>
                        <p style={{ textDecoration: 'underline', margin: 0 }}>
                            Relevant Coursework:
                        </p>

                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color1
                        }}>
                            Computer Organization & Systems Programming
                        </span>

                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color1
                        }}>
                            Operating Systems
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color1
                        }}>
                            Computer Architecture
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color1
                        }}>
                            Computer Security
                        </span>

                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color2
                        }}>
                            Design & Analysis of Algorithms
                        </span>

                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color2
                        }}>
                            Database Principles
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color2
                        }}>
                            Machine Learning: Learning Algorithms
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color2
                        }}>
                            Computational Theory
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color2
                        }}>
                            Advanced Data Structures
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color3
                        }}>
                            Software Engineering
                        </span>

                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color3
                        }}>
                            Interaction Design
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color3
                        }}>
                            Computer Networks
                        </span>
                        <span style={{
                            minWidth: 30, margin: 6, padding: '0.25em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12, backgroundColor: color3
                        }}>
                            Working with Large Codebases
                        </span>
                    </motion.div>

                    {/* {makeChad('Relevant Coursework', ['Systems & Architecture:', '', '', '', '', '', '', '', ''])} */}
                    <ul style={{ textAlign: 'left' }}>
                        <li>See more using the Projects Card at the top!</li>
                    </ul>

                </motion.div>

            </motion.div>
            {props.children}
        </motion.div >

    )

}