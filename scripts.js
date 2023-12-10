// Function to create a Twitch embed for a given streamer
function createTwitchEmbed(streamer, container) {
    const embedDivId = 'twitch-embed-' + streamer;
    const streamDivId = 'stream-div-' + streamer;
    
    const streamDiv = document.createElement('div');
    streamDiv.id = streamDivId;
    streamDiv.className = 'stream';

    const streamHeader = document.createElement('h3');
    streamHeader.innerText = streamer;

    const embedDiv = document.createElement('div');
    embedDiv.id = embedDivId;
    embedDiv.className = 'twitch-embed';

    const hideButton = document.createElement('button');
    hideButton.innerText = 'Hide';
    hideButton.className = 'hide-button';
    hideButton.onclick = function() { hideStream(streamDivId); };

    streamDiv.appendChild(streamHeader);
    streamDiv.appendChild(embedDiv);
    streamDiv.appendChild(hideButton);

    container.appendChild(streamDiv);

    $(streamDiv).resizable({
        minHeight: 300,
        minWidth: 300
    }).draggable({
        containment: 'body',
        scroll: false
    });

    new Twitch.Embed(embedDivId, {
        width: '100%',
        height: '100%',
        channel: streamer,
        parent: ["wheaties466.github.io"]
    });
}

// Rest of your scripts.js...
