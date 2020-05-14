import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/settings.css'

import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

import { 
    setSentiment, 
    setSentimentCount, 
    setHighestComment, 
    setLowestComment, 
    setCommentCount 
} from '../actions/setSentiments'

import { setKeycounts } from '../actions/setKeycounts'
import { setVideoTitle } from '../actions/setVideoTitle'

var Analyzer = require('natural').SentimentAnalyzer
var stemmer = require('natural').PorterStemmer
var keyword_extractor = require("keyword-extractor")
let apiKey = process.env.REACT_APP_API_KEY

const useStyles = makeStyles((theme) => ({
    searchIcon: {
      color: 'rgba(128, 128, 128, 0.5)',
      position: 'absolute',
      right: '10px',
      cursor: 'pointer'
    },
}))

const getKeywords = (comments) => {
    let keywords = []

    for(let i = 0; i < comments.length; i++) {
        let extraction = keyword_extractor.extract(comments[i], {
            language:"english",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false
        })
        keywords.push(extraction)
    }
    return keywords
}

const countKeywords = (keywords) => {

    // Get all the unique keywords
    let uniqueKeywords = []
    for(let i = 0; i < keywords.length; i++) {
        for(let keyword of keywords[i]) {
            if(keyword) {
                let word = keyword.toLowerCase()    
                uniqueKeywords.indexOf(word) === -1 && uniqueKeywords.push(word)
            }
        }
    }

    // Put all of them into an object an count them
    let keyCount = {}
    for(let i = 0; i < keywords.length; i++) {
        for(let keyword of keywords[i]) {
            keyCount[keyword] && keyCount[keyword]++
            !keyCount[keyword] && (keyCount[keyword] = 1)
        }
    }

    return keyCount
}

const overallSentiment = (comments) => {

    let analyzer = new Analyzer("English", stemmer, "afinn")
    let length = comments.length
    let sentiments = parseFloat(0)

    // Counts POS and NEG comments POS/NEG
    let sentimentCount = [0, 0, 0]

    // Set highest and lowest commentscore
    let highest = [-10, null]
    let lowest = [10, null]

    for(let i = 0; i < length; i++) {

        // Get sentiment number
        let tokenized = comments[i].split(' ')
        const sentiment = parseFloat(analyzer.getSentiment(tokenized))

        // Add POS or NEG or NEUTRAL
        sentiment > 0 && sentimentCount[2]++
        sentiment === 0 && sentimentCount[1]++
        sentiment < 0 && sentimentCount[0]++
        
        sentiment > highest[0] && (highest[0] = sentiment) && (highest[1] = comments[i])
        sentiment < lowest[0] && (lowest[0] = sentiment) && (lowest[1] = comments[i])

        // Sometimes NaN is returned so this prevents it from beeing added to the overall score
        if(!isNaN(sentiment)) {
            sentiments += sentiment
        }
    }

    return [sentiments / length, sentimentCount, highest, lowest]
}

// Takes the video link and returns the ID
const shortenToVideoID = (link) => {
    const equalSignIndex = link.search('=')
    const videoID = link.slice(equalSignIndex + 1)
    return videoID
}


const cleanComments = (comments) => {
    let cleanedComments = []
    for(let i = 0; i < comments.length; i++) {
        cleanedComments.push(comments[i][0])
    }
    return cleanedComments
}

const getVideoTitle = async (ID) => {
    if(ID && ID !== undefined) {
        let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ID}&fields=items(id%2Csnippet)&key=${apiKey}`

        const response = await fetch(url)   
        const data = await response.json()
        const title = await data['items'][0]['snippet']['title']  
        return title
    }
    return null
}

function Settings() {

    const [videoLink, updateVideoLink] = useState('')
    const [videoID, updateVideoID] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        // Get and Update Video ID
        const ID = shortenToVideoID(videoLink)
        updateVideoID(ID)
    }, [videoLink])

    // Main knot to get all needed information from the api
    const calc = async (e) => {
        e.preventDefault()

        // Get Video Title
        let videoTitle = await getVideoTitle(videoID)

        dispatch(setVideoTitle(videoTitle))

        // Get last 100 comments
        let comments = await getComments()
        if(comments.length === 0) return
        comments = comments.flat()

        // Extract comments from [comment, likes]
        let cleanedComments = cleanComments(comments)
        let commentCount = cleanedComments.length
        dispatch(setCommentCount(commentCount))

        // Calculate the sentiment and update
        let sentimentCollector = overallSentiment(cleanedComments)
        
        dispatch(setSentiment(sentimentCollector[0]))
        dispatch(setSentimentCount(sentimentCollector[1]))
        dispatch(setHighestComment(sentimentCollector[2]))
        dispatch(setLowestComment(sentimentCollector[3]))

        // Get all the keywords from all the comments and count them
        let keywords = getKeywords(cleanedComments)
        let keyCounts = countKeywords(keywords)
        dispatch(setKeycounts(keyCounts))
    }

    const getComments = () => {
        let ID = videoID
        let maxResults = 100
        let maxSearchLength = 10
        
        async function fetchComments(textArr = [], token) {

            // If there are X comments already in array return array
            if(textArr.length >= maxSearchLength / 100) {
                return textArr
            }

            // Change the url based on if there is a new nextPageToken or not
            let url
            if(token) {
                url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${ID}&maxResults=${maxResults}&pageToken=${token}`
            } else {
                url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${ID}&maxResults=${maxResults}`
            }

            // Grab the data and get comment and likecount for comment
            const response = await fetch(url)    
            const data = await response.json()
            const nextPageToken = await data['nextPageToken']
            let text = await data['items']

            // If the address was f.e. empty and there are no results just return []
            if(!text) return []

            // Else put the text and the likecount (not used yet) into an array
            text = text.map(comment => {
                return [comment['snippet']['topLevelComment']['snippet']['textDisplay'], comment['snippet']['topLevelComment']['snippet']['likeCount']]
            })

            // Push data to array that is passed along
            textArr.push(text)

            // If there is one more comment page to load grab the nextpagetoken for that site
            // Not used as it eats the free api usage too quickly. Could grab all other comments
            // If used
            if(nextPageToken) {
                return fetchComments(textArr, nextPageToken)
            }

            // Or else just return the array
            else if(!nextPageToken) return textArr
        }

        
        return fetchComments([], null)
    }

    const classes = useStyles()

    return (
        <div className="settings">
            <form>
                <input placeholder="Enter Youtube Video Link..." type="text" id="video-link" name="video-link" onChange={e => updateVideoLink(e.target.value)} value={videoLink} />
                <SearchIcon className={classes.searchIcon} onClick={calc}/>
            </form> 
            <button onClick={calc} value="Search">Search</button>
        </div>
    )
}

export default Settings
