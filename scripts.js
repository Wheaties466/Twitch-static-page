// Function to create a Twitch embed for a given streamer
function createTwitchEmbed(streamer) {
    const embedDivId = 'twitch-embed-' + streamer;
    const embedDiv = document.createElement('div');
    embedDiv.id = embedDivId;
    document.body.appendChild(embedDiv);

    new Twitch.Embed(embedDivId, {
        width: 854,
        height: 480,
        channel: streamer,
        // Add your GitHub Pages domain in the parent parameter
        parent: ["wheaties466.github.io"]
    });
}

// Function to render streams
function renderStreams(streamers) {
    const liveStreams = document.getElementById('live-streams');
    const offlineStreams = document.getElementById('offline-streams');

    liveStreams.innerHTML = '';
    offlineStreams.innerHTML = '';

    streamers.forEach(streamer => {
        // Example logic - replace with actual live/offline check
        // For now, appending all to liveStreams for demonstration
        createTwitchEmbed(streamer);
    };
}

// Fetch streamers from the text file and render streams
fetch('streamers.txt')
    .then(response => response.text())
    .then(text => {
        const streamers = text.split('\n').filter(Boolean);
        renderStreams(streamers);
    })
    .catch(error => console.error('Error fetching streamers list:', error));

// Include your logic to periodically check stream status (if needed)
