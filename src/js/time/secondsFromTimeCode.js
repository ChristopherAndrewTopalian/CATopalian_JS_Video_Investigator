// secondsFromTimeCode.js

function secondsFromTimeCode(fullTimeCode)
{
    if (!fullTimeCode)
    {
        fullTimeCode = '00:00:00';
    }

    let theStringSeconds = fullTimeCode;
    let splitValue = theStringSeconds.split(":");

    let secondsOnly = parseInt(splitValue[2]);
    let secondsFromMinutes = parseInt(splitValue[1]) * 60;
    let secondsFromHours = parseInt(splitValue[0]) * 3600;

    let calculatedSeconds = secondsFromHours + secondsFromMinutes + secondsOnly;
    // now seconds variable is an array, 1:2:3

    return calculatedSeconds;
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

