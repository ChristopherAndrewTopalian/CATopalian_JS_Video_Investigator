// timeCodeFromSeconds.js

function timeCodeFromSeconds(seconds)
{
    seconds = parseInt(seconds);

    if (seconds < 0)
    {
        seconds = 0;
    }
    else
    {
        seconds = seconds;
    }

    let Zminutes = Math.floor(seconds / 60);

    Zminutes = Zminutes % 60;

    Zminutes = pad(Zminutes, 2);

    let Zhours = Math.floor(seconds / 3600);

    Zhours = pad(Zhours, 2);

    let Zseconds = Math.floor(seconds % 60);

    Zseconds = pad(Zseconds, 2);

    let fullTimeCode = Zhours + ":" + Zminutes + ":" + Zseconds;

    return fullTimeCode;
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

