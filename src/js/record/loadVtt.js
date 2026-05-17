// loadVtt.js

function loadVtt()
{
    let script = ce('script');

    script.onload = function()
    {
        // The script has loaded. We now have the 'defaultVttString' variable.
        // Convert that string into a raw Text Blob masquerading as a VTT file.
        let blob = new Blob([defaultVttString], { type: 'text/vtt' });

        // Generate the instant, RAM-free URL
        let blobUrl = URL.createObjectURL(blob);

        let mainPlayer = ge('video1');
        if (mainPlayer)
        {
            // Remove old tracks
            let oldTrack = ge('defaultCaptionTrack');
            if (oldTrack)
            {
                oldTrack.remove();
            }

            // Build the track element
            let track = ce('track');
            track.id = 'defaultCaptionTrack';
            track.kind = 'subtitles';
            track.label = 'Default Auto-Load';
            track.srclang = 'en';
            
            // Point it to our custom memory URL
            track.src = blobUrl; 
            track.default = true;

            // Inject it into the video player
            mainPlayer.append(track);

            if (mainPlayer.textTracks && mainPlayer.textTracks.length > 0)
            {
                mainPlayer.textTracks[0].mode = 'showing';
            }
            
            cl("Auto-loaded VTT successfully loaded.");
        }
    };

    // Point the script to your new .js version of the captions
    script.src = "src/vtt/default.js"; 
    document.getElementsByTagName('head')[0].append(script);
}

function loadVttOriginal()
{
    let mainPlayer = ge('video1');
    if (mainPlayer)
    {
        // Remove any existing default track so they don't stack up
        let oldTrack = ge('defaultCaptionTrack');
        if (oldTrack) {
            oldTrack.remove();
        }

        // Build the track element
        let track = ce('track');
        track.id = 'defaultCaptionTrack';
        track.kind = 'subtitles';
        track.label = 'Default Captions';
        track.srclang = 'en';

        // Point it to your VTT string (src/vtt/record001.vtt)
        track.src = nameOfVtt; 

        // Force it to turn on instantly
        track.default = true;

        // Inject it directly into the video player
        mainPlayer.append(track);

        // Ensure the browser's subtitle engine wakes up
        if (mainPlayer.textTracks && mainPlayer.textTracks.length > 0)
        {
            mainPlayer.textTracks[0].mode = 'showing';
        }
        
        cl("Default VTT auto-loaded!");
    }
    else
    {
        cl("Error: mainVideoPlayer not found for VTT injection.");
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

