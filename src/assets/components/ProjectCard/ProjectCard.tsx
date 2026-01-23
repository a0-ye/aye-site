// import { AnimatePresence, motion, scale } from "motion/react"
// import { useRef, useState, type ReactNode, type RefObject } from "react"



// interface projectCardProps {
//     content: projectContent,
//     id: number,
//     activeProject: number,
//     setActiveProject: Function,
//     mainRef: RefObject<HTMLDivElement | null>
// }

// const projectCardVariants = {
//     normal: {
//         position: 'static',
//         opacity: 1,
//         zIndex: 0,
//         x: 0,
//         y: 0,
//         width: '300px',
//         height: '300px',
//         backgroundColor: '#3cff00ff',
//         // transition:{duration:2}

//     },
//     expanded: (custom: { x: number, y: number }) => ({
//         zIndex: 1,
//         transform: 'translate3d(0px, 200px,200px)',
//         x: custom.x,
//         y: custom.y,
//         // scaleX:3,
//         // width: '700px',
//         // height: '700px',
//         // width:'500px',
//         // height:'700px',
//         transition: { duration: 0.5 }
//     }),
// }

// export default function ProjectCard(props: projectCardProps) {
//     const projRef = useRef<HTMLDivElement>(null)
//     const isExpanded = props.activeProject === props.id
//     const [center, setCenter] = useState({ x: 0, y: 0 })

//     const handleClick = () => {
//         console.log('clicking!');
//         if (!projRef.current || !props.mainRef.current) {
//             console.log(projRef.current, props.mainRef.current);
//             return;
//         }
//         const mainRect = props.mainRef.current.getBoundingClientRect();
//         const projRect = projRef.current.getBoundingClientRect();
//         const center =
//         {
//             x: (mainRect.left + mainRect.width / 2) - (projRect.left + projRect.width / 2),
//             y: (mainRect.top + mainRect.height / 2) - (projRect.top + projRect.height / 2)
//         }
//         setCenter(center)
//         props.activeProject != props.id ? props.setActiveProject(props.id) : props.setActiveProject(-1);
//         console.log("active is ", props.activeProject);
//     }

//     return <motion.div className="project-box"
//         ref={projRef}
//         key={props.id}
//         variants={projectCardVariants}
//         custom={center}
//         initial='normal'
//         animate={props.activeProject == props.id ? 'expanded' : 'normal'}
//         // exit={'exit'}
//         drag
//         dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//         dragElastic={0.1}

//         style={{
//             // transformOrigin: '100% 50%'
//             backgroundImage: `url(${props.content.img})`,
//         }}
//         onClick={handleClick}
//     >
//     </motion.div>
// }