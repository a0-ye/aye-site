import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import './Projects.css'
import { act, useId, useRef, useState, type ReactNode } from 'react'
// import ProjectCard, { type projectContent } from '../components/ProjectCard/ProjectCard'
import MotionCard from '../components/DraggableCardKit/MotionCard'
import { BLANK_CARD_DATA, type CardData } from '../components/DraggableCardKit/CardKitFunctions'

import { contentList } from './ProjectsDat'
import { line, main } from 'motion/react-client'
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


export default function Projects() {
    const [activeCard, setActiveCard] = useState<CardData>(BLANK_CARD_DATA)
    const mainRef = useRef<HTMLDivElement>(null)
    // const { scrollYProgress } = useScroll({ container: mainRef })
    // const parallaxCardTracker = useTransform(scrollYProgress, [0, 1], [0, contentList.length - 1])
    // const [prog, setProg] = useState(0);
    // const [activeProject, setActiveProject] = useState(-1)

    const card1Dat: CardData = {
        id: useId(), zone: '', origin: { x: 0, y: 0 },
        cardContent: {
            cardHoverInfo: 'Personal Website', cardBack: 'img/projects/webCard2.png',
            content: makeCardContent('This Website', '2026',
                <><div> This is my personal website, if its hard to tell!</div>
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
                        TCP and ARP from networking class. I had a lot of fun and pain implementing TCP with congestion control and fast retransmission. It was a real eyeopener for how the internet worked, and having hands on experience re-implementing a core protocol was very enlightnening ad well as frustrating. The same could be said for implementing ARP, since it gave me a great understanding of how devices on a local network communicated with each other.
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

                    <a href='https://devpost.com/software/pantry-pal-2-0'
                        target="_blank"
                        rel="noopener noreferrer"
                    > 2025</a>
                    <a href='https://github.com/a0-ye/HardHack24'
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
            cardHoverInfo: 'Horse Game Remake', cardBack: 'img/projects/horseCard.png', content: makeCardContent(
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
                        A text game made with react. I made a narritive game engine in the style of Twine for my friend's narritive project. I made a lot of tools for non-technical people to be able to write stories, so its easilly expandable and usable by all!
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
                centeringTargetRef={mainRef}
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
        <div ref={mainRef} id='proj-main'>
            <div id='top-half' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
                position:'relative' , zIndex:1}}>
                <div id='banner-text-container' style={{ backgroundColor: '#0e701bff', 
                    display:'flex', flexDirection:'column',
                    alignItems:'center',
                    // height: 'min-content' 
                    }}>

                    <div id='banner-container' style={{
                        // backgroundColor:'',
                        borderRadius: 3, border: 'solid 3px #2b2b2bff', position: 'relative'
                    }}>
                        <h1> Projects</h1>
                        <motion.div style={{ position: 'absolute', top: '50%', right: '-15%', rotate: '5deg' }}
                            initial={{ opacity: 0, scale: 1.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: 1 }}
                        >
                            <StickyNote>
                                Click on any of the cards to view a project!
                            </StickyNote>
                        </motion.div>
                    </div>
                    <h3> These are some of my projects I want to showcase.<br /> Theres more are in progress, so expect more in the future!</h3>
                    
                    
                    <div style={{height:'100%', backgroundColor:'#fff'}}> filler </div>
                </div>

                <div id='projects-container' style={{
                    backgroundColor: '#e2bbc3ff', padding: 50,
                    border: 'solid 2px #242424ff', borderRadius: 15,
                    // more layout settings in the css
                }}>
                    <motion.div id='darkscreen modal' style={{
                        position: 'absolute',
                        width: '120%', height: '120%', backgroundColor: '#313131ad',
                        pointerEvents: 'none'
                    }}
                        animate={{
                            opacity: activeCard == BLANK_CARD_DATA ? 0 : 1,
                            zIndex: activeCard == BLANK_CARD_DATA ? 0 : 5,
                        }}
                    />
                    <motion.div id='projects-grid'
                        style={{
                            // height: 500,
                            // overflow: 'hidden',
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
                    </motion.div>
                </div>
            </div>
            {/* <div id='bottom-half' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div> filler </div>
                <div id='projects-container' style={{
                    backgroundColor: '#e2bbc3ff', padding: 50,
                    border: 'solid 2px #242424ff', borderRadius: 15,
                    // more layout settings in the css
                }}>
                    <motion.div id='darkscreen modal' style={{
                        position: 'absolute',
                        width: '120%', height: '120%', backgroundColor: '#313131ad',
                        pointerEvents: 'none'
                    }}
                        animate={{
                            opacity: activeCard == BLANK_CARD_DATA ? 0 : 1,
                            zIndex: activeCard == BLANK_CARD_DATA ? 0 : 5,
                        }}
                    />
                    <motion.div id='projects-grid'
                        style={{
                            // height: 500,
                            // overflow: 'hidden',
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
                    </motion.div>
                </div>

            </div> */}

            <motion.div
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                style={{ position: 'absolute', top: '25%', left: '-15%' ,zIndex:0}}
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
                style={{ position: 'absolute', top: '25%', left: '-15%' ,zIndex:0}}
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
                style={{ position: 'absolute', top: '10%', right: '-10%' ,zIndex:0}}
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
                style={{ position: 'absolute', top: '50%', right: '5%' }}
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

        </div >
    )
}