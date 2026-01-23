import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import './Projects.css'
import { useRef, useState, type ReactNode } from 'react'
const projectsStyle = {}



/**
 * 
 * Carousel Idea: cards that we can drag and throw to slide through a carousel on
 * the card itself. Cool AND interesting. Velocity and mass for speedy spring
 * click to grow? yah propbably
 * 
 * https://motion.dev/docs/react-animate-presence#changing-key
 * idea: velocity slideshow.
 * Enable drag controls or something. Track velocity. while velocity != 0, increment a value by velocity % 100.
 * Once Velocity is greater than 100, switch to the next slide. this drag is separate from the carousel,
 * 
 * once velocity is 0, that means we settled on a slide
 */





interface projectContent {
    img: string, title: ReactNode, date: ReactNode, description: ReactNode, bullets: ReactNode
}

const contentList = [
    {
        img: 'img/aye-site.png',
        title: <a target="_blank" rel="noopener noreferrer"
            href='https://a0-ye.github.io/aye-site/'> Personal Website </a>,
        date: 'just now!',
        description: <><p> This is my personal website, if its hard to tell!</p>
            <p> Main ingredients include: React, Motion.dev, and DndKit.</p>
            <p> Didn't have a lick of knowledge of vite, and little real experience with React, zero knowledge of Motion. A good hands on learning experience and had a lot of trouble / fun trying to recreate the feel of Balatro with TSX. the functionality and animations are all made by me utilizing the Motion lib combined with DndKit. I felt like I was reinventing the wheel a few times but it was a good way to apply what I've learned.</p>
        </>,
        bullets: <>
            What I learned from this:
            <li> Front end development</li>
            <li> Vite</li>
            <li> React</li>
            <li> Motion.dev (formerly Framer Motion)</li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>Single Cycle CPU + ISA</div>,
        date: 'June 2025',
        description: <>
            <div>
                My CPU from class. What was supposed to be a duo project became a solo project after my partner dropped. I had to learn how to design and simulate an 8 bit CPU,
                with an ISA. I had almost zero knowledge at the beginning. Had a lot of trouble with memory (initial and set) and the flow from power on vs entry point, but I managed by and got full marks! {"(lie.... got a B+)"}
            </div>
        </>,
        bullets: <>
            What I learned from this:
            <li> MIPS? architecture </li>
            <li> SysVerilog </li>
            <li> A better understanding of Assembly to hardware </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>Mel-Spectrogram GAN</div>,
        date: 'June 2025',
        description: <>
            <div>
                My GAN for regenerating music. The final for my machine learning class. My partner Matteo Perona and I designed a Generative Adversarial Network whose goal was to take a
                Mel-Spectrogram and attempt to regenerate it into the original audio waveform. Due to the lossy nature of FFT and the Mel scale conversion, it would be interesting if it was possible to reproduce the original
                audio from which a Mel-Spectrogram comes from!
            </div>
        </>,
        bullets: <>
            What I learned from this:
            <li> GAN Implementation </li>
            <li> ????? </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>TCP & ARP</div>,
        date: 'Winter 2025',
        description: <>
            <div>
                TCP and ARP from networking class. I had a lot of fun and pain implementing TCP with congestion control and fast retransmission. It was a real eyeopener for how the internet worked, and having hands on experience re-implementing a core protocol was very enlightnening ad well as frustrating. The same could be said for implementing ARP, since it gave me a great understanding of how devices on a local network communicated with each other.
            </div>
        </>,
        bullets: <>
            What I learned from this:
            <li> Network Stack </li>
            <li> Devices and  </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>UCSD Hard Hack 2024 2025</div>,
        date: 'two times',
        description: <div>
            UCSD Hard Hack Hackathon, 2024 and 2025. I had a lot of fun working with my friends. We didn't win but it was a great experience working with people with different specialties, combining hardware, software, and mechanical engineering.
        </div>,
        bullets: <>
            What I learned from this:
            <li> uhh</li>
            <li>   </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>Proxmox Node</div>,
        date: 'this month!',
        description: <div>My Proxmox box. I want to get into self-hosting services for myself and my friends {"(mainly game servers and shows)"}. I had some spare pc parts so I used them to make a proxmox node to host VMs for fun! Admittedly a little overkill for just a few game servers since they could all run on one linux instance but I thought it would be fun to see if I could, rather than should. Plus I plan on expanding to host other services so it worked out.</div>,
        bullets: <>
            What I learned from this:
            <li> uhh</li>
            <li>   </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>,
    },
    {
        img: 'placeholder',
        title: <div>VIA-SEEs Satellite Project</div>,
        date: 'placeholder',
        description: <div>Worked with UH Manoa VIA-SEEs satellite project. I worked as a software engineer. My main responsibility was to connect the USB interface between the science equipment and the OBC.

            Admittedly the project was not well managed.</div>,
        bullets: <>
            What I learned from this:
            <li> uhh</li>
            <li>   </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>,
    },
    {
        img: 'placeholder',
        title: <div>Horse Game Remake</div>,
        date: 'placeholder',
        description: <div>{"24 hour Horse Game Recreation attempt (was for fun)"} There was a game on twitter dot com that blew up for a while. It was some silly horse PNGs bouncing around a maze trying to win by reaching a bundle of carrots. I thought I could make it, so I made my best attempt to do so in just one day. The end result was pretty good and I had a great time learning Godot!</div>,
        bullets: <>
            <li> Godot</li>
            <li> Collisions and working with angle deflections</li>
        </>,
    },
    // {
    //     img:'placeholder'             ,
    //     title:<div></div>           ,
    //     date:'placeholder'            ,
    //     description:<div></div>     ,
    //     bullets:<>

    //             </>         ,
    // },

]
const projectCardVariants = {
    exit: {
        rotate: [0, 30, -15],
        rotateX:'90deg',
        y: [0, -500, 50],
        opacity: [1, 0.7, 0.5, 0],
        zIndex: [1, 1, 0, 0],
        // transition:{duration:2}

    },
    enter: {
        rotate: [-7, 0],
        rotateX:'0deg',
        y: [55, 0],
        opacity: [0, 1, 1],
        zIndex: 1,
        transition: { duration: 0.5 }
    },
}

/**
 * goes from closed, just the image. When clicked, half the image, grow the bottom up
 */
const projectContentVariants = {
    closed: {

    }, open: {}
}

export default function Projects() {
    const ref = useRef(null)

    const [isExpanded, setIsExpanded] = useState(false)
    const { scrollYProgress } = useScroll({ container: ref })
    const parallaxCardTracker = useTransform(scrollYProgress, [0, 1], [0, contentList.length - 1])
    const [prog, setProg] = useState(0);
    const [activeProject, setActiveProject] = useState(0)
    scrollYProgress.on('change', (latest) => { setProg(latest) })   // FOR DEBUG
    parallaxCardTracker.on('change', (latest) => { setActiveProject(Math.round(latest)) })   // FOR DEBUG

    function createProjectCard(content: projectContent, idx: number) {
        return activeProject == idx && <motion.div className="projectBox"
            key={idx}
            variants={projectCardVariants}
            initial='exit'
            animate={'enter'}
            exit={'exit'}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}

            style={{
                opacity: activeProject == idx ? 1 : 0,
                transformOrigin:'100% 50%'
            }}
        >
            <div id='projectContentWrap'
                style={{
                    backgroundImage: `url(${content.img})`,
                    margin:'1%',
                    borderRadius:2
                }}
            >
                <motion.div className='project-bot'
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                        display: 'flex', position: 'relative'

                    }}
                >
                    <motion.div className='project-banner'
                        style={{ position: 'absolute', bottom: '0%', left: '2%' }}
                        initial={{ y: 300 }}
                        animate={{ y: 0 }}
                    // transition={{ delay: 0.8 }}
                    >{content.title}
                    </motion.div>
                    <motion.div className='project-banner'
                        style={{ position: 'absolute', bottom: '0%', right: '2%' }}
                        initial={{ y: 300 }}
                        animate={{ y: 0 }}
                    // transition={{ delay: 0.8 }}
                    > {content.date} </motion.div>
                    <motion.div className='project-description'
                        onClick={() => { setIsExpanded(!isExpanded) }}
                        layout
                        // style={{ flex: isExpanded ? '1 0 100%' : '1'}}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={isExpanded ? { fontSize: 'large' } : { fontSize: 'x-large', WebkitMaskImage: 'linear-gradient(180deg,#000 60%,transparent)', cursor: 'pointer' }}
                    >
                        {content.description}

                    </motion.div>
                    <AnimatePresence mode='popLayout'>
                        {!isExpanded &&
                            <motion.div className='project-bullets'
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {content.bullets}
                            </motion.div>}
                    </AnimatePresence>

                </motion.div>
            </div>
        </motion.div>
    }
    return (
        <div ref={ref} id='proj-main' style={projectsStyle}>
            <div style={{
                position: 'sticky',
                top: 0,
                // left:'0%',
                height: '100vh',
                width: '100%',
                zIndex: 1,
                marginBottom: '-100vh',
                // overflow: 'hidden'
            }}>

                <div id='debug' style={{ position: 'absolute', backgroundColor: '#00c3ffff', height: 50, zIndex: 10 }}>
                    {prog} and {activeProject}
                    <h2>
                        DEBUG: scroll to flip through cards
                    </h2>

                </div>
                <AnimatePresence>
                    {contentList.map((val, idx) => { return createProjectCard(val, idx); })}
                </AnimatePresence>
                <motion.div className='projectBox' style={{
                    width: '100%',
                    y: 50,
                    // scale:1.,
                    rotate: -5
                }}></motion.div>
                <motion.div className='projectBox' style={{
                    width: '100%',
                    y: 55,
                    // scale:1.,
                    rotate: -7
                }}></motion.div>
                <motion.div id='scrollprog' style={{
                    scaleY: scrollYProgress,
                    position: 'absolute', right: 0,
                    height: '100vh', width: 10,
                    backgroundColor: '#ff7b00ff',
                }} />

            </div>
            <div id='ghost-scroller' style={{
                position: 'absolute', top: 0,
                height: `${25 * contentList.length}vh`,
                width: '100%', zIndex: 0
            }}>
                {/* {contentList.map((_, idx) => {
                    return <div key={idx} className='scroll-anchor' style={{
                        border: 'solid black 2px',
                        backgroundColor: idx % 2 ? '#643838ff' : '#29586bff'
                    }}> </div>
                })} */}
            </div>
        </div >
    )
}