// Function to hide a specific stream
function hideStream(streamer) {
    const streamDiv = document.getElementById('stream-div-' + streamer);
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
    hideButton.onclick = function() { hideStream(streamer); };

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

// Function to render streams
async function renderStreams(streamers) {
    const liveStreams = document.getElementById('live-streams');
    const offlineStreams = document.getElementById('offline-streams');

    liveStreams.innerHTML = '';
    offlineStreams.innerHTML = '';

    for (const streamer of streamers) {
        // Placeholder for checking if streamer is live
        // Replace with your logic or Twitch API call
        //if (/* logic to determine if streamer is live */) {
        //    createTwitchEmbed(streamer, liveStreams);
       // } else {
      //      createTwitchEmbed(streamer, offlineStreams);
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
    showAllStreams();
    document.getElementById('live-streams').style.display = 'flex';
    document.getElementById('offline-streams').style.display = 'none';
});

document.getElementById('show-offline').addEventListener('click', function() {
    showAllStreams();
    document.getElementById('live-streams').style.display = 'none';
    document.getElementById('offline-streams').style.display = 'flex';
});
