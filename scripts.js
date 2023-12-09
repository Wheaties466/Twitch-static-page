// Function to create an embed link (replace with actual Twitch embed logic)
function createTwitchEmbed(streamer) {
    // Example Twitch Embed initialization
    new Twitch.Embed("twitch-embed-" + streamer, {
        width: 854,
        height: 480,
        channel: streamer,
        // Add other necessary parameters
    });
}

// Function to render streams
function renderStreams(streamers) {
    const liveStreams = document.getElementById('live-streams');
    const offlineStreams = document.getElementById('offline-streams');

    liveStreams.innerHTML = '';
    offlineStreams.innerHTML = '';

    streamers.forEach(streamer => {
        const streamDiv = document.createElement('div');
        streamDiv.id = 'twitch-embed-' + streamer;
        streamDiv.className = 'stream';

        // Example embed - you need to replace with actual embed logic
        createTwitchEmbed(streamer);

        // Example logic - replace with actual live/offline check
        if (/* Check if streamer is live */) {
            liveStreams.appendChild(streamDiv);
        } else {
            offlineStreams.appendChild(streamDiv);
        }
    });
}

// Fetch streamers and render streams
fetch('streamers.txt')
   .then(response => response.text())
   .then(text => {
       const streamers = text.split('\n').filter(Boolean);
       renderStreams(streamers);
   })
   .catch(error => console.error('Error fetching streamers list:', error));

// Include logic to periodically check stream status (if needed)
