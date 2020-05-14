import * as d3 from 'd3'
import { 
    select, 
    forceSimulation, 
    scaleOrdinal, 
    forceCollide, 
    forceManyBody, 
    forceCenter } from "d3"
import React, { useRef, useEffect } from "react"
import useResizeObserver from './Resizeobserver'

function Bubblechart({ data }) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    const entries = Object.entries(data)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890'

    let scoreValues = []

    const heighestXEntries = () => {

        // Get all unique counts for a word and sort them
        for(let entry of entries) {
            if(scoreValues.indexOf(entry[1]) === -1) scoreValues.push(Number(entry[1]))
        }
        scoreValues.sort((a, b) => a - b)

        // ScoreCount is the max number of bubbles for the bubblediagram
        let scoreCount = 25
        if(window.innerWidth < 700) scoreCount = 15

        let newEntries = []
        let counter = 0

        // goes backwards through the scores and pushes [word, count] into newEntries
        for(let i = scoreValues.length; i > 0; i--) {
            newEntries.push(...entries.filter(arr => {
                if(arr[1] === scoreValues[i]) {
                    counter++
                    return arr
                }
            }))
            if(counter >= scoreCount) break
        }

        return newEntries.slice(0, scoreCount)
    }

    let newEntries = heighestXEntries()

    // Sorts the entries as object (for d3) into an array. Gets rid of single character mentions like = or -
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

    // Gets the minValue and maxValue of word counts
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
        const svg = select(svgRef.current)
        
        // Colors for Bubbles
        const colorScale = scaleOrdinal()
            .domain(new Set(scoreValues))
            .range(["#00e8e8", "#F2CB05", "#F28705", "#D92818", "#D94141", "#0ba3ff", "#6aafda"])
        
        // Determines the scale based on screen size
        let scaleBubbles = 1.2
        if(dimensions.width <= 700) scaleBubbles = 1

        // Scale for bubbles using scale var
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