// Function to hide a specific stream
function hideStream(streamDivId) {
    const streamDiv = document.getElementById(streamDivId);
    if (streamDiv) {
        streamDiv.style.display = 'none';
    }
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
        parent: ["wheaties466.github.io"] // Replace with your GitHub Pages URL
    });
}

// Rest of your scripts.js file...


// Function to render streams
async function renderStreams(streamers) {
    const liveStreams = document.getElementById('live-streams');
    const offlineStreams = document.getElementById('offline-streams');

    liveStreams.innerHTML = '';
    offlineStreams.innerHTML = '';

    for (const streamer of streamers) {
        if (await checkIfLive(streamer)) { // Replace with actual logic to check if live
            createTwitchEmbed(streamer, liveStreams);
        } else {
            createTwitchEmbed(streamer, offlineStreams);
        }
    }
}

// Fetch streamers from the text file and render streams
fetch('streamers.txt')
    .then(response => response.text())
    .then(text => {
        const streamers = text.split('\n').filter(Boolean);
        renderStreams(streamers);
    })
    .catch(error => console.error('Error fetching streamers list:', error));

// Event listeners for the toggle buttons
document.getElementById('show-live').addEventListener('click', function() {
    document.getElementById('live-streams').style.display = 'flex';
    document.getElementById('offline-streams').style.display = 'none';
});

document.getElementById('show-offline').addEventListener('click', function() {
    document.getElementById('live-streams').style.display = 'none';
    document.getElementById('offline-streams').style.display = 'flex';
});

// Placeholder function - replace with actual Twitch API call
async function checkIfLive(streamer) {
    // Logic to check if the streamer is live
    return true; // Replace with actual live check
}
