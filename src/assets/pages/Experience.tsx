
import { motion } from 'motion/react'
import './Experience.css'
import { makeChad } from './AboutMe'
import StickyNote from '../components/StickyNote/StickyNote'
import PopupPanel from '../components/popup-panel/PopupPanel'
import { useState } from 'react'

interface ExperienceProps {
    none?: string
}

function thumbtack(color?: string) {

    return <>
        <div style={{
            backgroundColor: '#64646488',
            width: 13, height: 13, borderRadius: 30, transformOrigin: '50% 50%',
            position: 'absolute', left: '50%', top: '0%',
        }}>
            <div style={{
                backgroundColor: color ? color : '#5a5548ff',
                width: 10, height: 10, borderRadius: 30, transformOrigin: '50% 50%',
                position: 'absolute', left: '0%', top: '0%',
            }} >

            </div>

        </div >
    </>
}

export default function Experience(props: ExperienceProps) {
    props
    const [showContactMe, setShowContactMe] = useState(false);
    const color1 = '#a7d4ffff'
    const color2 = '#dcff9cff'
    const color3 = '#fdb7ffff'
    const COURSES = [
        ["Computer Organization & Systems Programming", 'Wtr'],
        ["Operating Systems", 'Wtr'],
        ["Computer Architecture", 'Spr'],
        ["Computer Security", 'Fal'],
        ["Design & Analysis of Algorithms", 'Fal'],
        ["Database Principles", 'Wtr'],
        ["Machine Learning: Learning Algorithms", 'Wtr'],
        ["Computational Theory", 'Spr'],
        ["Advanced Data Structures", 'Spr'],
        ["Software Engineering", 'Fal'],
        ["Software Engineering II", 'Spr'],
        ["Interaction Design", 'Wtr'],
        ["Computer Networks", 'Fal'],
        ["Working with Large Codebases", 'Spr'],
    ];

    return <div id="exp-main">
        <div id="corkboard-frame" style={{
            border: 'solid grey 2em',
            boxShadow: '#000000ff 5px 5px 15px,inset 5px 5px 15px rgba(0,0,0,0.3),inset -2px -2px 10px rgba(0, 0, 0, 0.43)',
            borderRadius: '3px',
            backgroundColor: '#dfd180ff',
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 100%), linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,0.05) 25%, transparent 25%)",
            backgroundSize: ' 15px 15px', /* Tiny size creates the "grain" look */
            // backgroundImage: `url(img/corkboard.png)`, backgroundRepeat: 'true',
            width: 'auto',
            height: 'auto',
            display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center',
        }}>
            <motion.div className='ticket-header'
                style={{ fontSize: '3em', padding: '.15em 1em .15em 1em', }}
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75, duration: 0.5 }}
            >
                Experience
            </motion.div>

            <div id='2col-flex' style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                <div id='left-flex'
                    style={{
                        display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center',
                        minWidth: '50%',

                    }}>
                    <motion.div className='padded-chad-box' style={{
                        x: '-10%',
                        display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center',

                        position: 'relative',
                        backgroundColor: 'rgba(67, 116, 95, 1)',
                        minHeight: 'none',
                        height: 'min-content',
                        width: 'auto',
                        // marginLeft:'1em'
                        // minWidth: '350px',
                    }}
                        initial={{ opacity: 0, scale: 1.3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.2 }}
                    >
                        {thumbtack()}
                        <div style={{ backgroundColor: '#629c75ff', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{
                                textDecoration: 'underline', margin: 0, fontSize: '2em',
                                paddingLeft: '1em',
                                paddingRight: '1em'
                            }}>
                                Technical Experience & Project Highlights:
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: '#e2e7f0ff', border: 'dashed 2px grey', borderRadius: 15, padding: '2em',
                            position: 'relative', alignSelf: 'center',
                            display: 'flex',
                            minHeight: 575,
                            minWidth: 430,
                        }}>
                            <div className='stickyWrap' style={{
                                left: '10%', top: '5%', rotate: '2deg'
                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }} noteStyle={{ maxWidth: '220px' }}> Software Engineering Intern @ UH Manoa: Developed AvaSpec bridge for the VIA-SEEs Satellite Project </StickyNote>
                            </div>
                            <div className='stickyWrap' style={{
                                right: '5%', top: '10%', rotate: '-5deg'
                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }}> Designed a Single-Cycle CPU and custom ISA using SystemVerilog </StickyNote>
                            </div>
                            <div className='stickyWrap' style={{
                                left: '10%', top: '40%', rotate: '-2deg'

                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }}> Developer for React Based Narrative Game Engine </StickyNote>
                            </div>
                            <div className='stickyWrap' style={{
                                right: '10%', top: '40%', rotate: '5deg'

                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }}> Reconstructive GAN (Generative Adversarial Network) from Mel-Spectrogram to .wav </StickyNote>
                            </div>

                            <div className='stickyWrap' style={{
                                right: '10%', top: '70%', rotate: '-4deg'

                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }}> Web Developer Lead for USC Student Newsletter </StickyNote>
                            </div>

                            <div className='stickyWrap' style={{
                                left: '10%', top: '65%', rotate: '4deg'

                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }}> Designed and Implemented a Minimap extension for Python's IDLE IDE</StickyNote>
                            </div>
                            <div style={{ color: 'black', position: 'absolute', bottom: 0 }}> See details and more projects using the Projects Card!</div>

                        </div>
                    </motion.div>
                    <motion.div className='padded-chad-box'
                        style={{ x: '5%', position: 'relative' }}  // offset using marginLeft
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        {thumbtack()}
                        <h2 style={{ textDecoration: 'underline', margin: 0 }}>
                            Tech Deck: </h2>
                        <div> What I know how to use!</div>
                        {makeChad('Languages & Packages', ['Python', 'Javascript', 'Typescript', 'Java', 'C/C++', 'C#', 'Markdown', 'SQLite'], false, color1)}
                        {makeChad('Frontend & Design', ['React', 'CSS3', 'Framer Motion',], false, color2)}
                        {makeChad('Tools & DevOps', ['Git/GitHub', 'Github Actions', 'Atlassian Jira', 'Linux/Unix (Ubuntu/Debian)', 'Bash', 'systemd.service', 'Docker', 'Proxmox'], false, color3)}
                        {makeChad('Hardware & Systems', ['SystemVerilog', 'Assembly', 'RISC-V Architecture', 'OS Architecture & Scheduling'], false, color1)}
                        {makeChad('Advanced Debugging', ['GDB', 'Valgrind', 'Chrome/Firefox DevTools', 'PDB', 'Memory Management'], false, color2)}
                        {makeChad('Data Processing', ['NumPy', 'Pandas', 'MATLAB', 'Librosa', 'PyTorch'], false, color3)}

                    </motion.div>
                </div>
                <div id='right-flex'
                    style={{ display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center', }}>

                    <motion.div className='padded-chad-box'
                        style={{
                            // x: '5%',
                            position: 'relative',
                            backgroundColor: '#a2c9b5ff',
                            marginTop: '3em',
                            minWidth: 382
                        }}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    // transition={{ delay: 0.1 }}
                    >
                        {thumbtack()}
                        <div id='header' style={{
                            display: 'grid', gridTemplateColumns: '2fr 1fr',
                            borderBottom: 'solid 2px #474747ff',
                            position: 'relative'
                        }}>
                            <div style={{
                                fontSize: '3em',
                                // margin:'1em 0 1em 0',
                                borderRight: 'solid 2px #474747ff',
                            }}> Report Card </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left', marginLeft: '1em', minWidth: '113px' }}>
                                <div> First Name: Adrian</div>
                                <div> Last Name: Ye </div>
                            </div>
                        </div>
                        <div style={{ textDecoration: 'underline', fontSize: 'x-large' }}> Education & Academic Excellence:</div>
                        <div className='course-box'
                            style={{ border: 'none', backgroundColor: 'transparent' }}
                        >
                            <div><span>Degree:</span><br /> GPA: <br /> Awards: </div> <div style={{ textAlign: 'left' }}> 
                                <span style={{backgroundColor:'#fffb0a86',padding:'0.1em'}}>B.S. in Computer Science & Engineering</span> <br /> 3.65 <br /> 9x UCSD Provost Honors
                                </div>
                        </div>
                        <div style={{
                            borderTop: 'solid 2px #474747ff',

                        }}> Relevant Coursework
                            {COURSES.map((course, idx) => {
                                return <>
                                    <div key={idx}
                                        className='course-box'
                                        style={idx == COURSES.length - 1 ? {} : { borderBottom: 'none' }}
                                    >
                                        {course[0]}
                                        <div style={{
                                            // textAlign: 'right',
                                            // borderLeft: 'solid 2px #474747ff', paddingLeft: '.25em'
                                        }}
                                        >
                                            {course[1]}</div>
                                    </div>
                                </>
                            })}
                        </div>

                    </motion.div>

                    <motion.div className='gridpaper' style={{
                        x: 70,
                        position: 'relative',
                        minHeight: 400,
                        width: 300,
                        display: 'flex', flexDirection: 'column', gap: '1em', alignItems: 'center',
                        boxShadow: '#0000005d 5px 5px 5px'
                    }}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        {thumbtack()}
                        Check out my resume here. Serious Business Below!
                        <motion.button style={{
                            width: '70%', height: '100%', rotate: 0,
                        }}
                            whileHover={{
                                scale: 1.1,
                                rotate: ['-3deg', '3deg', '0deg']
                            }}
                            onClick={() => window.open('pdf/aye-resume.pdf', '_blank')}
                        > View Resume In New Tab</motion.button>

                        {/* <motion.button style={{
                            width: '70%', height: '40%', rotate: 0,
                        }}
                            whileHover={{
                                scale: 1.1,
                                rotate: ['-3deg', '3deg', '0deg']
                            }}
                            onClick={()=>setShowContactMe(true)}
                        > Contact Me </motion.button> */}
                    </motion.div>

                    { showContactMe && <PopupPanel setFunction={setShowContactMe}>
                        <div> Hello this is the Contact Me panel. Put a form here to shoot an email to adrian4085@gmail.com {showContactMe}</div>
                    </PopupPanel>}
                </div>




            </div>







        </div>


    </div >


}