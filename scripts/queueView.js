function updateQueueDisplay() {
    const queueContainer = document.getElementById('queuebox');
    queueContainer.innerHTML = '';

    musicQueue.queue.forEach((song, index) => {
        addSongToQueueView(song, index);
    });
    if (musicQueue.isEmpty()) {
        document.getElementById('queueHeader').style.display = 'none';
        document.getElementById('clearQueueButton').style.display = 'none';
        queueContainer.innerHTML = '';
    } else {

        document.getElementById('queueHeader').style.display = 'inline-block';
        document.getElementById('clearQueueButton').style.display = 'inline-block';
    }
}

function addSongToQueueView(song, index) {
    const queueContainer = document.getElementById('queuebox');
    const songDiv = document.createElement('div');
    songDiv.className = 'queue-track';
    songDiv.innerText = `${index}. ${song.name}` + '\n ';
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'X';
    cancelButton.className = 'cancel-button';
    cancelButton.onclick = () => {
        musicQueue.queue.splice(index, 1);
        updateQueueDisplay();
    };

    queueContainer.appendChild(cancelButton);
    queueContainer.appendChild(songDiv);
}
