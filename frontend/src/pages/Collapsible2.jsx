import React from 'react';
import { useRef, useState } from "react";
import '../App.css';

const Collapsible2 = (props) => {
    const [open, setOPen] = useState(false);

    const contentRef = useRef();

    const toggle = () => {
        setOPen(!open);
    };

    return (

        <div>
            <button className="AlarmButton" onClick={toggle} style={{ marginBottom: 5, width: 50, height: 40 }}>{props.label}</button>
            <div className='content-parent' ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
                <div className='content'> {props.children}</div>
            </div>
        </div>
    )
}
export default Collapsible2;