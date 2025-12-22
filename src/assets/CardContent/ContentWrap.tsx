import { motion } from "motion/react";
import { type ReactNode } from "react";



interface ContentWrapProps {
    children?: ReactNode
}

export default function ContentWrap(props: ContentWrapProps) {

    const transitionStages = {
        s0: {
            opacity: 0,
            zIndex: -1,
            position: 'absolute',
            backgroundColor: '#ffffffff',
            borderColor: 'black',
            borderStyle: 'solid',
            // borderWidth: ,
            top: '50%', left: '50%',
            // rotate: 27,
            translateX: '-50%', translateY: '-50%',
            width: 0, height: 0
        },
        s1: {
            opacity: 1,
            width: '0%',
            height: '0%',
            transition: { duration: 0.1, delay: 0.8 }
        },
        s2: {
            width: '100%',
            height: '100%',
            transition: { duration: 0.75, delay: 0.1 }
        },
        sExit: {
            width: 0, height: 0,
            opacity:0,
            transition: { duration: 0.1, }

        }
    }
    const variants = {
        closed: {
            opacity: 0,
        },
        open: {
            opacity: 1,
            transition: {
                delay: 1,
                duration: 0.5
            }
        },
        exit: {
            opacity: 0
        }
    }

    return (<>
        <motion.div
            initial={variants.closed}
            animate={variants.open}
            exit={variants.exit}
        >
            {props.children}
        </motion.div>
        <motion.div id='TransitionBlock'
            transition={{
                // delay: 0.8,
                ease: 'easeIn'
            }}
            variants={transitionStages}

            initial={'s0'}
            animate={['s0', 's1', 's2']}
            exit={'sExit'}
        />
    </>)
}