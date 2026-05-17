// videoCurrentTimeToLastEntry.js

function videoCurrentTimeToLastEntry()
{
    let theVideo = ge("video1");

    let indexLast = records.length - 1;

    console.log(indexLast);

    let lastStartMins = records[indexLast].startMins;

    theVideo.currentTime = secondsFromTimeCode(lastStartMins);

    ge("currentTimeTopLeft").textContent = secondsFromTimeCode(lastStartMins);
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

