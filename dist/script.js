const playlistIDs = [
  "PL7LTTBAsxHWmKv5j3RUf9ak46s_6pMZdz",
  "PL7LTTBAsxHWkoCF_O8zMSy29ZusIiDEe5",
  "PL7LTTBAsxHWknggni3ko8elaHst_1YYtY",
  "PL7LTTBAsxHWmKMQAoY2sEJDDJ9ypDDSua",
  "PL7LTTBAsxHWmtpXpNc02L7JPitjpf4ioj",
];

const playlistWrapper = document.querySelector(".playlist-wrapper");
const trackPlayer = document.querySelector(".track-player > iframe");
let playerHidden = true;

async function displayVideos() {
  playlistIDs.forEach(async (ID) => {
    const data = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?playlist_id=" +
        ID
    ).then((result) => result.json());

    const trackListWrapper = document.createElement("div");
    const anchorElem = document.createElement("a");
    const playlistHeader = document.createElement("h3");

    trackListWrapper.classList.add("track-list-wrapper");
    playlistHeader.textContent = data.feed.title;
    anchorElem.href = "https://www.youtube.com/playlist?list=" + ID;
    anchorElem.setAttribute("target", "_blank")

    anchorElem.append(playlistHeader);
    playlistWrapper.append(anchorElem, trackListWrapper);
    data.items.forEach((songObj) => {
      const wrapper = document.createElement("div");
      const coverArt = document.createElement("div");
      const trackTitle = document.createElement("h4");

      wrapper.classList.add("track-wrapper");
      coverArt.classList.add("cover-art");
      coverArt.setAttribute("style", `background-image: url(${songObj.thumbnail})`)
      trackTitle.textContent = songObj.title;

      wrapper.addEventListener("click", (e) => {
        updatePlayer(songObj.link)
      })

      wrapper.append(coverArt, trackTitle);
      trackListWrapper.append(wrapper);
    });
  });
}

function updatePlayer(url) {
  if (playerHidden) {
    playerHidden = false;
    document.querySelector(".track-player").classList.toggle("hide");
  }
  trackPlayer.src = "https://www.youtube.com/embed/" + url.slice(url.indexOf("=") + 1) ;
}

displayVideos();
