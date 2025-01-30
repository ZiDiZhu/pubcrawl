
var currentAlbumName = null;

function loadAlbum(albumName, albumCover, songs) {

    if(currentAlbumName!=albumName){
        // Show player
        document.getElementById('player').style.display = 'block';
        // Update album info
        document.getElementById('albumTitle').innerText = albumName;
        document.getElementById('albumTitle').style.color = getRandomColor();
        // Load songs
        const songsContainer = document.getElementById('songs');
        songsContainer.innerHTML = ''; // Clear previous songs
        songs.forEach((song, index) => {
            const songDiv = document.createElement('div');
            songDiv.className = 'song';
            songDiv.onclick = () => loadSong(song);
            songDiv.innerHTML = `<div class="song-name">${song.name}</div>`;
            songsContainer.appendChild(songDiv);
            songDiv.style.color= getRandomColor();
        });
        currentAlbumName = albumName;
    }else {
        clearSongs();
        currentAlbumName = null;
    }
}

function clearSongs(){
    document.getElementById('player').style.display = 'none';
    document.getElementById('songs').innerHTML = '';
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function loadSong(song) {
    // Update audio source
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    audioSource.src = song.src;
    audioPlayer.load(); // Reload the audio element
    audioPlayer.play();

    // Fetch and display lyrics from the txt file
    const lyricsDiv = document.getElementById('lyrics');
    if(song.lyricsFile){
        fetch(song.lyricsFile)
            .then(response => response.text())
            .then(text => {
                lyricsDiv.innerText = text;
            })
            .catch(error => {
                lyricsDiv.innerText = "Lyrics not available.";
            });
    }

}