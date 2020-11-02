'use strict';

import myComponent from "../js/uw_ischool_tweets.js"


//console.log(myComponent);

let mappedData = myComponent.map((x) => {
    let texts = x.text;
    let time = x.created_at;
    let object = {
        "text": texts,
        "timestamp": Date.parse(time)
    } 
    return object;
}
)

export function getRecentTweets()  {
    let arr = [];
    mappedData.sort((a,b) => {a.timestamp-b.timestamp} );
    for(let i = 0; i<5; i++) {
    arr[i] = mappedData[i];
    }
    console.log(arr);
    return arr;
}

export function searchTweets(search) {
    let arr =  mappedData.filter((x) => {return x.text.toLowerCase().includes(search.toLowerCase())});
    

    return arr;
}


