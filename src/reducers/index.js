import { combineReducers } from 'redux'
import { videoTitle } from './videoTitle'
import { sentiment } from './sentiment'
import { keyCounts } from './keyCounts'

export default combineReducers({
    videoTitle,
    sentiment,
    keyCounts
})