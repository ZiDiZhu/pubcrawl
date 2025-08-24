function createSongDiv(track) {
    const albumTrackDiv = document.createElement('div');
    albumTrackDiv.className = 'track';
    albumTrackDiv.onclick = () => loadTrack(track, albumTrackDiv);
    const songTitle = document.createElement('div');
    songTitle.className = 'albumTrackTitle';
    songTitle.innerText = `${albumTracksCount}. ${track.name}`;
    albumTrackDiv.appendChild(songTitle);
    albumTrackDiv.style.color = getRandomColor();

    const playButton = document.createElement('button');
    playButton.innerText = 'Play';
    playButton.className = 'play-button';
    playButton.onclick = () => {
        loadTrack(track, albumTrackDiv);
    };

    const queueButton = document.createElement('button');
    queueButton.innerText = 'Add To Queue';
    queueButton.className = 'queue-button';
    queueButton.onclick = (event) => {
        event.stopPropagation(); // Prevent triggering the song click event
        addToQueue(track);
    };

    const queueNextButton = document.createElement('button');
    queueNextButton.innerText = 'Play Next';
    queueNextButton.className = 'next-button';
    queueNextButton.onclick = (event) => {
        event.stopPropagation(); // Prevent triggering the song click event
        addToTopOfQueue(track);
    };

    albumTrackDiv.appendChild(playButton);
    albumTrackDiv.appendChild(queueNextButton);
    albumTrackDiv.appendChild(queueButton);
    return albumTrackDiv;
}