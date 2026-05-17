// playVideoMAIN.js

function playVideoMAIN(starttime, endtime, elementId, ourPlayBack)
{
    let video = ge(elementId);

    EndTimeEntered = endtime;

    video.addEventListener("timeupdate", function()
    {
        if (this.currentTime >= EndTimeEntered)
        {
            this.pause();
        }
    }, false);

    video.playbackRate = ourPlayBack;

    video.play();

    try
    {
        video.currentTime = starttime;
    }
    catch (ex)
    {
        // handle exceptions here
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

