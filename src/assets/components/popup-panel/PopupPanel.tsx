import { motion } from "motion/react";
import type { ReactNode } from "react";
import './PopupPanel.css'


interface PanelProps {
  children?: ReactNode;
  setFunction: Function;
}



//TODO: make this a Modal.
export default function PopupPanel(props: PanelProps) {
  return <div style={{position:'fixed', width:'100%', height:'100%',zIndex:11, backgroundColor:'#444444be'}}>
    <motion.div key={'INFO_PANEL'} className='popup-panel'
      initial={{ opacity: 0, top: '50%', left: '50%', translateX: '-50%', translateY: '150%' }}
      animate={{ opacity: 1, translateX: '-50%', translateY: '-50%' }}
      exit={{ opacity: 0, translateY: '150%' }}
    >
      {props.children}
      <motion.button style={{
        zIndex: 10,
        position: 'absolute', margin: 15,
        top: '100%', left: '50%',
        translateX: '-50%'
      }} onClick={() => { props.setFunction(false); }}> Close </motion.button>
    </motion.div>
  </div>
}