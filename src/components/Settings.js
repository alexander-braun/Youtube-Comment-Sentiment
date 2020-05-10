import React, { useState, useEffect } from 'react'
import '../styles/settings.css'

var Analyzer = require('natural').SentimentAnalyzer
var stemmer = require('natural').PorterStemmer
var natural = require('natural')
var keyword_extractor = require("keyword-extractor")


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
    let tokenizer = new natural.WordTokenizer()
    let length = comments.length
    let sentiments = parseFloat(0)
    
    for(let i = 0; i < length; i++) {
        let tokenized = tokenizer.tokenize(comments[i])
        const sentiment = parseFloat(analyzer.getSentiment(tokenized))
        if(!isNaN(sentiment)) {
            sentiments += sentiment
        }
    }
    return sentiments / length
}

const shortenToVideoID = (link) => {
    const equalSignIndex = link.search('=')
    const videoID = link.slice(equalSignIndex + 1)
    return videoID
}

function Settings() {

    const [videoLink, updateVideoLink] = useState('')
    const [videoID, updateVideoID] = useState()
    const [sentiment, updateSentiment] = useState()

    useEffect(() => {
        // Get and Update Video ID
        const ID = shortenToVideoID(videoLink)
        updateVideoID(ID)
    }, [videoLink, sentiment])

    const calc = async (e) => {
        e.preventDefault()

        // Get last 100 comments
        let comments = await getComments()
        console.log('comments', comments.flat())
        if(comments.length === 0) return
        comments = comments.flat()

        // Extract comment from [comment, likes]
        let cleanedComments = []
        for(let i = 0; i < comments.length; i++) {
            cleanedComments.push(comments[i][0])
        }

        // Calculate the sentiment and update
        let sentiment = overallSentiment(cleanedComments)
        updateSentiment(sentiment)

        // Get all the keywords from all the comments and count them
        let keywords = getKeywords(cleanedComments)
        let keycounts = countKeywords(keywords)
        console.log(keycounts, sentiment)
    }

    const getComments = () => {
        let apiKey = process.env.REACT_APP_API_KEY
        let ID = videoID
        let maxResults = 100
        let maxSearchLength = 10
        
        async function fetchComments(textArr, token) {

            // If there are X comments already in array return array
            if(textArr.length >= maxSearchLength) {
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
            const text = await data['items'].map(comment => {
                return [comment['snippet']['topLevelComment']['snippet']['textDisplay'], comment['snippet']['topLevelComment']['snippet']['likeCount']]
            })

            // Push data to array that is passed along
            textArr.push(text)

            // If there is one more comment page to load grab the nextpagetoken for that site
            if(nextPageToken) {
                return fetchComments(textArr, nextPageToken)
            }
            // Or else just return the array
            else if(!nextPageToken) return textArr
        }

        
        return fetchComments([], null)
    }

    return (
        <div className="App">
            <form>
                <label htmlFor="lname">Video Link</label>
                <input type="text" id="video-link" name="video-link" onChange={e => updateVideoLink(e.target.value)} value={videoLink} />
                <button onClick={calc} value="Search">Search</button>
            </form> 
        </div>
    )
}

export default Settings
