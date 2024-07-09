const playlistIDs = [
  "PL7LTTBAsxHWmKv5j3RUf9ak46s_6pMZdz",
  "PL7LTTBAsxHWknggni3ko8elaHst_1YYtY",
];
const playlistWrapper = document.querySelector(".playlist-wrapper");
async function displayVideos() {
  playlistIDs.forEach(async (ID) => {
    const data = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?playlist_id=" +
        ID
    ).then((result) => result.json());

    const trackListWrapper = document.createElement("div");
    const ancherElem = document.createElement("a");
    const playlistHeader = document.createElement("h3");

    trackListWrapper.classList.add("track-list-wrapper");
    playlistHeader.textContent = data.feed.title;
    ancherElem.href = "https://www.youtube.com/playlist?list=" + ID;

    ancherElem.append(playlistHeader);
    playlistWrapper.append(ancherElem, trackListWrapper);

    data.items.forEach((songObj) => {
      const wrapper = document.createElement("div");
      const img = document.createElement("img");
      const trackTitle = document.createElement("h4");

      wrapper.classList.add("track-wrapper");
      img.classList.add("cover-art");
      img.src = songObj.thumbnail;
      trackTitle.textContent = songObj.title;

      wrapper.append(img, trackTitle);
      trackListWrapper.append(wrapper);
    });

    console.log(data);
  });
}

displayVideos();
