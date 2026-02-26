
import { motion } from 'motion/react'
import './Experience.css'
import { makeChad } from './AboutMe'
import StickyNote from '../components/StickyNote/StickyNote'

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

    // const color1 = '#ffa7a7ff'
    // const color2 = '#dcff9cff'
    // const color3 = '#fdb7ffff'
    // const color4 = '#b8b7ffff'
    // const color5 = 'rgba(183, 255, 195, 1)'
    // const color6 = '#b7ffe1ff'
    props
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
            backgroundColor: '#dfd180ff',
            // backgroundImage: `url(img/corkboard.png)`, backgroundRepeat: 'true',
            width: 'auto',
            height: 'auto',
            display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center',
        }}>
            <div className='ticket-header' style={{ fontSize:'3em', padding: '.15em 1em .15em 1em',}}>
               Experience
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                <div style={{
                    display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center',
                    minWidth: '50%',

                }}>
                    <motion.div className='padded-chad-box' style={{
                        x: '-5%',
                        display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center',

                        position: 'relative',
                        backgroundColor: 'rgba(67, 116, 95, 1)',
                        minHeight: 'none',
                        height: 'min-content',
                        width: 'auto',
                        // marginLeft:'1em'
                        // minWidth: '350px',
                    }}>
                        {thumbtack()}
                        <div style={{ backgroundColor: '#629c75ff', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ textDecoration: 'underline', margin: 0, fontSize: '2.5em' }}>
                                Technical Experience & Project Highlights:
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: '#e2e7f0ff', border: 'dashed 2px grey', borderRadius: 15, padding: '2em',
                            position: 'relative', alignSelf: 'center',
                            display: 'flex',
                            minHeight: 375,
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
                                <StickyNote tapeStyle={{ opacity: 0 }}> Architected a Single-Cycle CPU and custom ISA using SystemVerilog </StickyNote>
                            </div>
                            <div className='stickyWrap' style={{
                                left: '10%', top: '65%', rotate: '-2deg'

                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }}> React Based Narritive Game Engine </StickyNote>
                            </div>
                            <div className='stickyWrap' style={{
                                right: '10%', top: '50%', rotate: '5deg'

                            }}>
                                <StickyNote tapeStyle={{ opacity: 0 }}> Machine Learning and Data Processing with specialty in Audio </StickyNote>
                            </div>
                            <div style={{ color: 'black', position:'absolute', bottom:0 }}> See details and more projects using the Projects Card!</div>

                        </div>
                    </motion.div>
                    <motion.div className='padded-chad-box'
                        style={{ x: '5%', position: 'relative' }}  // offset using marginLeft
                        initial={{ opacity: 0, y: '30%' }}
                        layout
                        whileInView={{ opacity: 1, y: '0%' }}
                        viewport={{ once: true }}
                    // transition={{ delay: 0.1 }}
                    >
                        {thumbtack()}
                        <h2 style={{ textDecoration: 'underline', margin: 0 }}>
                            Tech Deck: </h2>
                        <div> What I know how to use!</div>
                        {makeChad('Languages & Packages', ['Python', 'Javascript', 'Typescript', 'Java', 'C/C++', 'C#', 'Markdown', 'SQLite'])}
                        {makeChad('Frontend & Design', ['React', 'CSS3', 'Framer Motion',])}
                        {makeChad('Tools & DevOps', ['Git/GitHub', 'Github Actions', 'Linux/Unix (Ubuntu/Debian)', 'Bash', 'systemd.service', 'Docker', 'Proxmox'])}
                        {makeChad('Hardware & Systems', ['SystemVerilog', 'Assembly', 'RISC-V Architecture', 'OS Architecture & Scheduling'])}
                        {makeChad('Advanced Debugging', ['GDB', 'Valgrind', 'Chrome/Firefox DevTools', 'PDB', 'Memory Management'])}
                        {makeChad('Data Processing', ['NumPy', 'Pandas', 'MATLAB', 'Librosa', 'PyTorch'])}

                    </motion.div>
                </div>
                <div style={{ display: 'flex', gap: '2em', flexDirection: 'column', alignItems: 'center', }}>

                    <motion.div className='padded-chad-box'
                        style={{
                            // x: '5%',
                            position: 'relative',
                            backgroundColor: '#a2c9b5ff',
                            marginTop: '3em',
                            minWidth: 382
                        }}
                        initial={{ opacity: 0, y: '30%' }}
                        layout
                        whileInView={{ opacity: 1, y: '0%' }}
                        viewport={{ once: true }}
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
                            <div>Degree: <br /> GPA: <br /> Awards: </div> <div style={{ textAlign: 'left' }}> B.S. in Computer Science & Engineering <br /> 3.65 <br /> 9x UCSD Provost Honors</div>
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
                        x:70,
                        position:'relative',
                        minHeight:400,
                        width:300,
                        display:'flex', flexDirection:'column', gap:'1em',
                    }}>
                        {thumbtack()}
                        Formal Resume Documents. Serious Business!
                        <button> In-browser Resume</button>
                        <button> Transcript or similar</button>
                    </motion.div>
                </div>




            </div>







        </div>


    </div >


}