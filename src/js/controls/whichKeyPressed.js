// whichKeyPressed.js

function whichKeyPressed(event)
{
    // 113 is F2 Key
    if (event.keyCode === 113)
    {
        cl("test");
    }
    // 27 is Escape Key
    else if (event.keyCode === 27)
    {
        setVolume(0.0);
        //alert("Volume Muted");
    }
    // 37 is left arrow key
    else if (event.keyCode === 37)
    {
        decreaseItStart();
    }
    // 39 is right arrow key
    else if (event.keyCode === 39)
    {
        increaseItStart();
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2020-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

