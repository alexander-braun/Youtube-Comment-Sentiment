import React, { useState, Fragment, useEffect } from 'react'
import { useSelector} from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroller';

const sort = (comments, indicator) => {
    let sorted = []
    let values = []

    for(let comment of comments) {
        values.push(comment[3])
    }

    if(indicator === '+') {
        values = values.sort((a, b) => a - b).reverse()    
    } else {
        values = values.sort((a, b) => a - b)
    }
    
    
    for(let value of values) {
        for(let comment of comments) {
            if(comment[3] === value) {
                sorted.push(comment)
            }
        }
    }

    return sorted
}

const filterComments = (comments) => {
    let positive = []
    let negative = []
    for(let comment of comments) {
        if(comment[3] > 0) {
            positive.push(comment)
        } else if(comment[3] < 0) {
            negative.push(comment)
        }
    }

    positive = sort(positive, '+')
    negative = sort(negative, '-')

    return [positive, negative]
}

function InfiniteScrollWindow() {

    let comments = useSelector(state => state.comments)
    let [commentsFiltered, setCommentsFiltered] = useState()
    let [positiveComments, setPositiveComments] = useState()
    let [negativeComments, setNegativeComments] = useState()

    useEffect(() => {
        setCommentsFiltered(filterComments(comments))
    }, [comments])

    useEffect(() => {
        commentsFiltered && setPositiveComments(commentsFiltered[0].slice(0, 10))
        commentsFiltered && setNegativeComments(commentsFiltered[1].slice(0, 10))
    }, [commentsFiltered])

    const [hasmoreItems, setHasmoreItems] = useState(true)
    
    const loadMorePositive = () => {
        let count = positiveComments.length + 5
        if(count >= commentsFiltered[0].length) {
            setHasmoreItems(false)
            return
        }
        setPositiveComments(commentsFiltered[0].slice(0, count))
    }

    const loadMoreNegative = () => {
        let count = negativeComments.length + 5
        if(count >= commentsFiltered[1].length) {
            setHasmoreItems(false)
            return
        }
        setNegativeComments(commentsFiltered[1].slice(0, count))
    }

    if(!positiveComments || !negativeComments) return null
    return (
        <div className="infinite-wrapper">
            <div className="infiniteScroll">
                <InfiniteScroll
                    className="infinite-comment-wrapper"
                    pageStart={0}
                    loadMore={ loadMorePositive }
                    hasMore={hasmoreItems}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    getScrollParent={() => document.getElementsByClassName('infiniteScroll')[0]}
                >
                    { 
                        positiveComments && positiveComments.map(comment => {
                            return (
                                <div className="comment-infinite-wrapper" key={uuidv4()}>
                                    <div className="comment-text">{`"${comment[0]}"`}</div>
                                    <div className="comment-sentiment">{comment[3].toString().slice(0, 6)}</div>
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
            <div className="infiniteScroll">
                <InfiniteScroll
                    className="infinite-comment-wrapper"
                    pageStart={0}
                    loadMore={ loadMoreNegative }
                    hasMore={hasmoreItems}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    getScrollParent={() => document.getElementsByClassName('infiniteScroll')[1]}
                >
                    { 
                        negativeComments && negativeComments.map(comment => {
                            return (
                                <div className="comment-infinite-wrapper" key={uuidv4()}>
                                    <div className="comment-text">{`"${comment[0]}"`}</div>
                                    <div className="comment-sentiment">{comment[3].toString().slice(0, 6)}</div>
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default InfiniteScrollWindow
