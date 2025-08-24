class MusicQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(song) {
        this.queue.push(song);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    clear() {
        this.queue = [];
    }
}

const musicQueue = new MusicQueue();

function clearQueue(stopPlayback = false) {
    musicQueue.clear();
    console.log("Queue cleared.");
    updateQueueDisplay();
}

function playNext() {
    if (!musicQueue.isEmpty()) {
        const nextSong = musicQueue.dequeue();
        loadTrack(nextSong, null);
    } else {
        console.log("Queue is empty.");
    }
    updateQueueDisplay();
}

function addToTopOfQueue(track) {
    musicQueue.queue.unshift(track);
    console.log(`Added to top of queue: ${track.name}`);
    if (audioPlayer.paused && musicQueue.queue.length === 1) {
        playNext();
    }
    updateQueueDisplay();
}

function addToQueue(track) {
    musicQueue.enqueue(track);
    console.log(`Added to queue: ${track.name}`);
    if (audioPlayer.paused && musicQueue.queue.length === 1) {
        playNext();
    }
    updateQueueDisplay();
}
