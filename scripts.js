// Function to hide a specific stream and set a cookie
function hideStream(streamDivId) {
    const streamDiv = document.getElementById(streamDivId);
    if (streamDiv) {
        streamDiv.style.display = 'none';
        setHiddenStreamCookie(streamDivId);
    }
}

// Set cookie for hidden streams
function setHiddenStreamCookie(streamDivId) {
    document.cookie = `hidden_${streamDivId}=true; max-age=86400; path=/`; // Cookie expires in 1 day
}

// Function to show all streams
function showAllStreams() {
    const streams = document.querySelectorAll('.stream');
    streams.forEach(stream => {
        stream.style.display = 'block';
        const streamDivId = stream.id;
        document.cookie = `hidden_${streamDivId}=false; max-age=86400; path=/`; // Reset the cookie
    });
}

// Function to create a Twitch embed for a given streamer
function createTwitchEmbed(streamer, container) {
    const embedDivId = 'twitch-embed-' + streamer;
    const streamDivId = 'stream-div-' + streamer;
    
    const streamDiv = document.createElement('div');
    streamDiv.id = streamDivId;
    streamDiv.className = 'stream';

    // Stream header
    const streamHeader = document.createElement('h3');
    streamHeader.innerText = streamer;

    const embedDiv = document.createElement('div');
    embedDiv.id = embedDivId;

    // Hide button
    const hideButton = document.createElement('button');
    hideButton.innerText = 'Hide';
    hideButton.className = 'hide-button';
    hideButton.onclick = function() { hideStream(streamDivId); };

    streamDiv.appendChild(streamHeader);
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

    checkHiddenStreams();
}

// Check cookies on page load and hide streams if necessary
function checkHiddenStreams() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name.startsWith('hidden_') && value === 'true') {
            const streamDivId = name.substring(7); // Remove 'hidden_' prefix
            hideStream(streamDivId);
        }
    });
}

// Fetch streamers from the text file, render streams, and set up periodic status check
fetch('streamers.txt')
    .then(response => response.text())
    .then(text => {
        const streamers = text.split('\n').filter(Boolean);
        renderStreams(streamers);
        // setInterval(checkStreamStatus, 300000); // Check every 5 minutes
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
