import { motion } from 'motion/react'
import './Projects.css'
import { useId, useRef, useState, type ReactNode } from 'react'
// import ProjectCard, { type projectContent } from '../components/ProjectCard/ProjectCard'
import MotionCard from '../components/DraggableCardKit/MotionCard'
import { BLANK_CARD_DATA, type CardData } from '../components/DraggableCardKit/CardKitFunctions'

import StickyNote from '../components/StickyNote/StickyNote'


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


function makeCardContent(name: string, date: string, description: ReactNode, img: string) {
    return <motion.div className="projectBox"
        style={{
            backgroundColor: '#151420ff',
            // backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
            borderRadius: 5,
        }}
    >
        <div style={{
            backgroundColor: '#ffae6346', position: 'relative',
            backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
            width: '100%', height: '35%'
        }}>
            <motion.div className='project-banner'
                style={{ position: 'absolute', bottom: '0%', left: '2%' }}
                initial={{ y: 300 }}
                animate={{ y: 0 }}
            // transition={{ delay: 0.8 }}
            >{name}</motion.div>
            <motion.div className='project-banner'
                style={{ position: 'absolute', bottom: '0%', right: '2%' }}
                initial={{ y: 300 }}
                animate={{ y: 0 }}
            // transition={{ delay: 0.8 }}
            > {date} </motion.div>
        </div>
        <div id='proj-desc-container'
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#3f3f3fff',
                // width: '100%', 
                height: '65%',
                fontSize: 'x-large', textAlign: 'center',
                padding: '5px',
                borderRadius: 5,

            }}>
            <div
                style={{
                    backgroundColor: '#292929ff',
                    borderRadius: 5,
                    margin: 25,
                    padding: 5,
                }}
            >
                {description}
            </div>
        </div>


    </motion.div>
}

interface ProjectsProps {
    doMovingBackground?: boolean
}

export default function Projects(props: ProjectsProps) {
    props
    const [activeCard, setActiveCard] = useState<CardData>(BLANK_CARD_DATA)
    const targetCenteringRef = useRef<HTMLDivElement>(null)
    // const { scrollYProgress } = useScroll({ container: mainRef })
    // const parallaxCardTracker = useTransform(scrollYProgress, [0, 1], [0, contentList.length - 1])
    // const [prog, setProg] = useState(0);
    // const [activeProject, setActiveProject] = useState(-1)

    const card1Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Personal Website', cardBack: 'img/sprout-token2.png',
            content: makeCardContent('This Website', '2026',
                <><div > This is my personal website, if its hard to tell!</div>
                    <p> Main ingredients include: React, Motion.dev, and DndKit.</p>
                    {/* <p> Didn't have any knowledge of vite, and little real experience with React, zero knowledge of Motion.
                        As a project, it was a perfect hands on learning experience. I had a lot of trouble/fun trying to recreate the feel of Balatro cards with the tools I was using.
                        The functionality and animations are all made by me utilizing the Motion lib combined with DndKit. I felt like I was reinventing the wheel a few times but it was a good way to apply what I've learned before
                        diving into solutions made by other people.</p> */}
                    <p> Made with no knowledge of vite and Motion, and a little experience with React making a perfect hands on learning experience.
                        The functionality and animations are all made by me utilizing the Motion lib combined with DndKit.
                        Recreating the feel of Balatro cards was a fun and interesting challenge.
                    </p>
                </>,
                'img/projects/proj-aye-site.png')
        }
    }
    const card2Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Single Cycle CPU + ISA', cardBack: 'img/projects/cpuCard.png', content: makeCardContent(
                'Single Cycle CPU + ISA', 'June 2025', <>
                {/* https://github.com/a0-ye/ittybittyriscSOLO */}
                <div>
                    My CPU from class. What was supposed to be a duo project became a solo project after my partner dropped. I had to learn how to design and simulate an 8 bit CPU,
                    with an ISA. I had almost zero knowledge at the beginning. Had a lot of trouble with memory (initial and set) and the flow from power on vs entry point, but I managed by and got full marks! {"(lie.... got a B+)"}
                </div>
            </>,
                'img/projects/cpu.png')
        }
    }
    const card3Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Machine Learning GAN', cardBack: 'img/projects/melganCard.png', content: makeCardContent(
                'Mel-Spectrogram GAN', 'June 2025',
                <>
                    <div>
                        My GAN for regenerating music. The final for my machine learning class. My partner Matteo Perona and I designed a Generative Adversarial Network whose goal was to take a
                        Mel-Spectrogram and attempt to regenerate it into the original audio waveform. Due to the lossy nature of FFT and the Mel scale conversion, it would be interesting if it was possible to reproduce the original
                        audio from which a Mel-Spectrogram comes from!

                        <a href='workbook.html'
                            target="_blank"
                            rel="noopener noreferrer"
                        > Click here to see the final writeup!</a>
                    </div>
                </>,
                'img/projects/melgan.png'

            )
        }
    }
    const card4Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'TCP & ARP', cardBack: 'img/projects/networksCard.png', content: makeCardContent(
                'TCP & ARP Implementations', 'Winter 2025',
                <>
                    <div>
                        TCP and ARP from networking class. I had a lot of fun and pain implementing TCP with congestion control and fast retransmission. It was a real eye-opener for how the internet worked, and having hands on experience re-implementing a core protocol was very enlightening ad well as frustrating. The same could be said for implementing ARP, since it gave me a great understanding of how devices on a local network communicated with each other.
                    </div>
                </>,
                'img/projects/network.png'
            )
        }
    }
    const card5Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'HARD Hack', cardBack: 'img/projects/hardhackCard.png', content: makeCardContent(
                'UCSD HARD Hack 2024 2025', '2024 & 2025',
                <div>
                    UCSD Hard Hack Hackathon, 2024 and 2025. I had a lot of fun working with my friends. We didn't win but it was a great experience working with people with different specialties, combining hardware, software, and mechanical engineering.

                    <a href='https://github.com/a0-ye/HardHack24'
                        target="_blank"
                        rel="noopener noreferrer"
                    > 2024</a>
                    <a href='https://devpost.com/software/pantry-pal-2-0'
                        target="_blank"
                        rel="noopener noreferrer"
                    > 2025</a>

                </div>,
                'img/projects/hardhack.png'
            )
        }
    }
    const card6Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Proxmox', cardBack: 'img/projects/proxmoxCard.png', content: makeCardContent(
                'Proxmox Node', 'this month!',
                <>
                    <div>My Proxmox box. I want to get into self-hosting services for myself and my friends {"(mainly game servers and shows)"}. I had some spare pc parts so I used them to make a proxmox node to host VMs for fun! Admittedly a little overkill for just a few game servers since they could all run on one linux instance but I thought it would be fun to see if I could, rather than should. Plus I plan on expanding to host other services so it worked out.</div>
                </>,
                'img/projects/prox.png'
            )
        }
    }
    const card7Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'VIA-SEEs', cardBack: 'img/projects/viaseesCard.png', content: makeCardContent(
                'VIA-SEEs Satellite Project', '2024 - 2025',
                <>
                    <div>Worked with UH Manoa VIA-SEEs satellite project. I worked as a software engineer. My main responsibility was to connect the USB interface between the science equipment and the OBC.
                        Admittedly the project was not well managed.</div>
                </>,
                'img/projects/viasees.png'
            )
        }
    }
    const card8Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Horse Game Remake', cardBack: 'img/projects/horsecard2.png', content: makeCardContent(
                'Horse Game Remake', '2024',
                <>
                    <div>{"24 hour Horse Game Recreation attempt (was for fun)"} There was a game on twitter dot com that blew up for a while. It was some silly horse PNGs bouncing around a maze trying to win by reaching a bundle of carrots. I thought I could make it, so I made my best attempt to do so in just one day. The end result was pretty good and I had a great time learning Godot!</div>
                </>,
                'img/projects/horse.png'
            )
        }
    }
    const card9Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: "The Field Collector's Guide", cardBack: 'img/michel.png', content: makeCardContent(
                "The Field Collector's Guide", '2026',
                <>
                    <div>
                        A text game made with react. I made a narrative game engine in the style of Twine for my friend's narrative project. I made a lot of tools for non-technical people to be able to write stories, so its easilly expandable and usable by all!
                    </div>
                </>,
                'fakepath'
            )
        }
    }
    const card10Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: "The Burkean Parlor", cardBack: 'img/michel.png', content: makeCardContent(
                "The Burkean Parlor", '2026',
                <>
                    <div>
                        A literary magazine website run by USC students. I was reached out to by a friend to see if I was interested in making a website, and I thought it was a good opportunity to use my skills I've developed to help out others.
                    </div>
                </>,
                'fakepath'
            )
        }
    }

    function makeProjectCard(cardData: CardData) {

        return <motion.div
        >
            <MotionCard
                cardData={cardData}
                setActiveCard={setActiveCard}
                activeCard={activeCard.id}
                centeringTargetRef={targetCenteringRef}
                showContentOnActivate
                style={{
                    // make this the size of the image somehow?
                    width: '100%',
                    height: '100%',
                }}
                onClick={() => {
                    setActiveCard((currentActiveCard) => {
                        const result = (currentActiveCard.id == cardData.id)
                        console.log('click detected! ', currentActiveCard.id, card1Dat.id, result);
                        if (result) { return BLANK_CARD_DATA }
                        else return cardData
                    });

                }}
            >

            </MotionCard>
        </motion.div>
    }


    return (
        <div id='proj-main' ref={targetCenteringRef} style={{
            padding: '5em',
        }}>
            <div id='book' style={{
                position: 'relative',
                display: 'flex', height: 'min-content', gap: '2em', padding: '3em',
                backgroundColor: '#2e1c07ff', borderRadius: '5px',
                zIndex: 3,

            }}>
                <motion.div id="overview-page" className='gridpaper'
                    style={{
                    }}
                >
                    {/* Spiral Coil Container */}
                    <div className='spiral' style={{
                        right: 10
                    }} />
                    {/* Three Hole Punches */}
                    <div className='holepunch' style={{
                        right: '35px',
                        padding: '20px 0'

                    }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: '#333', // This should match the background behind the paper
                                borderRadius: '50%',
                                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.5)'
                            }} />
                        ))}
                    </div>
                    <div id='pagecontent'
                        style={{ marginLeft: '20px', paddingRight: '60px', position: 'relative', zIndex: 1 }}>
                        <h2 style={{
                            fontSize: 'xx-large',
                            color: '#333',
                            borderBottom: '2px solid rgba(0, 0, 0, 0.64)',

                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                            Projects Overview
                        </h2>
                        <p style={{ fontSize: 'medium', borderBottom: '2px solid rgba(0,0,0,0.1)', }}>
                            These are some of my projects I want to showcase. Theres more in the works, so expect to see them in the near future!
                        </p>
                        <div style={{ fontSize: 'medium', }}>
                            Im currently working on a <span style={{ fontWeight: 'bold', borderBottom: '2px solid #353535ff' }}> lightweight narrative game engine </span> entirely in React,
                            and a website for a USC student newsletter called <span style={{ fontWeight: 'bold', borderBottom: '2px solid #353535ff' }}> The Burkean Parlor </span>.
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                            <p> The Field Collector's Guide </p>
                            <div className='progress-bar-outer'>
                                <motion.div className='progress-bar-inner'
                                    style={{
                                        width: '50%',
                                        backgroundColor: '#abff84ff'
                                    }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '50%' }}
                                    transition={{ delay: 0.5, duration: 2 }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                            <p>The Burkean Parlor Website </p>
                            <div className='progress-bar-outer'>
                                <motion.div className='progress-bar-inner'
                                    style={{
                                        width: '20%',
                                        backgroundColor: '#ffe284ff'
                                    }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '20%' }}
                                    transition={{ delay: 0.5, duration: 2 }}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '40px'
                        }}>

                            {/* Left Column: Tech & Specs */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#d9534f', textDecoration: 'underline' }}>
                                    Current Project Specs
                                </h3>
                                <div style={{ marginTop: '10px', lineHeight: '1.6' }}>
                                    <strong>Technologies:</strong>
                                    <p style={{ color: '#555', fontSize: '0.9rem' }}>React, Framer Motion, Python</p>

                                    <strong>Domain:</strong>
                                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Frontend Architecture</p>

                                    <strong>Resources:</strong>
                                    <p style={{ color: '#555', fontSize: '0.9rem' }}>GitHub Docs, MDN Web Docs, Motion.dev Docs</p>
                                </div>
                            </div>
                            <div id='dividerline' style={{
                                width: '1px',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                alignSelf: 'stretch'
                            }} />

                            <div style={{ flex: 1.5 }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#428bca', textDecoration: 'underline' }}>
                                    Developer Comments
                                </h3>
                                <p style={{
                                    marginTop: '10px',
                                    color: '#444',
                                    fontStyle: 'italic',
                                    lineHeight: '1.5',
                                    fontSize: '0.95rem'
                                }}>
                                    I'm currently researching methods to convert Docx / XML to my engine's JSX so that users
                                    can write and format in docx and import files directly hassle free.
                                    My main task is writing a parser that is capable of properly recognize and convert DOCX XML tags to CSS.
                                    <br /><br />
                                    Originally I made my own format defined with just JSON and a basic JSON editor written
                                    in python using Tkinter, but I realized its too cumbersome for
                                    non technical users, making it a good idea to pivot to a more accessible format that people can use.

                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div id="project-page" className='gridpaper'
                    style={{
                        height: 'auto',
                        display: 'flex', flexDirection: 'column', gap: '1em',
                        alignItems: 'center',
                    }}
                >
                    {/* Spiral Coil Container */}
                    <div className='spiral'
                        style={{
                            left: '10px',
                        }} />

                    {/* Three Hole Punches */}
                    <div className='holepunch' style={{
                        left: '35px',
                    }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: '#333', // This should match the background behind the paper
                                borderRadius: '50%',
                                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.5)'
                            }} />
                        ))}
                    </div>

                    <h2 style={{
                        fontSize: 'xx-large',
                        color: '#333',
                        borderBottom: '2px solid rgba(0, 0, 0, 0.64)',
                        display: 'inline-block'
                    }}>
                        Project Cards
                    </h2>
                    <div style={{
                        // position:'absolute', top:'5%', left:'15%',
                        backgroundColor: '#a2ff8fb6', width: 'fit-content', height: 'auto',
                    }}>Click on any of the cards below to view a project! <br /> Click again to close the card!</div>
                    <motion.div id='projects-grid'
                        style={{
                            // height: 500,
                            // overflow: 'hidden',
                            // paddingTop: '100px',
                            fontFamily: 'm6x11'
                        }}
                    >
                        <div className='grid-cell'>
                            {makeProjectCard(card1Dat)}

                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card2Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card3Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card4Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card5Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card6Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card7Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card8Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card9Dat)}
                        </div>
                        <div className='grid-cell'>
                            {makeProjectCard(card10Dat)}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div id='darkscreen modal' style={{
                    position: 'fixed', top: '0%', left: '0%',
                    width: '500vw', height: '500vh', backgroundColor: '#313131ad',
                    pointerEvents: 'none'
                }}
                    animate={{
                        opacity: activeCard == BLANK_CARD_DATA ? 0 : 1,
                        zIndex: activeCard == BLANK_CARD_DATA ? 0 : 2,
                    }}
                />
            </div>
            {
                props.doMovingBackground && <div style={{}}>
                    <motion.div
                        initial={{ y: 500 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        style={{ position: 'absolute', top: '25%', left: '-15%', zIndex: 0 }}
                    >
                        <motion.img
                            src='img/gear-icon-13.png'
                            style={{
                                opacity: 0.3,
                                scale: 3,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ y: 500 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        style={{ position: 'absolute', top: '25%', left: '-15%', zIndex: 0 }}
                    >
                        <motion.img
                            src='img/gear-icon-13.png'
                            style={{
                                opacity: 0.3,
                                scale: 2,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ y: 500 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        style={{ position: 'absolute', top: '10%', right: '-10%', zIndex: 0 }}
                    >
                        <motion.img
                            src='img/gear-icon-13.png'
                            style={{
                                opacity: 0.3,
                                scale: 2,
                            }}
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ y: 500 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        style={{ position: 'absolute', top: '55%', right: '-5%' }}
                    >
                        <motion.img
                            src='img/gear-icon-13.png'
                            style={{
                                opacity: 0.3,
                                scale: 1,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                        />
                    </motion.div>
                </div>
            }

        </div >
    )
}