let audioPlayer;
let audioSource;
let musicPlayerDiv;
let albumTitle;
let tracksContainer;
let trackTitleDiv;

let currentAlbumName = null;
let albumTracksCount = 0;


function initAudioPlayer() {
    musicPlayerDiv = document.getElementById('musicPlayerDiv');
    audioPlayer = document.getElementById('audioPlayer');
    audioSource = document.getElementById('audioSource');
    albumTitle = document.getElementById('albumTitle');
    tracksContainer = document.getElementById('tracks');
    trackTitleDiv = document.getElementById('trackTitle');

    audioPlayer.addEventListener('ended', playNext);
    audioPlayer.volume = 0.8;
}

function loadAlbum(albumName, albumCover, tracks, item) {
    albumTracksCount = 0;
    clearQueue(true);
    if(currentAlbumName!==albumName){
        musicPlayerDiv.style.display = 'block';
        // Update album info
        albumTitle.innerText = albumName;
        albumTitle.style.color = getRandomColor();
        tracksContainer.innerHTML = ''; // Clear previous songs
        tracks.forEach((track) => {
            albumTracksCount++;
            const trackDiv = createSongDiv(track);
            tracksContainer.appendChild(trackDiv);
        });
        currentAlbumName = albumName;
        var albums = document.getElementsByClassName('album');
        for(var i=0; i<albums.length; i++){
            albums[i].style.border = 'none';
        }
        item.style.border = '5px dotted';

        tracks.forEach((track) => {
            addToQueue(track);
        });

    }else {
        closeAlbumView();
        currentAlbumName = null;
    }
}

function closeAlbumView(){
    musicPlayerDiv.style.display = 'none';
    tracksContainer.innerHTML = '';
    var albums = document.getElementsByClassName('album');
    for(var i=0; i<albums.length; i++){
        albums[i].style.border = 'none';
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function loadTrack(track, item) {
    audioSource.src = track.src;
    audioPlayer.load(); // Reload the audio element
    audioPlayer.play();
    trackTitleDiv.innerText= "▷ " + currentAlbumName + " - "+ track.name;
    if(item)document.getElementById("trackTitle").style.color=item.style.color;

    const lyricsDiv = document.getElementById('lyrics');
    if(track.lyricsFile){
        fetch(track.lyricsFile)
            .then(response => response.text())
            .then(text => {
                lyricsDiv.innerText = text;
            })
            .catch(error => {
                lyricsDiv.innerText = "Lyrics not available.";
            });
    }

}