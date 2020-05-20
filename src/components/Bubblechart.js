import * as d3 from 'd3'
import { 
    select, 
    forceSimulation, 
    scaleOrdinal, 
    forceCollide, 
    forceManyBody, 
    forceCenter,
    scaleLinear,
    geoPath,
    geoMercator } from "d3"
import React, { useRef, useEffect, useState, useCallback } from "react"
import useResizeObserver from './Resizeobserver'
import geodata from './custom.geo.json'
import { useSelector, useDispatch } from 'react-redux'
import { setChoice } from '../actions/setChoice'
import { setCountries } from '../actions/setCountries'
let apiKey = process.env.REACT_APP_API_KEY


const getUserCountries = async (snippet) => {
    if(!snippet) return

    const userIDs = []
    for(let snip of snippet) {
        userIDs.push(snip[2])
    }

    const countries = []
    for(let ID of userIDs) {
        let URL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items(snippet(country))&id=${ID}&key=${apiKey}`
        let response = await fetch(URL)
        const data = await response.json()
        if(data['items'] === undefined) return
        const snip = await data['items']['0']['snippet']

        if(snip['country'] !== undefined) {
            const country = snip['country']
            const obj = {}
            obj['country'] = country
            obj['id'] = ID
            countries.push(obj)
        }
    }
    return countries
}

const findCountriesAverageSentiment = (countries, comments) => {
    if(!countries || !comments) return
    let countriesSentiment = []
    for(let country of countries) {
        for(let comment of comments) {
            if(country['id'] === comment[2]) {
                let obj = {}
                obj['id'] = country['id']
                obj['country'] = country['country']
                obj['sentiment'] = comment[3]
                obj['comment'] = comment[0]
                countriesSentiment.push(obj)
            }
        }
    }

    let sentiments = {}
    for(let country of countriesSentiment) {
        !sentiments[country['country']] && (sentiments[country['country']] = [])
        sentiments[country['country']].push(country['sentiment'])
    }

    const averageSentiments = {}
    Object.keys(sentiments).map(key => {
        return averageSentiments[key] = [sentiments[key].reduce((a, b) => a + b) / sentiments[key].length, sentiments[key].length]
    })

    return averageSentiments
}

function Bubblechart({ data, dataSingleWords }) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)
    const entries = Object.entries(data)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890'
    const [selectedCountry, setSelectedCountry] = useState(null)
    const comments = useSelector(state => state.comments)
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch()

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

        // goes backwards through the scores and pushes [word, count] into newEntries
        let newEntries = []
        for(let i = scoreValues.length; i > 0; i--) {
            newEntries.push(...entries.filter(arr => {
                return arr[1] === scoreValues[i] && arr
            }))
            if(newEntries.length >= scoreCount) break
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
            let obj = {'word': null, 'amount': null}
            obj['word'] = entry[0]
            obj['amount'] = entry[1]
            cleanEntries.push(obj)
        }
    }

    // Merge Singlewordsentiments and assign category 0 or 1
    let sentimentWordsCombined = []
    let category = 0
    let keys = Object.keys(dataSingleWords)

    let bubbles2Count = 15
    if(dimensions && dimensions.width <= 700) bubbles2Count = 10

    let count = 0

    for(let key of keys) {
        for(let i = 0; i < dataSingleWords[key].length; i++) {
            if(count < bubbles2Count) {
                let obj = dataSingleWords[key][i]
                obj['category'] = category
                sentimentWordsCombined.push(obj)    
                count++
            }
        }
        count = 0
        category++
    }

    // Base bubbles on choice of keywords or sentiment words
    const [choice, updateChoice] = useState('keywords')
    const dataChoice = useCallback(() => {
        return choice === 'keywords' ? cleanEntries : sentimentWordsCombined
    }, [choice, cleanEntries, sentimentWordsCombined])

    // Gets the minValue and maxValue of word counts
    let minValue
    let maxValue

    if(dataChoice().length !== 0) {
        let minMaxNumbers = []
        for(let entry of dataChoice()) {
            minMaxNumbers.push(entry['amount' || 'sentiment'])
        }
        minValue = d3.min(minMaxNumbers)
        maxValue = d3.max(minMaxNumbers)
    }

    const userCountries = useCallback(async () => {
        const countries = await getUserCountries(comments)
        const averageCountriesSentiment = await findCountriesAverageSentiment(countries, comments)
        if(!averageCountriesSentiment) return
        dispatch(setCountries(averageCountriesSentiment))
    }, [comments, dispatch])

    useEffect(() => {

        let data = dataChoice()
        if(!dimensions) return
        let svg = null
        svg = select(svgRef.current)

        const mouseEnter = (value) => {
            svg
                .selectAll('.rec')
                .data(() => {
                    if(choice === 'sentiment') {
                        return [[value['sentiment'], value['word']]]
                    } else return [[value['amount'], value['word']]]
                })
                .join(enter => enter.append("rect"))
                .attr("class", "rec")
                .attr("x", (node) => {
                    for(let element of cleanEntries) {
                        if(choice !== 'sentiment') {
                            if(element['word'] === node[1]){
                                if(dimensions.width <= 700) {
                                    return dimensions.width / 2 - 175
                                }else return element['x'] + 100
                            }   
                        } else return dimensions.width / 2 - (node[1].length * 4 + 150)
                    }
                })
                .attr('width', node => {
                    return `${node[1].length * 4 + 300}px`
                })
                .attr('height', '40px')
                .attr("text-anchor", "middle")
                .attr("y", (node) => {
                    for(let element of cleanEntries) {
                        if(choice !== 'sentiment') {
                            if(element['word'] === node[1]){
                                return element['y']
                            }     
                        } else return dimensions.height / 2
                    }
                })
                .attr("opacity", 1)
                .attr('fill', 'white')
                .style('stroke', node => {
                    if(choice !== 'sentiment') {
                        return colorScale(node[0])
                    } else {
                        return colorScaleS(Math.abs(node[0]))
                    }
                })
                .style('stroke-width', 2)
                .attr("rx", 4)
            svg
                .selectAll(".tooltip")
                .data(() => {
                    if(choice === 'sentiment') {
                        return [[value['sentiment'], value['word']]]
                    } else return [[value['amount'], value['word']]]
                })
                .join(enter => enter.append("text"))
                .attr("class", "tooltip")
                .text(node => {
                    if(choice === 'sentiment') {
                        return `sentiment: ${node[0]}, word: "${node[1]}"`
                    }else return `${node[0]} times used: "${node[1]}"`
                })
                .attr("x", (node) => {
                    let x = dimensions.width / 2
                    for(let element of cleanEntries) {
                        if(element['word'] === node[1]){
                            if(choice !== 'sentiment') {
                                if(dimensions.width <= 700) {
                                    x = dimensions.width / 2
                                } else x = element['x'] + node[1].length * 4 + 200    
                            } else x = dimensions.width / 2
                        } 
                    }
                    return x
                })
                .attr("text-anchor", "middle")
                .attr("y", (node) => {
                    for(let element of cleanEntries) {
                        if(choice !== 'sentiment') {
                            if(element['word'] === node[1]){
                                return element['y'] + 25
                            } 
                        } else return dimensions.height / 2 + 25
                    }
                })
                .attr("opacity", 1)
                .attr('fill', 'black')
        }
        // Colors for Bubbles
        const colorScale = scaleOrdinal()
            .domain(new Set(scoreValues))
            .range(["#00e8e8", "#F2CB05", "#F28705", "#D92818", "#D94141", "#0ba3ff", "#6aafda"])

        const colorScaleS = scaleLinear()
            .domain([0, 5])
            .range(['rgb(217, 29, 0)', 'rgb(66, 230, 0)'])

        // Determines the scale based on screen size
        let scaleBubbles = 1.3
        if(dimensions.width <= 700) scaleBubbles = 1

        // Scale for bubbles using scale var
        const scaleL = d3.scaleSqrt()
            .domain([minValue, maxValue])
            .range([25 * scaleBubbles, 60 * scaleBubbles])
        
        let scaleBubblesS = 2

        const scaleLS = d3.scaleSqrt()
            .domain([0, 5])
            .range([0 * scaleBubblesS, 25 * scaleBubblesS])
        svg
            .style("width", '100%')
            .style("height", '100%')

        svg.attr('viewbox', `0 0 ${dimensions.width} ${dimensions.height}`)

        const xCenter = [dimensions.width / 4, dimensions.width - dimensions.width / 4]

        const simulationBubbles = () => {
            if(choice === 'countries') return
            forceSimulation(data)
                .force("charge", forceManyBody().strength(20))
                .force('x', choice === 'sentiment' ? d3.forceX().x(d => {
                    if(choice === 'sentiment') {
                        return d['category'] === 0 ? xCenter[0] : xCenter[1]    
                    }}) : null 
                )
                .force('center', forceCenter(dimensions.width / 2, dimensions.height  / 2))
                .force("collide", forceCollide().radius(node => {
                    if(choice === 'sentiment') {
                        return scaleLS(Math.abs(Number(node['sentiment'])))
                    } else return scaleL(node['amount'])
                }))
                .on('tick', () => {
                    svg 
                        .selectAll('.country').remove()
                        .selectAll('.label2').remove()
                    svg
                        .selectAll('.node')
                        .data(data)
                        .join('circle')
                        .attr('class', 'node')
                        .attr('r', node => {
                            if(choice === 'sentiment') {
                                return scaleLS(Math.abs(Number(node['sentiment'])))
                            } else return scaleL(node['amount'])
                        })
                        .style('fill', node => {
                            if(choice === 'sentiment') {
                                return colorScaleS(node['sentiment'])
                            }else return colorScale(node['amount'])
                        })
                        .attr('cx', node => node.x)
                        .attr('cy', node => node.y)
                        .on("mouseenter", (value) => {
                            mouseEnter(value)
                        })
                        .on("mouseleave", () => {
                            svg.selectAll(".tooltip").remove()
                            svg.selectAll('.rec').remove()
                        })
                    svg
                        .selectAll('.label')
                        .data(data)
                        .join('text')
                        .attr('class', 'label')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', node => {
                            if(choice === 'sentiment') {
                                return scaleLS(Math.abs(node['sentiment'])) / 3
                            } else return scaleL(node['amount']) / 3
                        })
                        .attr('font-family', 'Open Sans')
                        .style('fill', 'black')
                        .attr('font-weight', '600')
                        .text(node => {
                            return node['word']
                        })
                        .attr('x', node => node.x)
                        .attr('y', node => node.y)
                        .on("mouseenter", (value) => {
                            mouseEnter(value)
                        })

            })
        }

        /*
        const simulationWorldmap = () => {
            if(choice !== 'countries') return
            const projection = geoMercator().fitSize([dimensions.width, dimensions.height], selectedCountry || geodata).precision(100)
            const pathGenerator = geoPath().projection(projection)
            svg 
                .selectAll('.label').remove()
                .selectAll('.node').remove()
                .selectAll('.rect').remove()
            svg
                .selectAll('.country')
                .data(geodata.features)
                .join('path')
                .on('click', feature => {
                    setSelectedCountry(selectedCountry === feature ? null : feature)
                })
                .attr('class', 'country')
                .transition()
                .duration(1000)
                .attr('d', feature => pathGenerator(feature))
                .attr('fill', feature => {
                    for(let key of Object.keys(countries)) {
                        if(feature['properties']['iso_a2'] === key) {
                            if(countries[key][0] > 0) {
                                return 'green'
                            } else if(countries[key][0] === 0) {
                                return 'grey'
                            } else return 'red'
                        }
                    }
                    return 'lightgrey'
                })
            svg 
                .selectAll('.label2')
                .data([selectedCountry])
                .join('text')
                .attr('class', 'label2')
                .text(feature => {
                        for(let key of Object.keys(countries)) {
                            if(feature && feature['properties']['iso_a2'] === key) {
                                return (countries[key].reduce((a, b) => a + b) / countries[key].length) + feature && feature.properties.name
                            }
                        }
                        return feature && feature.properties.name
                    }
                )
                .attr('x', 10)
                .attr('y', 25)
        }
        */
        if(choice !== 'countries') {
            simulationBubbles()
        }
        else if(choice === 'countries') {
            //userCountries()
            //simulationWorldmap()
        }

    }, [dimensions, cleanEntries, data, maxValue, minValue, scoreValues, dataChoice, choice, bubbles2Count, countries, selectedCountry, userCountries])


    const handleChange = (e) => {
        e.preventDefault()
        updateChoice(e.target.value)

        dispatch(setChoice(e.target.value))

        const id = e.target.id
        const el = document.getElementById(id)
        el.classList.add('selected')

        if(id === 'countries') {
            document.getElementById('keywords').classList.remove('selected')
            document.getElementById('compare-sentiment').classList.remove('selected')
        } else if(id === 'compare-sentiment') {
            document.getElementById('keywords').classList.remove('selected')
            document.getElementById('countries').classList.remove('selected')
        } else if(id === 'keywords') {
            document.getElementById('countries').classList.remove('selected')
            document.getElementById('compare-sentiment').classList.remove('selected')
        }
    }

    return (
        <div ref={wrapperRef} className="bubblechart">
            <div className="select-menue">
                <button className="difficulty_select selected" value="keywords" id="keywords" onClick={e=> handleChange(e)}>Keywords</button>
                <button className="difficulty_select" value="sentiment" id="compare-sentiment" onClick={e=> handleChange(e)}>Compare Sentiments</button>
                {/* <button className="difficulty_select" value="countries" id="countries" onClick={e=> handleChange(e)}>Per Country</button> */}
            </div>
            <svg ref={svgRef}>

            </svg>
        </div>
    )
}

export default Bubblechart