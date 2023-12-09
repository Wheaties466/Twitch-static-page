// Define your streamers list
const streamers = ['streamer1', 'streamer2', 'streamer3']; // and so on...

// Function to create an embed link
function createEmbedLink(streamer) {
    // Replace with actual embed URL logic
    return `https://service.com/embed/${streamer}`;
}

// Function to check if a stream is live
async function isStreamerLive(streamer) {
    // Replace with actual API call logic
    // This should return true or false
}

// Function to render streams
async function renderStreams() {
    const liveStreams = document.getElementById('live-streams');
    const offlineStreams = document.getElementById('offline-streams');

    liveStreams.innerHTML = '';
    offlineStreams.innerHTML = '';

    for (const streamer of streamers) {
        const streamDiv = document.createElement('div');
        streamDiv.className = 'stream';
        streamDiv.innerHTML = `<iframe src="${createEmbedLink(streamer)}"></iframe>`;

        if (await isStreamerLive(streamer)) {
            liveStreams.appendChild(streamDiv);
        } else {
            offlineStreams.appendChild(streamDiv);
        }
    }
}

// Function to refresh streams every 5 minutes
function refreshStreams() {
    renderStreams();
    setTimeout(refreshStreams, 5 * 60 * 1000); // 5 minutes
}

// Initial call to render streams
refreshStreams();
