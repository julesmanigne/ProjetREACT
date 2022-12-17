import React from 'react';
import { useRef, useState } from "react";
import Box from '@mui/material/Box';

import '../App.css';

const Collapsible = (props) => {
    const [open, setOPen] = useState(false);

    const contentRef = useRef();

    const toggle = () => {
        setOPen(!open);
    };

    return (

        <div>
            <Box textAlign='center'>

                <button onClick={toggle} style={{ marginBottom: 6, width: '30%', height: 40, }} className="AlarmButton">{props.label}</button>
                <div className='content-parent' ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
                    <div className='content'> {props.children}</div>
                </div>
            </Box>
        </div>
    )
}
export default Collapsible;