import * as d3 from 'd3'
import { 
    select, 
    forceSimulation, 
    mouse, 
    forceRadial, 
    forceX, 
    forceY, 
    scaleOrdinal, 
    forceCollide, 
    forceManyBody, 
    hierarchy, 
    forceCenter } from "d3"
import React, { useRef, useEffect } from "react"
import useResizeObserver from './Resizeobserver'

function Bubblechart({ data }) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    const entries = Object.entries(data)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    let scoreValues = []

    const heighest10Entries = () => {

        for(let entry of entries) {
            scoreValues.push(entry[1])
        }
        scoreValues.sort()

        let scoreCount = 25
        if(window.innerWidth < 700) scoreCount = 15

        scoreValues = scoreValues.slice(scoreValues.length - scoreCount)
        const newEntries = []
        let counter = 0
        return entries.filter(arr => {
            if(scoreValues.indexOf(arr[1]) !== -1 && counter < scoreCount) {
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
        
        const colorScale = scaleOrdinal()
            .domain(new Set(scoreValues))
            .range(["#00e8e8", "#F2CB05", "#F28705", "#D92818", "#D94141", "#0ba3ff", "#6aafda"])
        
        let scaleBubbles = 1.2
        if(dimensions.width <= 700) scaleBubbles = 1

        const scaleL = d3.scaleSqrt()
            .domain([minValue, maxValue])
            .range([25 * scaleBubbles, 60 * scaleBubbles])
        
        svg
            .style("width", '100%')
            .style("height", '100%')

        svg.attr('viewbox', `0 0 ${dimensions.width} ${dimensions.height}`)

        const simulation = forceSimulation(cleanEntries)
            .force("charge", forceManyBody().strength(10))
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
                .style('fill', node => {
                    const keys = Object.keys(node)
                    for(let element of keys) {
                        if(element !== 'index' &&
                            element !== 'vx' &&
                            element !== 'vy' &&
                            element !== 'x' && 
                            element !== 'y'
                        )
                        return colorScale(data[element])
                    }
                })
                .attr('cx', node => node.x)
                .attr('cy', node => node.y)
            svg
                .selectAll('.label')
                .data(cleanEntries)
                .join('text')
                .attr('class', 'label')
                .attr('text-anchor', 'middle')
                .attr('font-size', node => {
                    const keys = Object.keys(node)
                    for(let element of keys) {
                        if(element !== 'index' &&
                            element !== 'vx' &&
                            element !== 'vy' &&
                            element !== 'x' && 
                            element !== 'y'
                        )

                        return scaleL(data[element]) / 3
                    }
                })
                .attr('font-family', 'Open Sans')
                .style('fill', 'black')
                .attr('font-weight', '600')
                .text(node => {
                    const keys = Object.keys(node)
                    for(let element of keys) {
                        if(element !== 'index' &&
                            element !== 'vx' &&
                            element !== 'vy' &&
                            element !== 'x' && 
                            element !== 'y'
                        )
                        return element[0].toUpperCase() + element.slice(1)
                    }
                })
                .attr('x', node => node.x)
                .attr('y', node => node.y)

                svg.on("click", () => {
                    const [x, y] = mouse(svgRef.current);
                    simulation
                        .alpha(0.5)
                        .restart()
                        .force("orbit", forceRadial(100, x, y).strength(0.1));
                    
                })

                svg.on("mousemove", () => {
                    const [x, y] = mouse(svgRef.current);
                    simulation
                        .force(
                            "x",
                            forceX(x).strength(0.2)
                        )
                        .force(
                            "y",
                            forceY(y).strength(0.2)
                        )
                })
        })
            
    }, [dimensions, cleanEntries, data, maxValue, minValue])

    return (
        <div ref={wrapperRef} className="bubblechart">
            <h4>Most used keywords:</h4>
            <svg ref={svgRef}>

            </svg>
        </div>
    )
}

export default Bubblechart