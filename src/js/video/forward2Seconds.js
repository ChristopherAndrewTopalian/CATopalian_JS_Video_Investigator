// forward2Seconds.js

function forward2Seconds(starttime, endtime, elementId, ourPlayBack)
{
    //let elementId = "video1";

    let video = ge(elementId);

    StartTimeEntered = video.currentTime;

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
        video.currentTime += 2;
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

