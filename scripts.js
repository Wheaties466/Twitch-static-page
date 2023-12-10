// Function to hide a specific stream
function hideStream(streamDivId) {
    const streamDiv = document.getElementById(streamDivId);
    if (streamDiv) {
        streamDiv.style.display = 'none';
    }
}

// Function to show all streams
function showAllStreams() {
    const streams = document.querySelectorAll('.stream');
    streams.forEach(stream => {
        stream.style.display = 'block';
    });
}

// Function to create a Twitch embed for a given streamer
function createTwitchEmbed(streamer, container) {
    const embedDivId = 'twitch-embed-' + streamer;
    const streamDivId = 'stream-div-' + streamer;
    
    const streamDiv = document.createElement('div');
    streamDiv.id = streamDivId;
    streamDiv.className = 'stream';

    const embedDiv = document.createElement('div');
    embedDiv.id = embedDivId;

    // Hide button
    const hideButton = document.createElement('button');
    hideButton.innerText = 'Hide';
    hideButton.className = 'hide-button';
    hideButton.onclick = function() { hideStream(streamDivId); };

    streamDiv.appendChild(embedDiv);
    streamDiv.appendChild(hideButton);

    container.appendChild(streamDiv);

    new Twitch.Embed(embedDivId, {
        width: 854,
        height: 480,
        channel: streamer,
        parent: ["wheaties466.github.io"] // Your GitHub Pages URL
    });
}

// Function to render streams
function renderStreams(streamers) {
    const liveStreams = document.getElementById('live-streams');
    const offlineStreams = document.getElementById('offline-streams');

    liveStreams.innerHTML = '';
    offlineStreams.innerHTML = '';

    streamers.forEach(streamer => {
        createTwitchEmbed(streamer, liveStreams);
    });
}

// Function to check each stream's status
function checkStreamStatus() {
    const streams = document.querySelectorAll('.stream');
    streams.forEach(stream => {
        // Basic check. This might need to be adjusted based on how Twitch embeds indicate offline status
        if (stream.innerHTML.includes('offline')) {
            stream.style.display = 'none';
        }
    });
}

// Fetch streamers from the text file, render streams, and set up periodic status check
fetch('streamers.txt')
    .then(response => response.text())
    .then(text => {
        const streamers = text.split('\n').filter(Boolean);
        renderStreams(streamers);
        setInterval(checkStreamStatus, 300000); // Check every 5 minutes
    })
    .catch(error => console.error('Error fetching streamers list:', error));

// Event listeners for the toggle buttons
document.getElementById('show-live').addEventListener('click', function() {
    showAllStreams();
    document.getElementById('live-streams').style.display = 'flex';
    document.getElementById('offline-streams').style.display = 'none';
});

document.getElementById('show-offline').addEventListener('click', function() {
    showAllStreams();
    document.getElementById('live-streams').style.display = 'none';
    document.getElementById('offline-streams').style.display = 'flex';
});
