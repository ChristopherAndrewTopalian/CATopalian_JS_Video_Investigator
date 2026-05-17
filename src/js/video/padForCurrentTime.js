// padForCurrentTime.js

function padForCurrentTime(n, width, z)
{
    z = z || '0';

    n = n + '';

    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

