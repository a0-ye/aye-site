import { motion } from "motion/react";
import type { ReactNode } from "react";
import './PopupPanel.css'


interface PanelProps {
    children?:ReactNode;
    setFunction:Function;
}


export default function PopupPanel (props:PanelProps) {
    return (<motion.div  key={'INFO_PANEL'} className='popup-panel'
                                    initial={{ opacity: 0, top:'50%', left:'50%',translateX:'-50%', translateY:'150%'}}
                                    animate={{ opacity: 1, translateX:'-50%', translateY:'-50%'}}
                                    exit={{opacity:0, top:'50%', left:'50%',translateY:'1050%'}}
          >
            {props.children}
            <motion.button style={{zIndex:10,
                    position:'absolute', margin:15,
                    top:'100%', left:'50%',
                    translateX:'-50%'
            }} onClick={()=>{props.setFunction(false);}}> Close </motion.button>
          </motion.div>)
}