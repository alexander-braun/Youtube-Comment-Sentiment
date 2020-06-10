import React from 'react'

function TitleStats({videoTitle, sentimentCount}) {

    return (
        <div className="display__title-stats">
            <h2 className="display__title-name">{videoTitle}</h2>
        </div>
    )
}

export default TitleStats
