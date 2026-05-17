// formatTimecode.js

// Converts raw seconds (e.g., 65.432) into HH:MM:SS.mmm
function formatTimecode(rawSeconds) 
{
    let hours = Math.floor(rawSeconds / 3600);
    let minutes = Math.floor((rawSeconds % 3600) / 60);
    let seconds = Math.floor(rawSeconds % 60);
    
    // Extract exactly 3 decimal places for milliseconds
    let milliseconds = Math.floor((rawSeconds % 1) * 1000);

    // Add leading zeros so it always looks uniform (00:05:09.050)
    let h = hours.toString().padStart(2, '0');
    let m = minutes.toString().padStart(2, '0');
    let s = seconds.toString().padStart(2, '0');
    let ms = milliseconds.toString().padStart(3, '0');

    if (hours > 0)
    {
        return h + ':' + m + ':' + s + '.' + ms;
    }
    else
    {
        return m + ':' + s + '.' + ms; // Omit hours if video is short
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

