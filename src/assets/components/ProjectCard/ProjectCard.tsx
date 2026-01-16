import { AnimatePresence, motion } from "motion/react"
import { useRef, useState, type ReactNode, type RefObject } from "react"

export interface projectContent {
    img: string, title: ReactNode, date: ReactNode, description: ReactNode, bullets: ReactNode
}

interface projectCardProps {
    content: projectContent,
    id: number,
    activeProject: number,
    setActiveProject: Function,
    mainRef: RefObject<HTMLDivElement | null>
}

const projectCardVariants = {
    normal: {
        position: 'static',
        opacity: 1,
        zIndex: 0,
        x: 0,
        y: 0,
        width: '300px',
        height: '300px',
        backgroundColor: '#3cff00ff',
        // transition:{duration:2}

    },
    expanded: (custom: { x: number, y: number }) => ({
        zIndex: 1,
        // transform: 'translate(200px,200px)',
        x: custom.x,
        y: custom.y,
        width: '300px',
        height: '300px',
        // width:'500px',
        // height:'700px',
        transition: { duration: 0.5 }
    }),
}

export default function ProjectCard(props: projectCardProps) {
    const projRef = useRef<HTMLDivElement>(null)
    const isExpanded = props.activeProject === props.id
    const [center, setCenter] = useState({ x: 0, y: 0 })

    const handleClick = () => {
        console.log('clicking!');
        if (!projRef.current || !props.mainRef.current) {
            console.log(projRef.current, props.mainRef.current);
            return;
        }
        const mainRect = props.mainRef.current.getBoundingClientRect();
        const projRect = projRef.current.getBoundingClientRect();
        const center =
        {
            x: (mainRect.left + mainRect.width / 2) - (projRect.left + projRect.width / 2),
            y: (mainRect.top + mainRect.height / 2) - (projRect.top + projRect.height / 2)
        }
        setCenter(center)
        props.activeProject != props.id ? props.setActiveProject(props.id) : props.setActiveProject(-1);
        console.log("active is ", props.activeProject);
    }

    return <motion.div className="project-box"
        ref={projRef}
        key={props.id}
        variants={projectCardVariants}
        custom={center}
        initial='normal'
        animate={props.activeProject == props.id ? 'expanded' : 'normal'}
        // exit={'exit'}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}

        style={{
            // transformOrigin: '100% 50%'
            backgroundImage: `url(${props.content.img})`,
        }}
        onClick={handleClick}
    >
        {props.activeProject == props.id &&
            <motion.div className='project-bot'
                layout
                initial={{ height: 0 }}
                animate={{ height: '25%' }}
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
                >{props.content.title}
                </motion.div>
                <motion.div className='project-banner'
                    style={{ position: 'absolute', bottom: '0%', right: '2%' }}
                    initial={{ y: 300 }}
                    animate={{ y: 0 }}
                // transition={{ delay: 0.8 }}
                > {props.content.date} </motion.div>
                <motion.div className='project-description'
                    layout
                    // style={{ flex: isExpanded ? '1 0 100%' : '1'}}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={isExpanded ? { fontSize: 'large' } : { fontSize: 'x-large', WebkitMaskImage: 'linear-gradient(180deg,#000 60%,transparent)', cursor: 'pointer' }}
                >
                    {props.content.description}

                </motion.div>
                <AnimatePresence mode='popLayout'>
                    {!(props.activeProject == props.id) &&
                        <motion.div className='project-bullets'
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {props.content.bullets}
                        </motion.div>}
                </AnimatePresence>

            </motion.div>}
    </motion.div>
}