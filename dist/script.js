const playlistIDs = [
    "PL7LTTBAsxHWmKv5j3RUf9ak46s_6pMZdz",
]

async function displayVideos() {
    playlistIDs.forEach(async ID => {
        const data = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?playlist_id=' + ID).then(result => result.json())
        

        console.log(data)
    })

}

displayVideos()