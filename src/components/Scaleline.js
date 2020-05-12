import React, { useState, useEffect } from 'react'
import { scaleOrdinal, scaleLinear } from "d3"

function Scaleline({ sentiment }) {

    return (
        <div className="scaleline">
            <div className="scaleevents">
                <div className="event">
                    <p>Average Sentiment</p>
                </div>
                <div className="event">
                    <p>4</p>
                </div>
                <div className="event">
                    <p>3</p>
                </div>
                <div className="event">
                    <p>2</p>
                </div>
                <div className="event">
                    <p>1</p>
                </div>
                <div className="event">
                    <p>0</p>
                </div>
                <div className="event">
                    <p>1</p>
                </div>
                <div className="event">
                    <p>2</p>
                </div>
                <div className="event">
                    <p>3</p>
                </div>
                <div className="event">
                    <p>4</p>
                </div>
                <div className="event">
                    <p>5</p>
                </div>
            </div>
            <div className="scaleband">
                <div className="scale_param"><div className="block_elem"></div>-5</div>
                <div className="scale_param"><div className="block_elem"></div>-4</div>
                <div className="scale_param"><div className="block_elem"></div>-3</div>
                <div className="scale_param"><div className="block_elem"></div>-2</div>
                <div className="scale_param"><div className="block_elem"></div>-1</div>
                <div className="scale_param"><div className="block_elem"></div>&nbsp;0</div>
                <div className="scale_param"><div className="block_elem"></div>&nbsp;1</div>
                <div className="scale_param"><div className="block_elem"></div>&nbsp;2</div>
                <div className="scale_param"><div className="block_elem"></div>&nbsp;3</div>
                <div className="scale_param"><div className="block_elem"></div>&nbsp;4</div>
                <div className="scale_param"><div className="block_elem"></div>&nbsp;5</div>
                
            </div>
        </div>
    )
}

export default Scaleline
