import * as d3 from 'd3'
import { select, forceSimulation, forceCollide, forceManyBody, hierarchy, forceCenter, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";
import React, { useRef, useEffect } from "react"
import useResizeObserver from './Resizeobserver'

function Bubblechart({ data }) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    const values = Object.values(data)
    const keys = Object.keys(data)
    const entries = Object.entries(data)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const heighest10Entries = () => {
        let scoreValues = []
        for(let entry of entries) {
            scoreValues.push(entry[1])
        }
        scoreValues.sort()
        scoreValues = scoreValues.slice(scoreValues.length - 15)

        const newEntries = []
        let counter = 0
        return entries.filter(arr => {
            if(scoreValues.indexOf(arr[1]) !== -1 && counter < 15) {
                counter++
                return arr
            }
        })
    }

    let newEntries = heighest10Entries()
    let cleanEntries = []
    for(let entry of newEntries) {
        if(entry[1] > 1) {
            if(alphabet.indexOf(entry[0][0]) === -1){
                continue
            }
            let obj = {}
            obj[entry[0]] = entry[1]
            cleanEntries.push(obj)
        }
    }

    let minValue
    let maxValue
    if(cleanEntries.length !== 0) {
        let minMaxNumbers = []
        for(let entry of cleanEntries) {
            minMaxNumbers.push(entry[Object.keys(entry).join('')])
        }
        minValue = d3.min(minMaxNumbers)
        maxValue = d3.max(minMaxNumbers)
    }

    useEffect(() => {
        if(!dimensions) return

        const root = hierarchy(cleanEntries)
        const nodeData = root.descendants()
        const svg = select(svgRef.current)
        const radiusScaleFactor = 6

        

        const scaleL = d3.scaleSqrt()
            .domain([minValue, maxValue])
            .range([20, 80])
        
        svg
            .style("width", 50 + 'vw')
            .style("height", 50 + 'vh')
       
       /*
        svg.attr("viewBox", [
            -dimensions.width / 2,
            -dimensions.height / 2,
            dimensions.width,
            dimensions.height
            ]);
            */

        svg.attr('viewbox', `0 0 ${dimensions.width} ${dimensions.height}`)
        
        const simulation = forceSimulation(cleanEntries)
            .force("charge", forceManyBody().strength(30))
            .force("collide", forceCollide().radius(d => {
                const keys = Object.keys(d)
                for(let element of keys) {
                    if(element !== 'index' &&
                        element !== 'vx' &&
                        element !== 'vy' &&
                        element !== 'x' && 
                        element !== 'y'
                    )
                    return scaleL(data[element])
                }
            }))
            .force('center', forceCenter(dimensions.width / 2, dimensions.height  / 2))
            .on('tick', () => {
                
            svg
                .selectAll('.node')
                .data(cleanEntries)
                .join('circle')
                .attr('class', 'node')
                .attr('r', node => {
                    const keys = Object.keys(node)
                    for(let element of keys) {
                        if(element !== 'index' &&
                            element !== 'vx' &&
                            element !== 'vy' &&
                            element !== 'x' && 
                            element !== 'y'
                        )

                        return scaleL(data[element])
                    }
                })
                .style('fill', 'transparent')
                .attr('stroke', 'black')
                .attr('cx', node => node.x)
                .attr('cy', node => node.y)

            svg
                .selectAll('.label')
                .data(cleanEntries)
                .join('text')
                .attr('class', 'label')
                .attr('text-anchor', 'middle')
                .attr('font-size', 13)
                .attr("font-family", "Open Sans")
                .text(node => {
                    const keys = Object.keys(node)
                    for(let element of keys) {
                        if(element !== 'index' &&
                            element !== 'vx' &&
                            element !== 'vy' &&
                            element !== 'x' && 
                            element !== 'y'
                        )
                        return element
                    }
                })
                .attr('x', node => node.x)
                .attr('y', node => node.y)
        })
            
    }, [dimensions, cleanEntries])

    return (
        <div ref={wrapperRef} className="bubblechart">
            <svg ref={svgRef}>

            </svg>
        </div>
    )
}

export default Bubblechart