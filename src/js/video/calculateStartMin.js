// calculateStartMin.js

function calculateStartMin()
{
    let theInput = secondsFromTimeCode(ge('startInput').value);

    let startFullTimeCode = timeCodeFromSeconds(theInput);

    totalStartMin = startFullTimeCode;

    return totalStartMin;
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

