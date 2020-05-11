import * as d3 from 'd3'
import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";
import React, { useRef, useEffect } from "react"

function Bubblechart({ data }) {
    const svgRef = useRef()
    useEffect(() => {
        
    }, [])
    return (
        <div className="bubblechart">
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
    )
}

export default Bubblechart