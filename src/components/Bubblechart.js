import * as d3 from 'd3';
import {
  select,
  forceSimulation,
  scaleOrdinal,
  forceCollide,
  forceManyBody,
  forceCenter,
  scaleLinear,
} from 'd3';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import useResizeObserver from './Resizeobserver';
import { useDispatch } from 'react-redux';
import { setChoice } from '../actions/setChoice';

function Bubblechart({ data, dataSingleWords }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const entries = Object.entries(data);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const dispatch = useDispatch();

  let scoreValues = [];

  const getBubbleCount = () => {
    let bubbleCount = 25;
    if (window.innerWidth < 700) bubbleCount = 15;
    return bubbleCount;
  };

  const heighestXEntries = () => {
    // Get all unique counts for a word and sort them
    for (let entry of entries) {
      if (scoreValues.indexOf(entry[1]) === -1)
        scoreValues.push(Number(entry[1]));
    }
    scoreValues.sort((a, b) => a - b);

    // goes backwards through the scores and pushes [word, count] into newEntries
    let newEntries = [];
    const bubbleCount = getBubbleCount();
    for (let i = scoreValues.length; i > 0; i--) {
      newEntries.push(
        ...entries.filter((arr) => {
          return arr[1] === scoreValues[i] && arr;
        })
      );
      if (newEntries.length >= bubbleCount) break;
    }
    return newEntries.slice(0, bubbleCount);
  };

  let newEntries = heighestXEntries();

  // Sorts the entries as object (for d3) into an array. Gets rid of single character mentions like = or -
  let cleanEntries = [];
  for (let entry of newEntries) {
    if (entry[1] > 1) {
      if (alphabet.indexOf(entry[0][0]) === -1) {
        continue;
      }
      let obj = { word: null, amount: null };
      obj['word'] = entry[0];
      obj['amount'] = entry[1];
      cleanEntries.push(obj);
    }
  }

  // Merge Singlewordsentiments and assign category 0 or 1
  let sentimentWordsCombined = [];
  let category = 0;
  let keys = Object.keys(dataSingleWords);

  let bubbles2Count = 15;
  if (dimensions && dimensions.width <= 700) bubbles2Count = 10;

  let count = 0;

  for (let key of keys) {
    for (let i = 0; i < dataSingleWords[key].length; i++) {
      if (count < bubbles2Count) {
        let obj = dataSingleWords[key][i];
        obj['category'] = category;
        sentimentWordsCombined.push(obj);
        count++;
      }
    }
    count = 0;
    category++;
  }

  // Base bubbles on choice of keywords or sentiment words
  const [choice, updateChoice] = useState('keywords');
  const dataChoice = useCallback(() => {
    return choice === 'keywords' ? cleanEntries : sentimentWordsCombined;
  }, [choice, cleanEntries, sentimentWordsCombined]);

  // Gets the minValue and maxValue of word counts
  let minValue;
  let maxValue;

  if (dataChoice().length !== 0) {
    let minMaxNumbers = [];
    for (let entry of dataChoice()) {
      minMaxNumbers.push(entry['amount' || 'sentiment']);
    }
    minValue = d3.min(minMaxNumbers);
    maxValue = d3.max(minMaxNumbers);
  }

  useEffect(() => {
    let data = dataChoice();
    if (!dimensions) return;
    let svg = null;
    svg = select(svgRef.current);

    const mouseEnter = (value) => {
      svg
        .selectAll('.rec')
        .data(() => {
          if (choice === 'sentiment') {
            return [[value['sentiment'], value['word']]];
          } else return [[value['amount'], value['word']]];
        })
        .join((enter) => enter.append('rect'))
        .attr('class', 'rec')
        .attr('x', (node) => {
          for (let element of cleanEntries) {
            if (choice !== 'sentiment') {
              if (element['word'] === node[1]) {
                if (dimensions.width <= 700) {
                  return dimensions.width / 2 - 175;
                } else return element['x'] + 100;
              }
            } else return dimensions.width / 2 - (node[1].length * 4 + 150);
          }
        })
        .attr('width', (node) => {
          return `${node[1].length * 4 + 300}px`;
        })
        .attr('height', '40px')
        .attr('text-anchor', 'middle')
        .attr('y', (node) => {
          for (let element of cleanEntries) {
            if (choice !== 'sentiment') {
              if (element['word'] === node[1]) {
                return element['y'];
              }
            } else return dimensions.height / 2;
          }
        })
        .attr('opacity', 1)
        .attr('fill', 'white')
        .style('stroke', (node) => {
          if (choice !== 'sentiment') {
            return colorScale(node[0]);
          } else {
            return colorScaleS(node[0]);
          }
        })
        .style('stroke-width', 2)
        .attr('rx', 4);
      svg
        .selectAll('.tooltip')
        .data(() => {
          if (choice === 'sentiment') {
            return [[value['sentiment'], value['word']]];
          } else return [[value['amount'], value['word']]];
        })
        .join((enter) => enter.append('text'))
        .attr('class', 'tooltip')
        .text((node) => {
          if (choice === 'sentiment') {
            return `sentiment: ${node[0]}, word: "${node[1]}"`;
          } else return `${node[0]} times used: "${node[1]}"`;
        })
        .attr('x', (node) => {
          let x = dimensions.width / 2;
          for (let element of cleanEntries) {
            if (element['word'] === node[1]) {
              if (choice !== 'sentiment') {
                if (dimensions.width <= 700) {
                  x = dimensions.width / 2;
                } else x = element['x'] + node[1].length * 4 + 200;
              } else x = dimensions.width / 2;
            }
          }
          return x;
        })
        .attr('text-anchor', 'middle')
        .attr('y', (node) => {
          for (let element of cleanEntries) {
            if (choice !== 'sentiment') {
              if (element['word'] === node[1]) {
                return element['y'] + 25;
              }
            } else return dimensions.height / 2 + 25;
          }
        })
        .attr('opacity', 1)
        .attr('fill', 'black');
    };
    // Colors for Bubbles
    const colorScale = scaleOrdinal()
      .domain(new Set(scoreValues))
      .range([
        '#00e8e8',
        '#F2CB05',
        '#F28705',
        '#D92818',
        '#D94141',
        '#0ba3ff',
        '#6aafda',
      ]);

    const colorScaleS = scaleLinear()
      .domain([-2, 2])
      .range(['rgb(217, 29, 0)', 'rgb(66, 230, 0)']);

    // Determines the scale based on screen size
    let scaleBubbles = 1.3;
    if (dimensions.width <= 700) scaleBubbles = 0.8;

    // Scale for bubbles using scale var
    const scaleL = d3
      .scaleSqrt()
      .domain([minValue, maxValue])
      .range([25 * scaleBubbles, 60 * scaleBubbles]);

    let scaleBubblesS = 2;

    const scaleLS = d3
      .scaleSqrt()
      .domain([0, 5])
      .range([0 * scaleBubblesS, 25 * scaleBubblesS]);
    svg.style('width', '100%').style('height', '100%');

    svg.attr('viewbox', `0 0 ${dimensions.width} ${dimensions.height}`);

    const xCenter = [
      dimensions.width / 4,
      dimensions.width - dimensions.width / 4,
    ];

    const simulationBubbles = () => {
      forceSimulation(data)
        .force('charge', forceManyBody().strength(20))
        .force(
          'x',
          choice === 'sentiment'
            ? d3.forceX().x((d) => {
                if (choice === 'sentiment') {
                  return d['category'] === 0 ? xCenter[0] : xCenter[1];
                }
              })
            : null
        )
        .force(
          'center',
          forceCenter(dimensions.width / 2, dimensions.height / 2)
        )
        .force(
          'collide',
          forceCollide().radius((node) => {
            if (choice === 'sentiment') {
              return scaleLS(Math.abs(Number(node['sentiment'])));
            } else return scaleL(node['amount']);
          })
        )
        .on('tick', () => {
          svg
            .selectAll('.node')
            .data(data)
            .join('circle')
            .attr('class', 'node')
            .attr('r', (node) => {
              if (choice === 'sentiment') {
                return scaleLS(Math.abs(Number(node['sentiment'])));
              } else return scaleL(node['amount']);
            })
            .style('fill', (node) => {
              if (choice === 'sentiment') {
                return colorScaleS(node['sentiment']);
              } else return colorScale(node['amount']);
            })
            .attr('cx', (node) => node.x)
            .attr('cy', (node) => node.y)
            .on('mouseenter', (value) => {
              mouseEnter(value);
            })
            .on('mouseleave', () => {
              svg.selectAll('.tooltip').remove();
              svg.selectAll('.rec').remove();
            });
          svg
            .selectAll('.label')
            .data(data)
            .join('text')
            .attr('class', 'label')
            .attr('text-anchor', 'middle')
            .attr('font-size', (node) => {
              if (choice === 'sentiment') {
                return scaleLS(Math.abs(node['sentiment'])) / 3;
              } else return scaleL(node['amount']) / 3;
            })
            .attr('font-family', 'Open Sans')
            .style('fill', 'black')
            .attr('font-weight', '600')
            .text((node) => {
              return node['word'];
            })
            .attr('x', (node) => node.x)
            .attr('y', (node) => node.y)
            .on('mouseenter', (value) => {
              mouseEnter(value);
            });
        });
    };

    simulationBubbles();
  }, [
    dimensions,
    cleanEntries,
    data,
    maxValue,
    minValue,
    scoreValues,
    dataChoice,
    choice,
    bubbles2Count,
  ]);

  const handleChange = (e) => {
    e.preventDefault();
    updateChoice(e.target.value);

    dispatch(setChoice(e.target.value));

    const id = e.target.id;
    const el = document.getElementById(id);
    el.classList.add('bubblechart__difficulty-select--selected');

    if (id === 'compare-sentiment') {
      document
        .getElementById('keywords')
        .classList.remove('bubblechart__difficulty-select--selected');
    } else if (id === 'keywords') {
      document
        .getElementById('compare-sentiment')
        .classList.remove('bubblechart__difficulty-select--selected');
    }
  };

  return (
    <div ref={wrapperRef} className="bubblechart">
      <div className="bubblechart__select-menue">
        <button
          className="bubblechart__difficulty-select bubblechart__difficulty-select--selected"
          value="keywords"
          id="keywords"
          onClick={(e) => handleChange(e)}
        >
          Keywords
        </button>
        <button
          className="bubblechart__difficulty-select"
          value="sentiment"
          id="compare-sentiment"
          onClick={(e) => handleChange(e)}
        >
          Compare Sentiments
        </button>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Bubblechart;
